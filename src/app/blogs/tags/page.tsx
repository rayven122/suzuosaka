import { Metadata } from "next";
import { getAllTagsWithCount } from "@/libs/client";
import { TagsPageClient } from "./TagsPageClient";

export const metadata: Metadata = {
  title: "タグ一覧 | 川の家おさかブログ",
  description:
    "川の家おさかブログのすべてのタグ一覧です。釣り情報、初心者ガイド、レシピなど様々な情報を掲載。",
  alternates: {
    canonical: "https://www.suzu-osaka.com/blogs/tags",
  },
};

export default async function TagsPage() {
  const tagsWithCount = await getAllTagsWithCount();

  return <TagsPageClient initialTags={tagsWithCount} />;
}