import { client } from "../../../tina/__generated__/client";
import { GenericPageClient } from "@/components/GenericPageClient";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const metadata: Metadata = {
  title: "Medlemskap",
  description: "Bli medlem i Eidsvoll Kampsportklubb. Se priser, prøvetimer og meld deg på trening i Brasiliansk Jiu-Jitsu (BJJ) og Muay Thai.",
};

export default async function MedlemskapPage() {
  const filePath = path.join(process.cwd(), "content/medlemskap/index.md");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter } = matter(fileContent);

  const localMedlemskapData = {
    medlemskap: {
      title: frontmatter.title || "Medlemskap",
      blocks: frontmatter.blocks || [],
    },
  };

  let pageRes: any = { data: localMedlemskapData, query: "", variables: {} };

  try {
    const result = await client.queries.medlemskap({ relativePath: "index.md" });
    if (result.data?.medlemskap) {
      pageRes = {
        ...result,
        data: {
          ...result.data,
          medlemskap: {
            ...localMedlemskapData.medlemskap,
            ...result.data.medlemskap,
          },
        },
      };
    }
  } catch (error) {
    console.warn("TinaCMS Medlemskap fetch failed (using local fallback data):", error);
  }

  return (
    <GenericPageClient 
      data={pageRes.data as any} 
      query={pageRes.query} 
      variables={pageRes.variables} 
      hideHeader={true}
    />
  );
}
