import { client } from "../../../../tina/__generated__/client";
import { NyheterPostClient } from "@/components/NyheterPostClient";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ filename: string }> }): Promise<Metadata> {
  try {
    const { filename } = await params;
    const decodedFilename = decodeURIComponent(filename);
    const filePath = path.join(process.cwd(), "content/news", `${decodedFilename}.md`);
    
    let post: any = null;
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      post = data;
    }

    try {
      const res = await client.queries.news({ relativePath: `${decodedFilename}.md` });
      if (res.data?.news) {
        post = { ...post, ...res.data.news };
      }
    } catch {
      // Use local fallback
    }

    if (!post) {
      return { title: "Nyheter" };
    }

    return {
      title: post.title,
      description: post.description || `Les nyheten "${post.title}" hos Eidsvoll Kampsportklubb.`,
      openGraph: {
        title: post.title,
        description: post.description || `Les nyheten "${post.title}" hos Eidsvoll Kampsportklubb.`,
        images: post.image ? [
          {
            url: post.image,
            alt: post.title || "Nyhetsbilde",
          }
        ] : undefined,
      }
    };
  } catch (error) {
    console.error("Error generating metadata for news post:", error);
    return {
      title: "Nyheter",
    };
  }
}

export default async function NyhetPostPage({ params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  const decodedFilename = decodeURIComponent(filename);
  const filePath = path.join(process.cwd(), "content/news", `${decodedFilename}.md`);

  let localPostData: any = null;
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    localPostData = {
      news: {
        ...data,
        body: content,
      },
    };
  }

  let pageRes: any = { data: localPostData, query: "", variables: {} };

  try {
    const res = await client.queries.news({ relativePath: `${decodedFilename}.md` });
    if (res?.data?.news) {
      pageRes = {
        ...res,
        data: {
          ...localPostData,
          ...res.data,
          news: {
            ...localPostData?.news,
            ...res.data.news,
          },
        },
      };
    }
  } catch (error) {
    console.warn("TinaCMS individual news fetch failed (using local fallback data):", error);
  }

  if (!pageRes?.data?.news) {
    notFound();
  }

  return (
    <NyheterPostClient 
      data={pageRes.data} 
      query={pageRes.query} 
      variables={pageRes.variables} 
    />
  );
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
