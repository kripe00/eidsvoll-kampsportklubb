import { client } from "../../../tina/__generated__/client";
import { NyheterListClient } from "@/components/NyheterListClient";
import type { Metadata } from "next";
import { getLocalNews, mergeNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "Siste Nytt & Aktiviteter",
  description: "Følg med på siste nytt fra Eidsvoll Kampsportklubb. Her finner du informasjon om graderinger, seminarer, leirer og andre arrangementer på Dal.",
  alternates: {
    canonical: "/nyheter",
  },
};

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
