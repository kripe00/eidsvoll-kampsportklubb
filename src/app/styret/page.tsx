import { client } from "../../../tina/__generated__/client";
import { StyretPageClient } from "@/components/StyretPageClient";

export default async function StyretPage() {
  let pageRes: any = { data: null, query: "", variables: {} };

  try {
    const boardRes = await client.queries.styret({ relativePath: "index.json" });
    pageRes = {
      data: boardRes.data,
      query: boardRes.query,
      variables: boardRes.variables,
    };
  } catch (error) {
    console.error("TinaCMS Styret fetch failed:", error);
  }

  if (!pageRes.data) {
    return <div>Kunne ikke laste styret.</div>;
  }

  return (
    <StyretPageClient 
      data={pageRes.data} 
      query={pageRes.query} 
      variables={pageRes.variables} 
    />
  );
}
