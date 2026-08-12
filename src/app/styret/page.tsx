import { client } from "../../../tina/__generated__/client";
import { StyretPageClient } from "@/components/StyretPageClient";
import styretJson from "../../../content/styret/index.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Styret og Administrasjonen",
  description: "Se hvem som sitter i styret og administrasjonen i Eidsvoll Kampsportklubb, og finn kontaktinformasjon til klubbledelsen.",
};

export default async function StyretPage() {
  let pageRes: any = { data: { styret: styretJson }, query: "", variables: {} };

  try {
    const boardRes = await client.queries.styret({ relativePath: "index.json" });
    if (boardRes?.data?.styret) {
      pageRes = {
        data: boardRes.data,
        query: boardRes.query,
        variables: boardRes.variables,
      };
    }
  } catch (error) {
    console.error("TinaCMS Styret fetch failed:", error);
  }

  const finalData = pageRes.data?.styret ? pageRes.data : { styret: styretJson };

  return (
    <StyretPageClient 
      data={finalData} 
      query={pageRes.query} 
      variables={pageRes.variables} 
    />
  );
}
