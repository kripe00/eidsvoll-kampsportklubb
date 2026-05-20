import { client } from "../../../tina/__generated__/client";
import { SponsorerPageClient } from "@/components/SponsorerPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsorer & Samarbeidspartnere",
  description: "Støtt lokalsporten i Eidsvoll. Se våre sponsorer og samarbeidspartnere, og les om hvordan din bedrift kan bidra til lokal idrettsglede.",
};

export default async function SponsorerPage() {
  const result = await client.queries.sponsorer({ relativePath: "index.md" });

  return (
    <SponsorerPageClient 
      data={result.data} 
      query={result.query} 
      variables={result.variables} 
    />
  );
}
