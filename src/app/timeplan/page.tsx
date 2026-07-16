import { client } from "../../../tina/__generated__/client";
import { SchedulePageClient } from "@/components/SchedulePageClient";
import type { Metadata } from "next";

import fs from "fs";
import path from "path";

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

  // Load local JSON schedule directly to ensure immediate updates in production builds
  try {
    const filePath = path.join(process.cwd(), "content/schedule/index.json");
    const localContent = fs.readFileSync(filePath, "utf-8");
    const localSchedule = JSON.parse(localContent);
    pageRes.data = {
      ...pageRes.data,
      schedule: localSchedule,
    };
  } catch (error) {
    console.error("Failed to read local schedule JSON:", error);
  }

  return (
    <SchedulePageClient 
      data={pageRes.data} 
      query={pageRes.query} 
      variables={pageRes.variables} 
    />
  );
}
