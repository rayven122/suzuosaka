import { MetadataRoute } from "next";
import {
  getAllBlogs,
  getAllBlogCategories,
  getAllNews,
  getAllTags,
} from "@/libs/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 基本的なページのリスト
  const basePages: MetadataRoute.Sitemap = [
    {
      url: "https://www.suzu-osaka.com/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://www.suzu-osaka.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.suzu-osaka.com/fishing",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.suzu-osaka.com/eatery",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.suzu-osaka.com/access",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.suzu-osaka.com/reservation",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.suzu-osaka.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://www.suzu-osaka.com/info",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.suzu-osaka.com/news",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://www.suzu-osaka.com/blogs",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://www.suzu-osaka.com/blogs/all",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://www.suzu-osaka.com/blogs/tags",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // ブログカテゴリページ
  const categories = await getAllBlogCategories();
  const categoryPages = categories.map((category) => ({
    url: `https://www.suzu-osaka.com/blogs/${category.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // ブログ記事ページ
  const blogs = await getAllBlogs();
  const blogPages = blogs.map((blog) => ({
    url: `https://www.suzu-osaka.com/blogs/${blog.category.id}/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // タグページ
  const tags = await getAllTags();
  const tagPages = tags.map((tag) => ({
    url: `https://www.suzu-osaka.com/blogs/tags/${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  // ニュース記事ページ
  const news = await getAllNews();
  const newsPages = news.map((item) => ({
    url: `https://www.suzu-osaka.com/news/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // すべてのページを結合
  return [
    ...basePages,
    ...categoryPages,
    ...blogPages,
    ...tagPages,
    ...newsPages,
  ];
}
