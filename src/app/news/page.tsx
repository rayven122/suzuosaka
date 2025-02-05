import Link from "next/link";

export default function News() {
  const dummyNews = Array(10)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      date: "2024/00/00",
      title: "ここにタイトルが入ります。この文章はダミーです。",
    }));

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-cyan-200 to-cyan-400">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-12 text-3xl font-bold">お知らせ</h1>

        <div className="mx-auto max-w-4xl">
          {dummyNews.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className="group block border-b border-gray-200 py-6 transition-colors hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <time className="text-sm text-gray-600">{news.date}</time>
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

      {/* 波のデザイン */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="h-24 w-full"
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,74L1360,74C1280,74,1120,74,960,74C800,74,640,74,480,74C320,74,160,74,80,74L0,74Z"
            fill="#0099ff"
          />
        </svg>
      </div>
    </main>
  );
}
