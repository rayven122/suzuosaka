import Image from "next/image";
import Link from "next/link";
import { News } from "@/libs/client";

type NewsCardProps = {
  news: News;
};

export const NewsCard = ({ news }: NewsCardProps) => {
  const formattedDate = new Date(news.publishedAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-6 overflow-hidden rounded-lg bg-white/90 shadow-md transition-all hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* 画像エリア - 固定サイズと比率でコンテナを設定 */}
        <div className="relative w-full md:w-1/3">
          <div className="relative aspect-[4/3] h-full w-full">
            {news.eyecatch ? (
              <Image
                src={news.eyecatch.url}
                alt={news.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                priority={false}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <span className="text-gray-400">画像なし</span>
              </div>
            )}
          </div>
        </div>

        {/* コンテンツエリア */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="mb-3 flex items-center">
              <span className="rounded border-l-4 border-primary bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                お知らせ
              </span>
              <time className="ml-3 text-sm text-gray-500">
                {formattedDate}
              </time>
            </div>
            <Link href={`/news/${news.slug}`} className="group">
              <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary">
                {news.title}
              </h3>
            </Link>
            <p className="line-clamp-2 text-gray-600">{news.description}</p>
          </div>

          <div className="mt-4 text-right">
            <Link
              href={`/news/${news.slug}`}
              className="inline-flex items-center text-sm font-medium  hover:underline"
            >
              続きを読む
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
