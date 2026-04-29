import { client } from "../../../tina/__generated__/client";
import { GenericPageClient } from "@/components/GenericPageClient";

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
