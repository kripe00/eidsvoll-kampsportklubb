import { client } from "../../../tina/__generated__/client";
import { GenericPageClient } from "@/components/GenericPageClient";
import { ClubLinks } from "@/components/ClubLinks";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const metadata: Metadata = {
  title: "Om Oss | Eidsvoll Kampsportklubb (EKK)",
  description:
    "Bli kjent med Eidsvoll Kampsportklubb (EKK) på Dal. Vi viderefører kampsportaktiviteten fra Rambukk Sport AS i lyse, moderne lokaler med høyt kvalifiserte instruktører i BJJ, Muay Thai og Crosstrening.",
  alternates: {
    canonical: "/om-oss",
  },
  keywords: [
    "Eidsvoll Kampsportklubb",
    "EKK",
    "Rambukk Sport AS",
    "Rambukk Sport",
    "Rambukk kampsport",
    "Råholt",
    "Dal",
    "BJJ Eidsvoll",
    "Muay Thai Dal",
    "kampsportklubb eidsvoll",
  ],
};

function getLocalOmOssData() {
  try {
    const filePath = path.join(process.cwd(), "content/om-oss/index.md");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter } = matter(fileContent);
    return {
      title: frontmatter.title || "Om oss",
      description: frontmatter.description || "",
      blocks: frontmatter.blocks || [],
    };
  } catch (err) {
    console.warn("Kunne ikke lese lokal content/om-oss/index.md:", err);
    return { title: "Om oss", description: "", blocks: [] };
  }
}

export default async function OmOssPage() {
  const localOmOssData = getLocalOmOssData();
  let pageRes: any = { data: { omOss: localOmOssData }, query: "", variables: {} };

  try {
    const res = await client.queries.omOss({ relativePath: "index.md" });
    if (res?.data?.omOss) {
      pageRes = res;
    }
  } catch (error) {
    console.error("TinaCMS OmOss fetch failed (using local fallback data):", error);
  }

  return (
    <GenericPageClient
      data={pageRes.data}
      query={pageRes.query}
      variables={pageRes.variables}
      extraContent={<ClubLinks />}
    />
  );
}
