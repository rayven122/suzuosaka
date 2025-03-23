import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllNews } from "@/libs/client";
import { LogoLink2 } from "../_components/common/LogoLink2";

export const metadata: Metadata = {
  title: "お知らせ | 川の家おさか - 鈴小坂の管理釣り場",
  description:
    "「川の家おさか」からのお知らせや最新情報をお届けします。イベント情報や営業案内など、重要なお知らせを確認いただけます。",
  alternates: {
    canonical: "https://www.suzu-osaka.com/news",
  },
};

export default async function NewsPage() {
  const newsItems = await getAllNews();

  return (
    <div className="min-h-screen bg-gradient-main px-4 py-16 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* ヘッダー */}
        <LogoLink2 />
        <div className="container mx-auto px-4 py-16">
          <h1 className="mb-4 text-center font-shippori-antique-b1 text-4xl font-bold md:text-5xl">
            お知らせ
          </h1>
          <p className="mx-auto max-w-2xl text-center text-lg text-gray-600">
            川の家おさかからのお知らせや最新情報をお届けします。
          </p>
        </div>

        {/* ニュース一覧 */}
        {newsItems.length > 0 ? (
          <div className="mx-auto max-w-4xl">
            {newsItems.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.slug}`}
                className="mb-6 block overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl"
              >
                <div className="flex flex-col md:flex-row">
                  {news.eyecatch && (
                    <div className="relative h-48 w-full md:h-auto md:w-1/3">
                      <Image
                        src={news.eyecatch.url}
                        alt={news.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-6">
                    <p className="mb-2 text-sm text-gray-500">
                      {new Date(news.publishedAt).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h2 className="mb-4 text-xl font-bold transition-colors hover:text-primary md:text-2xl">
                      {news.title}
                    </h2>
                    <div className="flex items-center justify-end">
                      <span className="text-sm font-medium">続きを読む →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm">
            <p className="text-lg font-medium">現在、お知らせはありません。</p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-white transition-all hover:bg-primary/80"
            >
              トップページに戻る
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
