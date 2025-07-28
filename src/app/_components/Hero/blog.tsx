"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Blog } from "@/libs/client";
import { CalendarIcon } from "lucide-react";

type BlogSectionProps = {
  blogs: Blog[];
};

export const BlogSection = ({ blogs }: BlogSectionProps) => {
  // スクロール用のref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // スクロールコントロール
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  // ブログが空の場合は何も表示しない
  if (blogs.length === 0) {
    return null;
  }

  // 日付フォーマット関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <section className="relative w-full overflow-hidden border-b-2 border-black bg-gradient-main py-8 md:py-16">
      <div className="container mx-auto px-4">
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-base font-semibold md:text-2xl">BLOG</p>
          <h2 className="mb-2 font-shippori-antique-b1 text-2xl font-medium md:text-5xl">
            ブログ
          </h2>
        </motion.div>

        {/* メインビジュアル */}
        <div className="relative z-10">
          {/* 最新の記事を大きく表示 */}
          {blogs.length > 0 && (
            <div className="mb-8 grid grid-cols-1 gap-4 md:mb-12 md:gap-8 md:grid-cols-12">
              {/* モバイル: 特大カードレイアウト */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="md:hidden"
              >
                <div className="relative">
                  {/* NEW! ラベル */}
                  <motion.div
                    initial={{ rotate: -5 }}
                    animate={{ rotate: [-5, -3, -5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -right-2 -top-3 z-20"
                  >
                    <div className="relative">
                      <div className="rounded-full border-2 border-black bg-yellow-400 px-4 py-2 font-bold shadow-lg">
                        <span className="text-base text-black">NEW! 🎉</span>
                      </div>
                      <div className="absolute inset-0 -z-10 rounded-full bg-black blur-sm opacity-30" />
                    </div>
                  </motion.div>

                  <Link
                    href={`/blogs/${blogs[0].category.slug}/${blogs[0].slug}`}
                  >
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="group relative overflow-hidden rounded-[25px] border-2 border-black bg-white shadow-xl"
                    >
                      {/* 画像部分 */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        {blogs[0].eyecatch ? (
                          <Image
                            src={blogs[0].eyecatch.url}
                            alt={blogs[0].title}
                            fill
                            className="object-cover transition-transform duration-500 group-active:scale-110"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-200">
                            <span className="text-gray-400">No Image</span>
                          </div>
                        )}
                        
                        {/* グラデーションオーバーレイ */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        
                        {/* カテゴリーバッジ */}
                        <div className="absolute left-4 top-4">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="rounded-full bg-primary-dark px-3 py-1 text-sm font-bold text-white shadow-lg backdrop-blur-sm"
                          >
                            {blogs[0].category.name}
                          </motion.div>
                        </div>

                        {/* タイトルオーバーレイ */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="mb-2 text-xl font-bold text-white drop-shadow-lg">
                            {blogs[0].title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-white/90">
                              <CalendarIcon className="mr-1 h-4 w-4" />
                              <span>{formatDate(blogs[0].publishedAt)}</span>
                            </div>
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-sm font-bold text-white backdrop-blur-sm"
                            >
                              <span>今すぐ読む</span>
                              <svg width="16" height="16" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                                />
                              </svg>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>

              {/* デスクトップ: 従来のレイアウト */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative hidden md:col-span-7 md:block"
              >
                {/* NEW! ラベル (PC版) */}
                <motion.div
                  initial={{ rotate: -5 }}
                  animate={{ rotate: [-5, -3, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -right-3 -top-4 z-20"
                >
                  <div className="relative">
                    <div className="rounded-full border-2 border-black bg-yellow-400 px-5 py-2.5 font-bold shadow-lg">
                      <span className="text-lg text-black">NEW! 🎉</span>
                    </div>
                    <div className="absolute inset-0 -z-10 rounded-full bg-black blur-sm opacity-30" />
                  </div>
                </motion.div>

                <Link
                  href={`/blogs/${blogs[0].category.slug}/${blogs[0].slug}`}
                >
                  <div className="group relative overflow-hidden rounded-[20px] border-2 border-black bg-white shadow-lg">
                    <div className="relative">
                      <div className="relative aspect-[16/9] w-full">
                        {blogs[0].eyecatch ? (
                          <Image
                            src={blogs[0].eyecatch.url}
                            alt={blogs[0].title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-200">
                            <span className="text-gray-400">No Image</span>
                          </div>
                        )}
                        <div className="absolute left-4 top-4 rounded-full bg-primary-dark px-3 py-1 text-sm text-white">
                          {blogs[0].category.name}
                        </div>
                      </div>

                      {/* デスクトップ: オーバーレイ表示 */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
                        <div className="mb-2 flex items-center text-sm font-bold text-white">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          <p>{formatDate(blogs[0].publishedAt)}</p>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-white">
                          {blogs[0].title}
                        </h3>
                        {blogs[0].description && (
                          <p className="line-clamp-2 text-white/80">
                            {blogs[0].description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              <div className="mt-4 flex flex-col justify-center md:col-span-5 md:mt-0">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center md:text-left"
                >
                  <h3 className="mb-3 font-shippori-antique-b1 text-lg md:mb-6 md:text-4xl">
                    川の風景と日々のできごと
                  </h3>
                  <p className="mb-3 hidden text-sm leading-relaxed md:mb-6 md:block md:text-base">
                    「川の家おさか」での日常をお届けします。季節の移り変わりや旬の魚たち、スタッフの日々の営みなど、小坂町の魅力を発信しています。
                  </p>
                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-sm font-bold text-black transition-colors hover:text-primary md:text-base"
                  >
                    <span>すべての記事を見る</span>
                    <span className="grid place-items-center rounded-full border-2 border-black bg-white p-1.5 transition-transform hover:translate-x-1 md:p-2">
                      <Image
                        src="/common/arrow.svg"
                        alt="矢印"
                        width={12}
                        height={12}
                        className="md:h-4 md:w-4"
                      />
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
          )}

          {/* スクロールコントロール */}
          <div className="mb-4 flex justify-end space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleScrollLeft}
              className="grid h-10 w-10 place-items-center rounded-full border-2 border-black bg-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
                />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleScrollRight}
              className="grid h-10 w-10 place-items-center rounded-full border-2 border-black bg-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                />
              </svg>
            </motion.button>
          </div>

          {/* 他の記事を横長カードでスクロール表示 */}
          <div
            ref={scrollContainerRef}
            className="hide-scrollbar -mx-4 flex overflow-x-auto px-4 pb-8"
          >
            {blogs.slice(1).map((blog, index) => (
              <CompactBlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* カスタムスタイル */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

const CompactBlogCard = ({ blog, index }: { blog: Blog; index: number }) => {
  // 日付フォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mr-4 flex-shrink-0 overflow-hidden rounded-[20px] border-2 border-black bg-white shadow-lg"
      style={{ width: "280px", maxWidth: "100%" }}
    >
      <Link href={`/blogs/${blog.category.slug}/${blog.slug}`}>
        <div className="group flex h-full flex-col">
          <div className="relative h-32">
            {blog.eyecatch ? (
              <Image
                src={blog.eyecatch.url}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
            <div className="absolute left-2 top-2 rounded-full bg-primary-dark px-2 py-1 text-xs text-white">
              {blog.category.name}
            </div>
          </div>

          <div className="flex flex-1 flex-col p-3">
            <div className="flex items-center text-xs text-gray-500">
              <CalendarIcon className="mr-1 h-3 w-3" />
              <p>{formatDate(blog.publishedAt)}</p>
            </div>
            <h3 className="mb-1 line-clamp-2 text-sm font-bold text-gray-800 transition-colors group-hover:text-primary-dark">
              {blog.title}
            </h3>

            <div className="mt-auto flex justify-end pt-2">
              <motion.span
                whileHover={{ x: 3 }}
                className="text-xs font-semibold text-primary-dark transition-colors hover:text-primary"
              >
                続きを読む →
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
