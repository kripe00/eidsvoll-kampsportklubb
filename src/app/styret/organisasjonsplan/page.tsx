import { client } from "../../../../tina/__generated__/client";
import { OrganisasjonsplanClient } from "@/components/OrganisasjonsplanClient";

export default async function OrganisasjonsplanPage() {
  let pageRes: any = { data: null, query: "", variables: {} };

  try {
    const res = await client.queries.organisasjonsplan({ relativePath: "index.md" });
    pageRes = {
      data: res.data,
      query: res.query,
      variables: res.variables,
    };
  } catch (error) {
    console.error("TinaCMS Organisasjonsplan fetch failed:", error);
  }

  if (!pageRes.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Kunne ikke laste organisasjonsplanen.</p>
      </div>
    );
  }

  return (
    <OrganisasjonsplanClient 
      data={pageRes.data} 
      query={pageRes.query} 
      variables={pageRes.variables} 
    />
  );
}
