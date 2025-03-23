import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getAllBlogCategories,
  getBlogsByCategory,
  type BlogCategory,
} from "@/libs/client";

type Props = {
  params: {
    category: string;
  };
};

// 動的メタデータの生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = await getAllBlogCategories();
  const category = categories.find((cat) => cat.slug === params.category);

  if (!category) {
    return {
      title: "カテゴリが見つかりません | 川の家おさかブログ",
      description: "指定されたカテゴリは存在しません。",
    };
  }

  return {
    title: `${category.name} | 川の家おさかブログ`,
    description: `川の家おさかブログの${category.name}カテゴリの記事一覧です。`,
    alternates: {
      canonical: `https://www.suzu-osaka.com/blogs/${category.slug}`,
    },
  };
}

// 静的パラメータを生成
export async function generateStaticParams() {
  const categories = await getAllBlogCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const categories = await getAllBlogCategories();
  const currentCategory = categories.find(
    (cat) => cat.slug === params.category,
  );

  if (!currentCategory) {
    notFound();
  }

  const blogs = await getBlogsByCategory(currentCategory.id);

  return (
    <div className="min-h-screen bg-gradient-main px-4 py-16 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* ヘッダー */}
        <div className="mb-12 text-center">
          <Link
            href="/blogs"
            className="mb-4 inline-block text-sm font-medium text-primary hover:underline"
          >
            ← ブログトップに戻る
          </Link>
          <h1 className="mb-4 font-shippori-antique-b1 text-4xl font-bold md:text-5xl">
            {currentCategory.name}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            川の家おさかブログの「{currentCategory.name}
            」カテゴリの記事一覧です。
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
                className={`rounded-full px-4 py-2 transition-all ${
                  category.id === currentCategory.id
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-primary/80 hover:text-white"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 記事一覧 */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => {
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
                    <Link
                      href={`/blogs/${blog.category.slug}/${blog.slug}`}
                      className="block"
                    >
                      <h3 className="mb-2 text-xl font-bold transition-colors hover:text-primary">
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
                        {new Date(blog.publishedAt).toLocaleDateString(
                          "ja-JP",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
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
        ) : (
          <div className="rounded-lg bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm">
            <p className="text-lg font-medium">
              このカテゴリにはまだ記事がありません。
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
