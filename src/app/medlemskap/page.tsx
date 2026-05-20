import { client } from "../../../tina/__generated__/client";
import { GenericPageClient } from "@/components/GenericPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medlemskap",
  description: "Bli medlem i Eidsvoll Kampsportklubb. Se priser, prøvetimer og meld deg på trening i Brasiliansk Jiu-Jitsu (BJJ) og Muay Thai.",
};

export default async function MedlemskapPage() {
  const result = await client.queries.medlemskap({ relativePath: "index.md" });

  return (
    <GenericPageClient 
      data={result.data} 
      query={result.query} 
      variables={result.variables} 
    />
  );
}
