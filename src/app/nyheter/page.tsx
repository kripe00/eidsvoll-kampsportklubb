import { client } from "../../../tina/__generated__/client";
import { NyheterListClient } from "@/components/NyheterListClient";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const metadata: Metadata = {
  title: "Siste Nytt & Aktiviteter",
  description: "Følg med på siste nytt fra Eidsvoll Kampsportklubb. Her finner du informasjon om graderinger, seminarer, leirer og andre arrangementer.",
};

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

function mergeNews(localNews: any[], remoteEdges: any[] = []) {
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

export default async function NyheterPage() {
  const localNews = getLocalNews();
  let pageData: any = { newsConnection: { edges: localNews } };
  let query = "";
  let variables = {};

  try {
    const newsRes = await client.queries.newsConnection();
    const edges = newsRes?.data?.newsConnection?.edges || [];
    const mergedNews = mergeNews(localNews, edges);
    pageData = {
      ...newsRes?.data,
      newsConnection: {
        edges: mergedNews,
      },
    };
    query = newsRes.query;
    variables = newsRes.variables;
  } catch (error) {
    console.warn("Could not fetch news connection from Tina Cloud:", error);
  }

  return (
    <NyheterListClient 
      data={pageData} 
      query={query} 
      variables={variables} 
    />
  );
}
