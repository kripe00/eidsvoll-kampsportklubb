import { client } from "../../tina/__generated__/client";
import { HomePageClient } from "@/components/HomePageClient";

export default async function Home() {
  const fallbackData = {
    hero: {
      welcomeText: "Velkommen til",
      highlightedText: "Eidsvoll Kampsportklubb",
      description: "Eidsvoll Kampsportklubb er mer enn bare et sted å trene – vi er et fellesskap. Med dype røtter på Råholt har vi skapt et inkluderende og trygt miljø der folk i alle aldre, og med ulik erfaringsbakgrunn, kan oppleve ekte idrettsglede og mestring.",
      backgroundImage: "/header.jpg"
    },
    newsConnection: { edges: [] }
  };

  let pageRes: any = { data: fallbackData, query: "", variables: {} };

  try {
    const res = await client.queries.hero({ relativePath: "index.json" });
    const newsRes = await client.queries.newsConnection({ sort: "date", last: 3 });
    
    if (res.data?.hero) {
      pageRes.data.hero = res.data.hero;
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
