import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllNews, getNewsBySlug } from "@/libs/client";
import { LogoLink2 } from "@/app/_components/common/LogoLink2";

type Props = {
  params: {
    slug: string;
  };
};

// 動的メタデータの生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const news = await getNewsBySlug(params.slug);

  if (!news) {
    return {
      title: "記事が見つかりません | 川の家おさか - RIVER HOUSE OSAKAニュース",
      description: "指定された記事は存在しません。",
    };
  }

  return {
    title: `${news.title} | 川の家おさかニュース`,
    description: news.content.substring(0, 160).replace(/<[^>]*>/g, ""),
    alternates: {
      canonical: `https://www.suzu-osaka.com/news/${news.slug}`,
    },
    openGraph: {
      title: news.title,
      description: news.content.substring(0, 160).replace(/<[^>]*>/g, ""),
      type: "article",
      url: `https://www.suzu-osaka.com/news/${news.slug}`,
      images: news.eyecatch
        ? [
            {
              url: news.eyecatch.url,
              width: news.eyecatch.width,
              height: news.eyecatch.height,
              alt: news.title,
            },
          ]
        : [
            {
              url: "https://www.suzu-osaka.com/og-image.jpg",
              width: 1200,
              height: 630,
              alt: news.title,
            },
          ],
      publishedTime: news.publishedAt,
      modifiedTime: news.updatedAt,
    },
  };
}

// 静的パラメータを生成
export async function generateStaticParams() {
  const allNews = await getAllNews();

  return allNews.map((news) => ({
    slug: news.slug,
  }));
}

export default async function NewsPostPage({ params }: Props) {
  const news = await getNewsBySlug(params.slug);

  if (!news) {
    notFound();
  }

  // 同じカテゴリの他の記事から3つ取得（関連記事用）
  const allNews = await getAllNews();
  const relatedNews = allNews
    .filter((relatedItem) => relatedItem.id !== news.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-main py-16">
      <div className="flex items-center gap-3">
        <LogoLink2 />
        {/* パンくずリスト */}
        <nav className="mb-8 text-sm" aria-label="パンくずリスト">
          <ol className="flex flex-wrap items-center">
            <li className="flex items-center">
              <Link href="/" className=" hover:underline">
                ホーム
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <Link href="/news" className=" hover:underline">
                お知らせ
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="line-clamp-1 text-gray-500">{news.title}</li>
          </ol>
        </nav>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ニュースコンテンツ */}
        <div className="mx-auto max-w-4xl">
          <article className="overflow-hidden rounded-lg bg-white/90 shadow-lg backdrop-blur-sm">
            {/* アイキャッチ画像（あれば） */}
            {news.eyecatch && (
              <div className="relative h-64 w-full overflow-hidden md:h-96">
                <Image
                  src={news.eyecatch.url}
                  alt={news.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 900px, 800px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* 記事ヘッダー */}
            <div className="p-6 md:p-10">
              <div className="mb-4 text-sm text-gray-500">
                <time dateTime={news.publishedAt}>
                  {new Date(news.publishedAt).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {news.updatedAt !== news.publishedAt && (
                  <span className="ml-4">
                    (更新日:{" "}
                    {new Date(news.updatedAt).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    )
                  </span>
                )}
              </div>

              <h1 className="mb-6 font-shippori-antique-b1 text-3xl font-bold md:text-4xl">
                {news.title}
              </h1>

              {/* 本文 */}
              <div
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-black prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </div>
          </article>

          {/* 関連ニュース */}
          {relatedNews.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">その他のお知らせ</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedNews.map((relatedItem) => (
                  <div
                    key={relatedItem.id}
                    className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl"
                  >
                    {relatedItem.eyecatch && (
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image
                          src={relatedItem.eyecatch.url}
                          alt={relatedItem.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-all hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="mb-2 text-xs text-gray-500">
                        {new Date(relatedItem.publishedAt).toLocaleDateString(
                          "ja-JP",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </div>
                      <Link
                        href={`/news/${relatedItem.slug}`}
                        className="block"
                      >
                        <h3 className="mb-2 text-lg font-bold transition-colors hover:text-primary">
                          {relatedItem.title}
                        </h3>
                      </Link>
                      <Link
                        href={`/news/${relatedItem.slug}`}
                        className="text-sm font-medium hover:underline"
                      >
                        続きを読む →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 戻るボタン */}
          <div className="mt-12 text-center">
            <Link
              href="/news"
              className="inline-block rounded-full bg-primary px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-primary/80"
            >
              お知らせ一覧に戻る
            </Link>
          </div>
        </div>
      </div>

      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: news.title,
            image:
              news.eyecatch?.url || "https://www.suzu-osaka.com/og-image.jpg",
            datePublished: news.publishedAt,
            dateModified: news.updatedAt,
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
            description: news.content.substring(0, 160).replace(/<[^>]*>/g, ""),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.suzu-osaka.com/news/${news.slug}`,
            },
          }),
        }}
      />
    </div>
  );
}
