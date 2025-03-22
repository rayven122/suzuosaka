import { Metadata } from "next";
import { client } from "@/libs/client";
import { News } from "@/types/news";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { LogoLink2 } from "@/app/_components/common/LogoLink2";

export const revalidate = 60;

async function getNewsDetail(id: string) {
  const data = await client.get<News>({
    endpoint: "news",
    contentId: id,
  });
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await getNewsDetail(params.id);

  // 記事の最初の100文字を抽出して説明文として使用（HTMLタグを除去）
  const description = data.content
    ? data.content.replace(/<[^>]*>/g, "").slice(0, 150) + "..."
    : `${data.title}の記事ページ`;

  // 公開日を適切なフォーマットに
  const publishDate = format(new Date(data.publishedAt), "yyyy-MM-dd");

  const url = `https://www.suzu-osaka.com/news/${params.id}`;

  return {
    title: `${data.title} | 川の家おさか`,
    description: description,
    keywords: [
      "川の家おさか",
      "釣り",
      "岐阜県",
      "下呂市",
      "小坂町",
      "渓流釣り",
    ],
    openGraph: {
      title: data.title,
      description: description,
      url: url,
      type: "article",
      publishedTime: data.publishedAt,
      images: [
        {
          url: data.eyecatch?.url || "/default-news-image.png",
          width: data.eyecatch?.width || 1200,
          height: data.eyecatch?.height || 630,
          alt: data.title,
        },
      ],
      locale: "ja_JP",
      siteName: "川の家おさか",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: description,
      images: [data.eyecatch?.url || "/default-news-image.png"],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function NewsDetail({
  params,
}: {
  params: { id: string };
}) {
  const data = await getNewsDetail(params.id);
  const publishDate = format(new Date(data.publishedAt), "yyyy年MM月dd日");

  // JSON-LDの構造化データを作成
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: data.title,
    datePublished: data.publishedAt,
    dateModified: data.updatedAt || data.publishedAt,
    image: data.eyecatch?.url || "/default-news-image.png",
    author: {
      "@type": "Organization",
      name: "川の家おさか",
    },
    publisher: {
      "@type": "Organization",
      name: "川の家おさか",
      logo: {
        "@type": "ImageObject",
        url: "https://www.suzu-osaka.com/common/logo-horizontal.svg",
      },
    },
    description: data.content?.replace(/<[^>]*>/g, "").slice(0, 150) + "...",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.suzu-osaka.com/news/${params.id}`,
    },
  };

  return (
    <main className="relative min-h-screen w-full bg-gradient-main">
      <LogoLink2 />
      {/* JSON-LDを追加 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-16">
        <article className="mx-auto max-w-4xl rounded-lg bg-white/80 p-8 shadow-lg">
          <div className="mb-6">
            <time dateTime={data.publishedAt} className="text-sm text-gray-600">
              {publishDate}
            </time>
            <h1 className="mt-2 text-3xl font-bold">{data.title}</h1>
          </div>

          {data.eyecatch && (
            <div className="mb-8">
              <Image
                src={data.eyecatch.url}
                alt={data.title}
                width={data.eyecatch.width}
                height={data.eyecatch.height}
                className="w-full rounded-lg object-cover"
                priority // 重要な画像をプリロード
              />
            </div>
          )}

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </article>
        <div className="mt-12">
          <Link
            href="/news"
            className="flex items-center gap-2 text-lg hover:underline"
          >
            <Image
              src="/common/arrow.svg"
              alt="一覧に戻る"
              width={24}
              height={24}
              className="rotate-180"
            />
            一覧に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
