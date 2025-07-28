import { Metadata } from "next";
import { getAllBlogs, getAllBlogCategories } from "@/libs/client";
import { AllBlogsPageClient } from "./AllBlogsPageClient";

export const metadata: Metadata = {
  title: "全ての記事 | 川の家おさかブログ",
  description:
    "川の家おさかのブログ記事をすべて一覧で表示しています。釣り情報、初心者ガイド、レシピなど様々な情報を掲載。",
  alternates: {
    canonical: "https://www.suzu-osaka.com/blogs/all",
  },
};

export default async function AllBlogsPage() {
  const [blogs, categories] = await Promise.all([
    getAllBlogs(),
    getAllBlogCategories(),
  ]);

  return <AllBlogsPageClient blogs={blogs} categories={categories} />;
}