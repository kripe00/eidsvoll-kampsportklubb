import { client } from "../../../../tina/__generated__/client";
import { OrganisasjonsplanClient } from "@/components/OrganisasjonsplanClient";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const metadata: Metadata = {
  title: "Organisasjonsplan",
  description: "Les Eidsvoll Kampsportklubbs organisasjonsplan. Informasjon om klubbens struktur, ansvarsområder og styringsorganer.",
};

export default async function OrganisasjonsplanPage() {
  const filePath = path.join(process.cwd(), "content/organisasjonsplan/index.md");
  let localData = {
    organisasjonsplan: {
      title: "Organisasjonsplan for Eidsvoll Kampsportklubb",
      body: "",
    },
  };

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContent);
    localData = {
      organisasjonsplan: {
        title: frontmatter.title || "Organisasjonsplan for Eidsvoll Kampsportklubb",
        body: content,
      },
    };
  } catch (err) {
    console.warn("Could not read local organisasjonsplan markdown file:", err);
  }

  let pageRes: any = { data: localData, query: "", variables: {} };

  try {
    const res = await client.queries.organisasjonsplan({ relativePath: "index.md" });
    if (res.data?.organisasjonsplan) {
      pageRes = {
        ...res,
        data: {
          ...localData,
          ...res.data,
          organisasjonsplan: {
            ...localData.organisasjonsplan,
            ...res.data.organisasjonsplan,
          },
        },
      };
    }
  } catch (error) {
    console.warn("TinaCMS Organisasjonsplan fetch failed (using local fallback data):", error);
  }

  return (
    <OrganisasjonsplanClient 
      data={pageRes.data} 
      query={pageRes.query} 
      variables={pageRes.variables} 
    />
  );
}
