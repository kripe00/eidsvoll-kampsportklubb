import { client } from "../../tina/__generated__/client";
import { HomePageClient } from "@/components/HomePageClient";
import heroJson from "../../content/hero/index.json";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getLocalNews() {
  try {
    const newsDir = path.join(process.cwd(), "content/news");
    if (!fs.existsSync(newsDir)) return [];
    
    const files = fs.readdirSync(newsDir).filter((f) => f.endsWith(".md"));
    const news = files.map((file) => {
      const filePath = path.join(newsDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);
      const filename = file.replace(/\.md$/, "");
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

export default async function Home() {
  const localNews = getLocalNews();

  const fallbackData = {
    hero: heroJson,
    newsConnection: {
      edges: localNews.slice(0, 3),
    },
  };

  const pageRes: any = { data: fallbackData, query: "", variables: {} };

  try {
    const res = await client.queries.hero({ relativePath: "index.json" });
    const newsRes = await client.queries.newsConnection({ sort: "date", last: 3 });

    if (res.data?.hero) {
      pageRes.data.hero = {
        ...res.data.hero,
        ...heroJson, // Lokale data fra git (med tom instagramImages: []) overstyrer remote Tina Cloud-cache
      };
      pageRes.query = res.query;
      pageRes.variables = res.variables;
    }

    const newsEdges = newsRes?.data?.newsConnection?.edges;
    if (Array.isArray(newsEdges) && newsEdges.length > 0) {
      pageRes.data.newsConnection = newsRes.data.newsConnection;
    }
  } catch (error) {
    console.warn("TinaCMS Home fetch failed (bruker lokale fallback data):", error);
  }

  return (
    <HomePageClient 
      data={pageRes.data} 
      query={pageRes.query} 
      variables={pageRes.variables} 
    />
  );
}
