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
    <Link
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
          <p className="mb-2 text-sm text-gray-500">{formattedDate}</p>
          <h2 className="mb-4 text-xl font-bold transition-colors hover:text-primary md:text-2xl">
            {news.title}
          </h2>
          <div className="flex items-center justify-end">
            <span className="text-sm font-medium text-primary">
              続きを読む →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
