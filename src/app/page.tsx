import { client } from "../../tina/__generated__/client";
import { HomePageClient } from "@/components/HomePageClient";
import heroJson from "../../content/hero/index.json";

export default async function Home() {
  const fallbackData = {
    hero: heroJson,
    newsConnection: { edges: [] }
  };

  let pageRes: any = { data: fallbackData, query: "", variables: {} };

  try {
    const res = await client.queries.hero({ relativePath: "index.json" });
    const newsRes = await client.queries.newsConnection({ sort: "date", last: 3 });
    
    if (res.data?.hero) {
      pageRes.data.hero = {
        ...heroJson,
        ...res.data.hero
      };
      pageRes.query = res.query;
      pageRes.variables = res.variables;
    }
    
    if (newsRes.data?.newsConnection) {
      pageRes.data.newsConnection = newsRes.data.newsConnection;
    }
  } catch (error) {
    console.error("TinaCMS Home fetch failed:", error);
  }

  return (
    <HomePageClient 
      data={pageRes.data} 
      query={pageRes.query} 
      variables={pageRes.variables} 
    />
  );
}
