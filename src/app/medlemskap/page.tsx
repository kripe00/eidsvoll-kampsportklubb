import { client } from "../../../tina/__generated__/client";
import { GenericPageClient } from "@/components/GenericPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medlemskap",
  description: "Bli medlem i Eidsvoll Kampsportklubb. Se priser, prøvetimer og meld deg på trening i Brasiliansk Jiu-Jitsu (BJJ) og Muay Thai.",
};

const fallbackMedlemskapData = {
  title: "Medlemskap",
  blocks: [
    {
      _template: "membership",
      title: "Bli medlem i Eidsvoll Kampsportklubb",
      description: "Meld deg inn enkelt via MinIdrett eller prøv en gratis prøvetime hos oss.",
      linkUrl: "https://www.minidrett.no/medlemskap/988726",
      boostLinkUrl: "https://portal.boostsystem.no/rambukk/member",
      boostEnabled: true,
      extraInfo: "Alle medlemskap og treningsavgifter administreres direkte av idrettslaget (EKK).",
    },
  ],
};

export default async function MedlemskapPage() {
  let data = fallbackMedlemskapData;
  let query = "";
  let variables = {};

  try {
    const result = await client.queries.medlemskap({ relativePath: "index.md" });
    data = result.data as any;
    query = result.query;
    variables = result.variables;
  } catch (error) {
    console.warn("TinaCMS Medlemskap fetch failed (using local fallback data):", error);
  }

  return (
    <GenericPageClient 
      data={data as any} 
      query={query} 
      variables={variables} 
    />
  );
}
