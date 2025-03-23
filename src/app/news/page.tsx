import { Metadata } from "next";
import Link from "next/link";
import { getAllNews } from "@/libs/client";
import { LogoLink2 } from "../_components/common/LogoLink2";
import { BlogHeader } from "../_components/blog/BlogHeader";
import { NewsCard } from "../_components/news/NewsCard";

export const metadata: Metadata = {
  title: "お知らせ | 川の家おさか - 下呂市小坂町の釣り場",
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
          <BlogHeader
            title="お知らせ"
            description="「川の家おさかから」のお知らせや最新情報をお届けします。"
          />
        </div>

        {/* ニュース一覧 */}
        {newsItems.length > 0 ? (
          <div className="mx-auto max-w-4xl">
            {newsItems.map((news) => (
              <NewsCard key={news.id} news={news} />
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
