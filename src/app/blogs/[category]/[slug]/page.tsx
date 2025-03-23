import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getAllBlogs,
  getBlogBySlug,
  getAllBlogCategories,
} from "@/libs/client";
import { LogoLink2 } from "@/app/_components/common/LogoLink2";

type Props = {
  params: {
    category: string;
    slug: string;
  };
};

// 動的メタデータの生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "記事が見つかりません | 川の家おさかブログ",
      description: "指定された記事は存在しません。",
    };
  }

  return {
    title: `${blog.title} | 川の家おさかブログ`,
    description: blog.description,
    alternates: {
      canonical: `https://www.suzu-osaka.com/blogs/${blog.category.slug}/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      url: `https://www.suzu-osaka.com/blogs/${blog.category.slug}/${blog.slug}`,
      images: [
        {
          url: blog.eyecatch?.url || "https://www.suzu-osaka.com/og-image.jpg",
          width: blog.eyecatch?.width || 1200,
          height: blog.eyecatch?.height || 630,
          alt: blog.title,
        },
      ],
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
    },
  };
}

// 静的パラメータを生成
export async function generateStaticParams() {
  const blogs = await getAllBlogs();

  return blogs.map((blog) => ({
    category: blog.category.slug,
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const blog = await getBlogBySlug(params.slug);
  const categories = await getAllBlogCategories();

  if (!blog || blog.category.slug !== params.category) {
    notFound();
  }

  // タグを分割して配列に変換
  const tags = blog.tags
    ? blog.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  // 同じカテゴリの他の記事から3つ取得（関連記事用）
  const allBlogs = await getAllBlogs();
  const relatedBlogs = allBlogs
    .filter(
      (relatedBlog) =>
        relatedBlog.category.id === blog.category.id &&
        relatedBlog.id !== blog.id,
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-main">
      <LogoLink2 />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* パンくずリスト */}
        <nav className="mb-8 text-sm" aria-label="パンくずリスト">
          <ol className="flex flex-wrap items-center">
            <li className="flex items-center">
              <Link href="/" className="hover:underline">
                ホーム
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <Link href="/blogs" className=" hover:underline">
                ブログ
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <Link
                href={`/blogs/${blog.category.slug}`}
                className=" hover:underline"
              >
                {blog.category.name}
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="line-clamp-1 text-gray-500">{blog.title}</li>
          </ol>
        </nav>

        {/* 記事コンテンツ */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* メインコンテンツ */}
          <article className="lg:w-3/4">
            <div className="overflow-hidden rounded-lg bg-white/90 shadow-lg backdrop-blur-sm">
              {/* アイキャッチ画像 */}
              {blog.eyecatch && (
                <div className="relative h-64 w-full overflow-hidden md:h-96">
                  <Image
                    src={blog.eyecatch.url}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* 記事ヘッダー */}
              <div className="p-6 md:p-10">
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <Link href={`/blogs/${blog.category.slug}`}>
                    <span className="inline-block rounded border-l-4 border-primary bg-primary-light/10 px-3 py-1 text-sm font-semibold text-primary transition-colors hover:bg-primary/10">
                      {blog.category.name}
                    </span>
                  </Link>
                  <time
                    dateTime={blog.publishedAt}
                    className="text-sm text-gray-500"
                  >
                    公開日:{" "}
                    {new Date(blog.publishedAt).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {blog.updatedAt !== blog.publishedAt && (
                    <time
                      dateTime={blog.updatedAt}
                      className="text-sm text-gray-500"
                    >
                      更新日:{" "}
                      {new Date(blog.updatedAt).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  )}
                </div>

                <h1 className="mb-6 font-shippori-antique-b1 text-3xl font-bold md:text-4xl">
                  {blog.title}
                </h1>

                {/* タグ */}
                {tags.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blogs/tags/${encodeURIComponent(tag)}`}
                          className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 hover:bg-gray-200"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* 本文 */}
                <div
                  className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-black prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* 記事下部CTAボタン */}
                <div className="mt-12 flex flex-col items-center justify-center rounded-lg bg-primary/10 p-6 text-center sm:p-10">
                  <h2 className="mb-4 text-xl font-bold">
                    川の家おさかで釣り体験をしてみませんか？
                  </h2>
                  <p className="mb-6 text-gray-700">
                    初心者の方も安心！スタッフがサポートします。
                    家族や友人と楽しい思い出を作りましょう。
                  </p>
                  <Link
                    href="/reservation"
                    className="inline-block rounded-full bg-primary px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-primary/80"
                  >
                    予約する
                  </Link>
                </div>
              </div>
            </div>

            {/* 関連記事 */}
            {relatedBlogs.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold">関連記事</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedBlogs.map((relatedBlog) => (
                    <div
                      key={relatedBlog.id}
                      className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl"
                    >
                      {relatedBlog.eyecatch && (
                        <div className="relative h-40 w-full overflow-hidden">
                          <Image
                            src={relatedBlog.eyecatch.url}
                            alt={relatedBlog.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-all hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <Link
                          href={`/blogs/${relatedBlog.category.slug}/${relatedBlog.slug}`}
                          className="block"
                        >
                          <h3 className="mb-2 text-lg font-bold transition-colors hover:text-primary">
                            {relatedBlog.title}
                          </h3>
                        </Link>
                        <div className="text-xs text-gray-500">
                          {new Date(relatedBlog.publishedAt).toLocaleDateString(
                            "ja-JP",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* サイドバー */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 space-y-8">
              {/* カテゴリナビゲーション */}
              <div className="rounded-lg bg-white/90 p-6 shadow-lg backdrop-blur-sm">
                <h2 className="mb-4 text-xl font-bold">カテゴリ</h2>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/blogs/${category.slug}`}
                        className={`block rounded px-3 py-2 transition-colors ${
                          category.id === blog.category.id
                            ? "rounded border-l-4 border-primary bg-primary/5 px-3 py-2 font-semibold text-primary hover:bg-primary/10"
                            : "rounded px-3 py-2 hover:bg-gray-200"
                        }`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* タグクラウド */}
              {tags.length > 0 && (
                <div className="rounded-lg bg-white/90 p-6 shadow-lg backdrop-blur-sm">
                  <h2 className="mb-4 text-xl font-bold">タグ</h2>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blogs/tags/${encodeURIComponent(tag)}`}
                        className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 hover:bg-gray-200"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 text-right">
                    <Link
                      href="/blogs/tags"
                      className="text-sm font-medium text-primary-dark hover:underline"
                    >
                      すべてのタグを見る →
                    </Link>
                  </div>
                </div>
              )}

              {/* 予約CTAボタン */}
              <div className="rounded-lg bg-white/90 p-6 shadow-lg backdrop-blur-sm">
                <h2 className="mb-4 text-lg font-bold">川の家へのご予約</h2>
                <p className="mb-4 text-sm text-gray-700">
                  釣り体験のご予約はオンラインで簡単にできます。
                </p>
                <Link
                  href="/reservation"
                  className="block rounded-full bg-primary px-4 py-2 text-center font-bold text-white transition-all hover:bg-primary/80"
                >
                  今すぐ予約する
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            image:
              blog.eyecatch?.url || "https://www.suzu-osaka.com/og-image.jpg",
            datePublished: blog.publishedAt,
            dateModified: blog.updatedAt,
            author: {
              "@type": "Organization",
              name: "川の家おさか",
              url: "https://www.suzu-osaka.com",
            },
            publisher: {
              "@type": "Organization",
              name: "川の家おさか",
              logo: {
                "@type": "ImageObject",
                url: "https://www.suzu-osaka.com/logo.png",
              },
            },
            description: blog.description,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.suzu-osaka.com/blogs/${blog.category.slug}/${blog.slug}`,
            },
            keywords: tags.join(", "),
          }),
        }}
      />
    </div>
  );
}
