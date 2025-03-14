import { MetadataRoute } from "next";
import { getAllNews } from "@/libs/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 静的なページのsitemap
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://www.suzu-osaka.com/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://www.suzu-osaka.com/fishing",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.suzu-osaka.com/news",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  // ニュース記事の動的なsitemap
  const news = await getAllNews();
  const newsPages: MetadataRoute.Sitemap = news.map((article) => ({
    url: `https://www.suzu-osaka.com/news/${article.id}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...newsPages];
}
