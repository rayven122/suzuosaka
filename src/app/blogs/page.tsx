import { Metadata } from "next";
import { getAllBlogCategories, getAllBlogs } from "@/libs/client";
import { BlogPageClient } from "./BlogPageClient";

export const metadata: Metadata = {
  title: "ブログ | 川の家おさか - 下呂市小坂町の釣り場",
  description:
    "川の家おさか - 下呂市小坂町の釣り場「川の家おさか」の釣り情報、初心者向けガイド、レシピなど、釣りに関する様々な情報を発信しています。",
  alternates: {
    canonical: "https://www.suzu-osaka.com/blogs",
  },
};

export default async function BlogPage() {
  const [categories, latestBlogs] = await Promise.all([
    getAllBlogCategories(),
    getAllBlogs(),
  ]);

  // 最新の6記事だけを表示
  const latestSixBlogs = latestBlogs.slice(0, 6);

  return (
    <BlogPageClient 
      categories={categories} 
      latestBlogs={latestSixBlogs}
      allBlogs={latestBlogs}
    />
  );
}