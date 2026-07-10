import { client } from "../../../tina/__generated__/client";
import { SchedulePageClient } from "@/components/SchedulePageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeplan og treningstider",
  description: "Se treningstidene for BJJ, Muay Thai, yoga og Cross Training (CT) hos Eidsvoll Kampsportklubb.",
};

export default async function TimeplanPage() {
  let pageRes: any = { data: {}, query: "", variables: {} };

  try {
    const res = await client.queries.schedule({ relativePath: "index.json" });
    if (res.data?.schedule) {
      pageRes = res;
    }
  } catch (error) {
    console.error("TinaCMS Schedule fetch failed:", error);
  }

  return (
    <SchedulePageClient 
      data={pageRes.data} 
      query={pageRes.query} 
      variables={pageRes.variables} 
    />
  );
}
