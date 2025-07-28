"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LogoLink2 } from "@/app/_components/common/LogoLink2";
import { TagIcon } from "lucide-react";

type TagWithCount = {
  tag: {
    id: string;
    name: string;
    slug: string;
  };
  count: number;
};

type TagsPageClientProps = {
  initialTags: TagWithCount[];
};

export function TagsPageClient({ initialTags }: TagsPageClientProps) {
  const tagsWithCount = initialTags;

  return (
    <section className="min-h-screen bg-gradient-main px-4 py-8 sm:px-6 lg:px-8">
      <LogoLink2 />
      <div className="container mx-auto">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <p className="text-base font-semibold md:text-2xl">TAGS</p>
          <h1 className="mb-4 font-shippori-antique-b1 text-3xl font-medium md:text-5xl">
            タグ一覧
          </h1>
          <p className="max-w-2xl text-gray-700">
            川の家おさかブログのすべてのタグ一覧です。興味のあるタグをクリックして関連記事を探してください。
          </p>
        </motion.div>

        {/* タグ一覧 */}
        {tagsWithCount.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* 人気のタグ */}
            {tagsWithCount.length > 5 && (
              <div className="mb-12">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6 flex items-center gap-2 font-shippori-antique-b1 text-2xl font-bold md:text-3xl"
                >
                  <span className="rounded-full bg-primary p-2 text-white">
                    <TagIcon className="h-5 w-5" />
                  </span>
                  人気のタグ
                </motion.h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tagsWithCount.slice(0, 6).map((item, index) => (
                    <TagCard
                      key={item.tag.id}
                      item={item}
                      index={index}
                      isPopular={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* すべてのタグ */}
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6 font-shippori-antique-b1 text-2xl font-bold md:text-3xl"
            >
              すべてのタグ
            </motion.h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {tagsWithCount.map((item, index) => (
                <TagCard key={item.tag.id} item={item} index={index} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[20px] border-2 border-black bg-white p-8 text-center shadow-lg"
          >
            <p className="mb-4 text-lg font-medium">
              現在、ブログにタグはありません。
            </p>
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-2 font-bold text-black transition-colors hover:text-primary"
            >
              <span>ブログトップに戻る</span>
              <span className="grid place-items-center rounded-full border-2 border-black bg-white p-2 transition-transform group-hover:translate-x-1">
                <Image
                  src="/common/arrow.svg"
                  alt="矢印"
                  width={16}
                  height={16}
                />
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// タグカードコンポーネント
const TagCard = ({
  item,
  index,
  isPopular = false,
}: {
  item: TagWithCount;
  index: number;
  isPopular?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/blogs/tags/${item.tag.slug}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`group relative overflow-hidden rounded-[20px] border-2 border-black bg-white p-4 shadow-lg transition-all hover:shadow-xl ${
            isPopular ? "md:p-6" : ""
          }`}
        >
          {/* 背景のアクセント */}
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/10 transition-transform group-hover:scale-150" />
          
          {/* コンテンツ */}
          <div className="relative z-10">
            <div className="mb-2 flex items-start justify-between">
              <h3 className={`font-bold text-gray-800 transition-colors group-hover:text-primary ${
                isPopular ? "text-lg md:text-xl" : "text-base"
              }`}>
                {item.tag.name}
              </h3>
              {isPopular && (
                <span className="rounded-full bg-yellow-400 px-2 py-1 text-xs font-bold text-yellow-900">
                  人気
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {item.count}件の記事
            </p>
          </div>

          {/* ホバー時の矢印 */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute bottom-4 right-4 text-primary opacity-0 transition-opacity group-hover:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
              />
            </svg>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};