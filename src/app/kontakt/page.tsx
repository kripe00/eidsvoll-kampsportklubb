import { client } from "../../../tina/__generated__/client";
import { KontaktPageClient } from "@/components/KontaktPageClient";
import contactJson from "../../../content/contact/index.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt Oss | Adresse, Kart & Parkering",
  description: "Ta kontakt med Eidsvoll Kampsportklubb i Trondheimsvegen 71B på Dal. Gratis parkering og inngang på baksiden. Send oss en melding eller kom innom!",
  alternates: {
    canonical: "/kontakt",
  },
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
