import { client } from "../../../tina/__generated__/client";
import { SponsorerPageClient } from "@/components/SponsorerPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsorer & Samarbeidspartnere",
  description: "Støtt lokalsporten i Eidsvoll. Se våre sponsorer og samarbeidspartnere, og les om hvordan din bedrift kan bidra til lokal idrettsglede.",
};

const fallbackSponsorerData = {
  title: "Sponsorer & Samarbeidspartnere",
  blocks: [],
};

export default async function SponsorerPage() {
  let data = fallbackSponsorerData;
  let query = "";
  let variables = {};

  try {
    const result = await client.queries.sponsorer({ relativePath: "index.md" });
    data = result.data as any;
    query = result.query;
    variables = result.variables;
  } catch (error) {
    console.warn("TinaCMS Sponsorer fetch failed (using local fallback data):", error);
  }

  return (
    <SponsorerPageClient 
      data={data as any} 
      query={query} 
      variables={variables} 
    />
  );
}
