import { client } from "../../../tina/__generated__/client";
import { SponsorerPageClient } from "@/components/SponsorerPageClient";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const metadata: Metadata = {
  title: "Sponsorer & Samarbeidspartnere",
  description: "Støtt lokalsporten i Eidsvoll. Se våre sponsorer og samarbeidspartnere, og les om hvordan din bedrift kan bidra til lokal idrettsglede.",
};

export default async function SponsorerPage() {
  const filePath = path.join(process.cwd(), "content/sponsorer/index.md");
  let localData = {
    sponsorer: {
      title: "Sponsorer & Samarbeidspartnere",
      blocks: [],
    },
  };

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter } = matter(fileContent);
    localData = {
      sponsorer: {
        title: frontmatter.title || "Sponsorer & Samarbeidspartnere",
        blocks: frontmatter.blocks || [],
      },
    };
  } catch (err) {
    console.warn("Could not read local sponsor markdown file:", err);
  }

  let pageRes: any = { data: localData, query: "", variables: {} };

  try {
    const result = await client.queries.sponsorer({ relativePath: "index.md" });
    if (result?.data?.sponsorer) {
      pageRes = {
        ...result,
        data: {
          ...localData,
          ...result.data,
          sponsorer: {
            ...localData.sponsorer,
            ...result.data.sponsorer,
          },
        },
      };
    }
  } catch (error) {
    console.warn("TinaCMS Sponsorer fetch failed (using local fallback data):", error);
  }

  return (
    <SponsorerPageClient 
      data={pageRes.data as any} 
      query={pageRes.query} 
      variables={pageRes.variables} 
    />
  );
}
