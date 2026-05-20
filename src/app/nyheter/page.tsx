import { client } from "../../../tina/__generated__/client";
import { NyheterListClient } from "@/components/NyheterListClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Siste Nytt & Aktiviteter",
  description: "Følg med på siste nytt fra Eidsvoll Kampsportklubb. Her finner du informasjon om graderinger, seminarer, leirer og andre arrangementer.",
};

export default async function NyheterPage() {
  let newsRes: any;
  let hasNews = false;

  try {
    newsRes = await client.queries.newsConnection();
    if (newsRes && newsRes.data && newsRes.data.newsConnection) {
      hasNews = true;
    }
  } catch (error) {
    console.warn("Could not fetch news connection:", error);
  }

  return (
    <NyheterListClient 
      data={hasNews ? newsRes.data : null} 
      query={hasNews ? newsRes.query : ""} 
      variables={hasNews ? newsRes.variables : {}} 
    />
  );
}
