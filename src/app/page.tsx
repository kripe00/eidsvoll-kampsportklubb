import { client } from "../../tina/__generated__/client";
import { HomePageClient } from "@/components/HomePageClient";
import heroJson from "../../content/hero/index.json";
import { getLocalNews, mergeNews } from "@/lib/news";

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
        ...heroJson, // Lokale data fra git overstyrer remote Tina Cloud-cache
      };
      pageRes.query = res.query;
      pageRes.variables = res.variables;
    }

    const newsEdges = newsRes?.data?.newsConnection?.edges || [];
    const mergedNews = mergeNews(localNews, newsEdges);
    pageRes.data.newsConnection = {
      edges: mergedNews.slice(0, 3),
    };
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
