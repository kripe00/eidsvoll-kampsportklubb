import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kampsporteidsvoll.no";
  const today = new Date().toISOString().split("T")[0];

  // 1. Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/nyheter`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/om-oss`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/styret`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/styret/organisasjonsplan`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sponsorer`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/medlemskap`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];

  // 2. Dynamic news routes
  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const newsDirectory = path.join(process.cwd(), "content/news");
    if (fs.existsSync(newsDirectory)) {
      const filenames = fs.readdirSync(newsDirectory);
      newsRoutes = filenames
        .filter((file) => file.endsWith(".md"))
        .map((file) => {
          const filePath = path.join(newsDirectory, file);
          const stats = fs.statSync(filePath);
          const lastModified = stats.mtime.toISOString().split("T")[0];
          const filename = file.replace(".md", "");
          
          return {
            url: `${baseUrl}/nyheter/${encodeURIComponent(filename)}`,
            lastModified: lastModified,
            changeFrequency: "monthly",
            priority: 0.6,
          };
        });
    }
  } catch (error) {
    console.error("Error reading news directory for sitemap:", error);
  }

  return [...staticRoutes, ...newsRoutes];
}
