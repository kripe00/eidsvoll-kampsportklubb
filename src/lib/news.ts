import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getLocalNewsSlugs(): string[] {
  try {
    const newsDir = path.join(process.cwd(), "content/news");
    if (!fs.existsSync(newsDir)) return [];
    return fs
      .readdirSync(newsDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));
  } catch (err) {
    console.error("Feil ved lesing av nyhets-slugs:", err);
    return [];
  }
}

export function getLocalNews() {
  try {
    const newsDir = path.join(process.cwd(), "content/news");
    const slugs = getLocalNewsSlugs();
    const news = slugs.map((filename) => {
      const filePath = path.join(newsDir, `${filename}.md`);
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);
      return {
        node: {
          _sys: { filename },
          title: data.title || filename,
          date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
          category: data.category || "Nyheter",
          description: data.description || "",
          image: data.image || "",
        },
      };
    });

    return news.sort((a, b) => new Date(b.node.date).getTime() - new Date(a.node.date).getTime());
  } catch (err) {
    console.error("Feil ved lesing av lokale nyheter:", err);
    return [];
  }
}

export function mergeNews(localNews: any[], remoteEdges: any[] = []) {
  const map = new Map();
  for (const edge of remoteEdges) {
    if (edge?.node?._sys?.filename) {
      map.set(edge.node._sys.filename, edge);
    }
  }
  for (const edge of localNews) {
    if (edge?.node?._sys?.filename) {
      map.set(edge.node._sys.filename, edge);
    }
  }
  const merged = Array.from(map.values());
  return merged.sort((a, b) => new Date(b.node.date).getTime() - new Date(a.node.date).getTime());
}
