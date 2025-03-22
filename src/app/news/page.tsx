import Link from "next/link";
import { format } from "date-fns";
import { LogoLink2 } from "../_components/common/LogoLink2";
import { getAllNews, type News } from "@/libs/client";
import NewsPagination from "../_components/NewsPagination";

// サーバーサイドでの動的レンダリングを有効化
export const dynamic = "force-dynamic";

export default async function NewsPage() {
  // 既存のclientファイルに定義されている関数を使用
  const newsList: News[] = await getAllNews();

  // 更新日の新しい順にソート
  newsList.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  // ページ表示用のニュース記事（最初の10件）
  const initialNewsList: News[] = newsList.slice(0, 10);
  const totalCount: number = newsList.length;

  return (
    <main className="relative min-h-screen w-full bg-gradient-main">
      <LogoLink2 />
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          お知らせ
        </h1>

        {/* ニュース一覧 */}
        <div className="mx-auto max-w-4xl rounded-xl bg-white/50 backdrop-blur-sm">
          {initialNewsList.map((news: News) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className="group block border-b border-white/20 px-6 py-5 transition-all hover:bg-white/20"
            >
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <div className="inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white">
                    {format(new Date(news.publishedAt), "yyyy/MM/dd")}
                  </div>
                  <h2 className="mt-2 text-lg font-medium text-black sm:text-xl">
                    {news.title}
                  </h2>
                </div>
                <div className="mt-2 hidden rounded-full bg-white/20 p-2 text-xl text-white transition-all group-hover:bg-primary group-hover:text-white sm:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ページネーション */}
        {totalCount > 10 && (
          <NewsPagination
            totalItems={totalCount}
            itemsPerPage={10}
            allNews={newsList}
          />
        )}
      </div>
    </main>
  );
}
