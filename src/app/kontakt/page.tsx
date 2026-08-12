import { client } from "../../../tina/__generated__/client";
import { KontaktPageClient } from "@/components/KontaktPageClient";
import contactJson from "../../../content/contact/index.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Ta kontakt med Eidsvoll Kampsportklubb i Eidsvoll. Vi svarer på spørsmål om BJJ, Muay Thai, treningstider og medlemskap.",
};

export default async function KontaktPage() {
  let pageRes: any = { data: { contact: contactJson }, query: "", variables: {} };

  try {
    const res = await client.queries.contact({ relativePath: "index.json" });
    if (res.data?.contact) {
      pageRes = {
        ...res,
        data: {
          ...res.data,
          contact: {
            ...res.data.contact,
            ...contactJson
          }
        }
      };
    }
  } catch (error) {
    console.error("TinaCMS Kontakt fetch failed:", error);
  }

  return (
    <KontaktPageClient 
      data={pageRes.data?.contact ? pageRes.data : { contact: contactJson }} 
      query={pageRes.query} 
      variables={pageRes.variables} 
    />
  );
}
