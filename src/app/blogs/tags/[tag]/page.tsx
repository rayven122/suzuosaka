import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogs, getBlogsByTag } from "@/libs/client";

type Props = {
  params: {
    tag: string;
  };
};

// 動的メタデータの生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag);

  return {
    title: `「${decodedTag}」のタグがついた記事 | 川の家おさかブログ`,
    description: `川の家おさかブログの「${decodedTag}」タグがついている記事一覧です。`,
    alternates: {
      canonical: `https://www.suzu-osaka.com/blogs/tags/${params.tag}`,
    },
  };
}

// 静的パラメータを生成
export async function generateStaticParams() {
  const blogs = await getAllBlogs();

  // すべてのタグを収集
  const allTags = new Set<string>();
  blogs.forEach((blog) => {
    if (blog.tags) {
      blog.tags.split(",").forEach((tag) => {
        const trimmedTag = tag.trim();
        if (trimmedTag) {
          allTags.add(trimmedTag);
        }
      });
    }
  });

  return Array.from(allTags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export default async function TagPage({ params }: Props) {
  const decodedTag = decodeURIComponent(params.tag);
  const blogs = await getBlogsByTag(decodedTag);

  if (blogs.length === 0) {
    notFound();
  }

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
          <Link
            href="/blogs/tags"
            className="mb-4 ml-4 inline-block text-sm font-medium text-primary hover:underline"
          >
            すべてのタグを見る
          </Link>
          <h1 className="mb-4 font-shippori-antique-b1 text-4xl font-bold md:text-5xl">
            #{decodedTag}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            「{decodedTag}」のタグがついた記事一覧です。
          </p>
        </div>

        {/* 記事一覧 */}
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
                  <div className="mb-2">
                    <Link href={`/blogs/${blog.category.slug}`}>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/20">
                        {blog.category.name}
                      </span>
                    </Link>
                  </div>
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
                  <div className="mb-3 flex flex-wrap gap-1">
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blogs/tags/${encodeURIComponent(tag)}`}
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          tag === decodedTag
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>

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
      </div>
    </div>
  );
}
