import { Metadata } from "next";
import Link from "next/link";
import { getAllBlogs, getAllBlogCategories } from "@/libs/client";
import { BlogHeader } from "@/app/_components/blog/BlogHeader";
import { CategoryNavigation } from "@/app/_components/blog/CategoryNavigation";
import { BlogCard } from "@/app/_components/blog/BlogCard";
import { LogoLink2 } from "@/app/_components/common/LogoLink2";

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

  return (
    <div className="min-h-screen bg-gradient-main px-4 py-8 sm:px-6 lg:px-8">
      <LogoLink2 />
      <div className="container mx-auto">
        <BlogHeader
          title="全ての記事"
          description="川の家おさかのブログ記事をすべて一覧で表示しています。"
          backLink={{
            href: "/blogs",
            text: "ブログトップに戻る",
          }}
        />

        <CategoryNavigation
          categories={categories}
          className="mb-12"
          activeCategory="all"
        />

        {/* 記事一覧 */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm">
            <p className="text-lg font-medium">
              現在、ブログ記事はありません。
            </p>
            <Link
              href="/blogs"
              className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-white transition-all hover:bg-primary/80"
            >
              ブログトップに戻る
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
