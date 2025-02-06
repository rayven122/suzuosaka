import Link from "next/link";
import { client } from "@/libs/client";
import type { News } from "@/types/news";
import { format } from "date-fns";

export const revalidate = 60;

async function getNews() {
  const response = await client.getList<News>({
    endpoint: "news",
    queries: { limit: 10, orders: "-publishedAt" },
  });
  return response;
}

export default async function News() {
  const { contents: newsList } = await getNews();

  return (
    <main className="relative min-h-screen w-full bg-gradient-main">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-12 text-3xl font-bold">お知らせ</h1>

        <div className="mx-auto max-w-4xl">
          {newsList.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className="group block border-b border-gray-200 py-6 transition-colors hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <time className="text-sm text-gray-600">
                    {format(new Date(news.publishedAt), "yyyy/MM/dd")}
                  </time>
                  <h2 className="mt-2 text-lg">{news.title}</h2>
                </div>
                <div className="text-2xl transition-transform group-hover:translate-x-2">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ページネーション */}
        <div className="mt-12 flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`h-8 w-8 rounded-full ${
                page === 1 ? "bg-blue-500 text-white" : "bg-white/50"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
