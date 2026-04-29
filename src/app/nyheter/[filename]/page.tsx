import { client } from "../../../../tina/__generated__/client";
import { NyheterPostClient } from "@/components/NyheterPostClient";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

export default async function NyhetPostPage({ params }: { params: Promise<{ filename: string }> }) {
  try {
    const { filename } = await params;
    const res = await client.queries.news({ relativePath: `${filename}.md` });
    return (
      <NyheterPostClient 
        data={res.data} 
        query={res.query} 
        variables={res.variables} 
      />
    );
  } catch (error) {
    console.error("Could not fetch individual news post:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const newsDirectory = path.join(process.cwd(), "content/news");
    if (!fs.existsSync(newsDirectory)) {
      console.warn("News directory not found:", newsDirectory);
      return [];
    }
    
    const filenames = fs.readdirSync(newsDirectory);
    const paths = filenames
      .filter(file => file.endsWith(".md"))
      .map(file => ({
        filename: file.replace(".md", "")
      }));

    console.log("Generated static params for news (via fs):", paths);
    return paths;
  } catch (error) {
    console.error("Error generating static params for news (via fs):", error);
    return [];
  }
}
