import { client } from "../../../tina/__generated__/client";
import { KontaktPageClient } from "@/components/KontaktPageClient";

export default async function KontaktPage() {
  let pageRes: any = { data: {}, query: "", variables: {} };

  try {
    const res = await client.queries.contact({ relativePath: "index.json" });
    if (res.data?.contact) {
      pageRes = res;
    }
  } catch (error) {
    console.error("TinaCMS Kontakt fetch failed:", error);
  }

  return (
    <KontaktPageClient 
      data={pageRes.data} 
      query={pageRes.query} 
      variables={pageRes.variables} 
    />
  );
}
