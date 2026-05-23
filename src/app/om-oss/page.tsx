import { client } from "../../../tina/__generated__/client";
import { GenericPageClient } from "@/components/GenericPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om oss",
  description: "Lær mer om Eidsvoll Kampsportklubb i Eidsvoll. Vår historie, våre verdier og vårt tilbud innen Brasiliansk Jiu-Jitsu (BJJ), Muay Thai og Cross-trening.",
};

export default async function OmOssPage() {
  const result = await client.queries.omOss({ relativePath: "index.md" });

  return (
    <GenericPageClient 
      data={result.data} 
      query={result.query} 
      variables={result.variables} 
    />
  );
}
