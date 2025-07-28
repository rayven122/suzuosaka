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
import { CalendarIcon, PencilIcon } from "lucide-react";

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

  // 新しいtagsフィールドを使用
  const tags = blog.tags && Array.isArray(blog.tags) ? blog.tags : [];

  // 同じカテゴリの他の記事を取得（関連記事用）
  const allBlogs = await getAllBlogs();
  const relatedBlogs = allBlogs.filter(
    (relatedBlog) =>
      relatedBlog.category.id === blog.category.id &&
      relatedBlog.id !== blog.id,
  );

  return (
    <div className="min-h-screen bg-gradient-main">
      <LogoLink2 />
      <div className="container mx-auto px-4 py-4 sm:py-8 sm:px-6 lg:px-8">
        {/* パンくずリスト */}
        <nav className="mb-4 text-xs sm:mb-8 sm:text-sm" aria-label="パンくずリスト">
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
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row">
          {/* メインコンテンツ */}
          <article className="lg:w-3/4">
            <div className="overflow-hidden rounded-[20px] border-2 border-black bg-white shadow-lg">
              {/* アイキャッチ画像 */}
              {blog.eyecatch && (
                <div className="relative h-48 w-full overflow-hidden sm:h-64 md:h-96">
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
              <div className="p-4 sm:p-6 md:p-10">
                <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4 sm:gap-4">
                  <Link href={`/blogs/${blog.category.slug}`}>
                    <span className="inline-block rounded-full bg-primary-dark px-2.5 py-0.5 text-xs font-semibold text-white transition-colors hover:bg-primary sm:px-3 sm:py-1 sm:text-sm">
                      {blog.category.name}
                    </span>
                  </Link>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1">
                      <CalendarIcon className="h-3 w-3 text-primary sm:h-4 sm:w-4" />
                      <time
                        dateTime={blog.publishedAt}
                        className="text-xs font-medium sm:text-sm"
                      >
                        公開:{" "}
                        {new Date(blog.publishedAt).toLocaleDateString(
                          "ja-JP",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "numeric",
                          },
                        )}
                      </time>
                    </div>
                    {blog.updatedAt !== blog.publishedAt && (
                      <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1">
                        <PencilIcon className="h-3 w-3 text-primary sm:h-4 sm:w-4" />
                        <time
                          dateTime={blog.updatedAt}
                          className="text-xs font-medium sm:text-sm"
                        >
                          更新:{" "}
                          {new Date(blog.updatedAt).toLocaleDateString(
                            "ja-JP",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "numeric",
                            },
                          )}
                        </time>
                      </div>
                    )}
                  </div>
                </div>

                <h1 className="mb-4 font-shippori-antique-b1 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl">
                  {blog.title}
                </h1>

                {/* タグ */}
                {tags.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {tags.map((tag) => (
                        <Link
                          key={tag.id}
                          href={`/blogs/tags/${tag.slug}`}
                          className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-800 hover:bg-gray-200 sm:px-3 sm:py-1 sm:text-xs"
                          title={tag.description}
                        >
                          #{tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* 本文 */}
                <div
                  className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-black prose-a:text-primary-dark prose-a:underline sm:prose-base md:prose-lg"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* 記事下部CTAボタン */}
                <div className="mt-8 overflow-hidden rounded-[20px] border-2 border-black bg-white shadow-lg sm:mt-12">
                  <div className="bg-primary-dark p-4">
                    <h2 className="text-xl font-bold text-white sm:text-2xl">
                      🎣 川の家おさか 初心者歓迎！釣り体験
                    </h2>
                  </div>
                  <div className="grid gap-4 p-4 md:grid-cols-2 md:gap-6 md:p-6">
                    <div>
                      <h3 className="mb-3 text-base font-bold text-primary-dark sm:text-lg">体験の流れ</h3>
                      <ol className="space-y-2 text-sm text-gray-700 sm:text-base">
                        <li><span className="font-semibold text-primary-dark">1.</span> 受付→道具レンタル（竿・餌など一式）</li>
                        <li><span className="font-semibold text-primary-dark">2.</span> 釣り場へ移動（池・川・渓流から選択）</li>
                        <li><span className="font-semibold text-primary-dark">3.</span> スタッフがサポート！初心者も安心</li>
                        <li><span className="font-semibold text-primary-dark">4.</span> 釣った魚を天ぷらや塩焼きで堪能</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="mb-3 text-base font-bold text-primary-dark sm:text-lg">料金例（2名）</h3>
                      <div className="rounded bg-gray-50 p-4 text-sm sm:text-base">
                        <p>入場料：1,000円（500円×2）</p>
                        <p>道具レンタル：3,500円～</p>
                        <p className="mt-2 font-bold">合計：4,500円～</p>
                        <p className="mt-2 text-xs text-gray-600 sm:text-sm">※魚代・調理代別途</p>
                        <Link 
                          href="/fishing" 
                          className="mt-3 inline-block text-sm font-semibold text-primary-dark underline hover:text-primary sm:text-base"
                        >
                          料金詳細はこちら →
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t bg-primary-light/10 p-5 text-center">
                    <p className="mb-4 text-sm text-gray-700 sm:text-base">
                      手ぶらでOK！家族や友人と楽しい思い出を作りませんか？
                    </p>
                    <Link
                      href="/reservation"
                      className="inline-flex items-center gap-2 rounded-full bg-primary-dark px-8 py-3 text-base font-bold text-white shadow-md transition-all hover:bg-primary sm:text-lg"
                    >
                      <span>予約する</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 関連記事 */}
            {relatedBlogs.length > 0 && (
              <div className="mt-8 sm:mt-12">
                <div className="overflow-hidden rounded-[20px] border-2 border-black bg-white shadow-lg">
                  <div className="bg-primary-dark p-4">
                    <h2 className="text-xl font-bold text-white sm:text-2xl">
                      こちらもおすすめ
                    </h2>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="overflow-x-auto">
                      <div className="flex gap-4 pb-2" style={{ minWidth: 'max-content' }}>
                        {relatedBlogs.map((relatedBlog) => (
                          <Link
                            key={relatedBlog.id}
                            href={`/blogs/${relatedBlog.category.slug}/${relatedBlog.slug}`}
                            className="group block flex-shrink-0"
                            style={{ width: '280px' }}
                          >
                            <div className="overflow-hidden rounded-[15px] border-2 border-black bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                              {relatedBlog.eyecatch ? (
                                <div className="relative h-48 w-full overflow-hidden">
                                  <Image
                                    src={relatedBlog.eyecatch.url}
                                    alt={relatedBlog.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                  <div className="absolute bottom-2 left-2 right-2 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-dark">
                                      続きを読む →
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-primary-light to-primary">
                                  <span className="text-white">No Image</span>
                                </div>
                              )}
                              <div className="p-4">
                                <div className="mb-2 flex items-center gap-2">
                                  <span className="inline-block rounded-full bg-primary-dark/10 px-2 py-0.5 text-xs font-medium text-primary-dark">
                                    {relatedBlog.category.name}
                                  </span>
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <CalendarIcon className="h-3 w-3" />
                                    <time>
                                      {new Date(relatedBlog.publishedAt).toLocaleDateString(
                                        "ja-JP",
                                        {
                                          year: "numeric",
                                          month: "2-digit",
                                          day: "numeric",
                                        },
                                      )}
                                    </time>
                                  </div>
                                </div>
                                <h3 className="line-clamp-2 text-base font-bold text-gray-800 transition-colors duration-300 group-hover:text-primary-dark sm:text-lg">
                                  {relatedBlog.title}
                                </h3>
                                {relatedBlog.description && (
                                  <p className="mt-2 line-clamp-2 text-xs text-gray-600 sm:text-sm">
                                    {relatedBlog.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* スクロールヒント */}
                  {relatedBlogs.length > 1 && (
                    <div className="pb-4 text-center">
                      <p className="text-xs text-gray-500">← 横にスクロールできます →</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </article>

          {/* サイドバー */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 space-y-6">
              {/* カテゴリナビゲーション */}
              <div className="overflow-hidden rounded-[20px] border-2 border-black bg-white shadow-lg">
                <div className="bg-primary-dark p-4">
                  <h2 className="text-xl font-bold text-white">カテゴリ</h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/blogs/${category.slug}`}
                          className={`block rounded-full px-4 py-2 text-sm font-medium transition-all ${
                            category.id === blog.category.id
                              ? "bg-primary-dark text-white hover:bg-primary"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* タグクラウド */}
              {tags.length > 0 && (
                <div className="overflow-hidden rounded-[20px] border-2 border-black bg-white shadow-lg">
                  <div className="bg-primary-dark p-4">
                    <h2 className="text-xl font-bold text-white">タグ</h2>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Link
                          key={tag.id}
                          href={`/blogs/tags/${tag.slug}`}
                          className="inline-block rounded-full bg-primary-dark/10 px-3 py-1 text-xs font-medium text-primary-dark transition-colors hover:bg-primary-dark hover:text-white"
                          title={tag.description}
                        >
                          #{tag.name}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 text-right">
                      <Link
                        href="/blogs/tags"
                        className="text-sm font-semibold text-primary-dark transition-colors hover:text-primary"
                      >
                        すべてのタグを見る →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 予約CTAボタン */}
              <div className="overflow-hidden rounded-[20px] border-2 border-black bg-white shadow-lg">
                <div className="bg-primary-dark p-4">
                  <h2 className="text-xl font-bold text-white">川の家おさか</h2>
                </div>
                <div className="p-6">
                  <p className="mb-6 text-sm text-gray-700">
                    釣り体験のご予約はオンラインで簡単にできます。
                  </p>
                  <Link
                    href="/reservation"
                    className="flex items-center justify-center gap-2 rounded-full bg-primary-dark px-6 py-3 font-bold text-white transition-all hover:bg-primary"
                  >
                    <span>今すぐ予約する</span>
                    <span className="text-xl">→</span>
                  </Link>
                </div>
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
            keywords: tags.map(tag => tag.name).join(", "),
          }),
        }}
      />
    </div>
  );
}
