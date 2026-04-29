import { client } from "../../../tina/__generated__/client";
import { GenericPageClient } from "@/components/GenericPageClient";

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
