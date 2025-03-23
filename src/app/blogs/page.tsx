import { Metadata } from "next";
import { getAllBlogCategories, getAllBlogs } from "@/libs/client";
import Link from "next/link";
import { BlogHeader } from "../_components/blog/BlogHeader";
import { CategoryNavigation } from "../_components/blog/CategoryNavigation";
import { BlogCard } from "../_components/blog/BlogCard";
import { LogoLink2 } from "../_components/common/LogoLink2";

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
    <div className="min-h-screen bg-gradient-main px-4 py-8 sm:px-6 lg:px-8">
      <LogoLink2 />
      <div className="container mx-auto">
        <BlogHeader
          title="ブログ"
          description="下呂市小坂町の釣り場「川の家おさか」の釣り情報、初心者向けガイド、釣った魚のレシピなど様々な情報を発信しています。"
        />

        <CategoryNavigation categories={categories} className="mb-12" />

        {/* 最新記事一覧 */}
        <h2 className="mb-6 text-2xl font-bold">最新記事</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestSixBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* すべての記事を見るボタン */}
        <div className="mt-12 text-center">
          <Link
            href="/blogs/all"
            className="rounded-full bg-primary px-6 py-3 text-white shadow-lg transition-all duration-300 hover:bg-primary-dark"
          >
            すべての記事を見る
          </Link>
        </div>
      </div>
    </div>
  );
}
