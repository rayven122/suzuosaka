import { Metadata } from "next";
import { getAllBlogCategories, getAllBlogs } from "@/libs/client";
import Link from "next/link";
import Image from "next/image";

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
    <div className="min-h-screen bg-gradient-main px-4 py-16 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* ヘッダー */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-shippori-antique-b1 text-4xl font-bold md:text-5xl">
            ブログ
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            下呂市小坂町の釣り場「川の家おさか」の釣り情報、初心者向けガイド、
            釣った魚のレシピなど様々な情報を発信しています。
          </p>
        </div>

        {/* カテゴリナビゲーション */}
        <div className="mb-12 rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-bold">カテゴリ</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blogs/${category.slug}`}
                className="rounded-full bg-primary px-4 py-2 text-white transition-all hover:bg-primary/80"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 最新記事一覧 */}
        <h2 className="mb-6 text-2xl font-bold">最新記事</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestSixBlogs.map((blog) => {
            // タグを分割して配列に変換
            const tags = blog.tags
              ? blog.tags
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean)
              : [];

            return (
              <div
                key={blog.id}
                className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl"
              >
                {blog.eyecatch && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={blog.eyecatch.url}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-all hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {blog.category.name}
                    </span>
                  </div>
                  <Link
                    href={`/blogs/${blog.category.slug}/${blog.slug}`}
                    className="block"
                  >
                    <h3 className="mb-2 text-xl font-bold transition-colors">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="mb-4 text-sm text-gray-600">
                    {blog.description}
                  </p>

                  {/* タグの表示 */}
                  {tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1">
                      {tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blogs/tags/${encodeURIComponent(tag)}`}
                          className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-200"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {new Date(blog.publishedAt).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <Link
                      href={`/blogs/${blog.category.slug}/${blog.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      続きを読む →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* もっと見る */}
        {latestBlogs.length > 6 && (
          <div className="mt-12 text-center">
            <Link
              href="/blogs/all"
              className="inline-block rounded-full bg-primary px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-primary/80"
            >
              全ての記事を見る
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
