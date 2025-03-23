// NewsClient.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type NewsItem = {
  id: string;
  title?: string;
  date?: string;
  description?: string;
  thumbnail?: string;
};

const NewsCard = ({ news }: { news: NewsItem }) => {
  // 日付文字列がある場合のみ日付を整形
  const formattedDate = news.date ? formatDate(news.date) : "";

  return (
    <Link href={`/news/${news.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className="group w-full cursor-pointer overflow-hidden border-b-2 border-black p-4 transition-all md:p-8"
      >
        <div className="items-center gap-4 text-sm md:flex md:text-xl">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 font-medium text-gray-600">
              <time className="font-bold">{formattedDate}</time>
            </div>
            <div className="h-4 w-4 rounded-full bg-primary" />
          </div>
          <div className="flex items-center justify-between gap-1">
            <h3 className="group-hover:text-primary">{news.title}</h3>
            <Image src="/common/arrow.svg" alt="arrow" width={30} height={24} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

// 日付文字列をフォーマットする関数
function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  } catch (e) {
    // 日付のパースに失敗した場合はそのまま返す
    return dateStr;
  }
}

export const NewsClient = ({ newsItems }: { newsItems: NewsItem[] }) => {
  return (
    <section className="relative h-[500px] w-full bg-gradient-main px-4 py-10 md:h-[800px] md:py-20">
      <div className="container mx-auto">
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-base font-semibold md:text-2xl">NEWS</p>
          <h2 className="mb-2 font-shippori-antique-b1 text-2xl font-medium md:text-5xl">
            お知らせ
          </h2>
        </motion.div>
        {/* News概要 */}
        <div className="absolute right-0 z-20 flex w-[95%] flex-col rounded-l-full border-2 border-r-0 border-black bg-white pb-8 pl-20 pr-4 pt-4 sm:w-[90%] md:w-[85%] lg:w-[80%] lg:pb-16 lg:pl-32 lg:pr-20 lg:pt-8">
          {newsItems.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-[10%] left-[50%] z-10 -translate-x-1/2 text-center"
        >
          <Link
            href="/news"
            className="inline-block rounded-full bg-white px-8 py-3 font-bold text-primary shadow-md transition-all hover:bg-primary hover:text-white"
          >
            VIEW MORE
          </Link>
        </motion.div>
      </div>
      {/* 装飾的な泡のSVG */}
      <Image
        src="/News/bubble.png"
        alt="装飾"
        width={1300}
        height={1300}
        className="absolute -bottom-10 right-0"
      />
    </section>
  );
};
