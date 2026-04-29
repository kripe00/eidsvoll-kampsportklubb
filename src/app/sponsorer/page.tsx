import { client } from "../../../tina/__generated__/client";
import { SponsorerPageClient } from "@/components/SponsorerPageClient";

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
