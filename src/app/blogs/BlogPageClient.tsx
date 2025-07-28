"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { Blog, BlogCategory } from "@/libs/client";
import { LogoLink2 } from "../_components/common/LogoLink2";
import { CategoryNavigation } from "../_components/blog/CategoryNavigation";
import { CalendarIcon } from "lucide-react";

type BlogPageClientProps = {
  categories: BlogCategory[];
  latestBlogs: Blog[];
  allBlogs: Blog[];
};

export function BlogPageClient({ categories, latestBlogs, allBlogs }: BlogPageClientProps) {
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

  // 日付フォーマット関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

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
          <p className="text-base font-semibold md:text-2xl">BLOG</p>
          <h1 className="mb-4 font-shippori-antique-b1 text-3xl font-medium md:text-5xl">
            ブログ
          </h1>
          <p className="max-w-2xl text-gray-700">
            下呂市小坂町の釣り場「川の家おさか」の釣り情報、初心者向けガイド、釣った魚のレシピなど様々な情報を発信しています。
          </p>
        </motion.div>

        {/* カテゴリーナビゲーション */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CategoryNavigation 
            categories={categories} 
            className="mb-12"
          />
        </motion.div>

        {/* 最新記事（大きく表示） */}
        {latestBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="mb-6 font-shippori-antique-b1 text-2xl font-bold md:text-3xl">
              最新記事
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <FeaturedBlogCard blog={latestBlogs[0]} formatDate={formatDate} />
              </div>
              <div className="flex flex-col justify-center md:col-span-5">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="mb-4 font-shippori-antique-b1 text-xl md:text-2xl">
                    {allBlogs.length}件の記事から
                    <br />
                    お気に入りを見つけよう
                  </h3>
                  <p className="mb-6 text-gray-700">
                    釣りのコツや季節の情報、地元の魅力など、川の家おさかならではの情報をお届けしています。
                  </p>
                  <Link
                    href="/blogs/tags"
                    className="group inline-flex items-center gap-2 font-bold text-black transition-colors hover:text-primary"
                  >
                    <span>タグから探す</span>
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
              </div>
            </div>
          </motion.div>
        )}

        {/* その他の記事 */}
        {latestBlogs.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-shippori-antique-b1 text-2xl font-bold md:text-3xl">
                記事一覧
              </h2>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleScrollLeft}
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-black bg-white shadow-md"
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
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-black bg-white shadow-md"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="hide-scrollbar -mx-4 flex overflow-x-auto px-4 pb-8"
            >
              {latestBlogs.slice(1).map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} formatDate={formatDate} />
              ))}
            </div>
          </motion.div>
        )}

        {/* すべての記事を見るボタン */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blogs/all"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-black bg-primary px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl"
          >
            <span>すべての記事を見る</span>
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
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
}

// 特集記事カード
const FeaturedBlogCard = ({ blog, formatDate }: { blog: Blog; formatDate: (date: string) => string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/blogs/${blog.category.slug}/${blog.slug}`}>
        <div className="group relative overflow-hidden rounded-[20px] border-2 border-black bg-white shadow-lg">
          <div className="relative aspect-[16/9] w-full">
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
            <div className="absolute left-4 top-4 rounded-full bg-primary-dark px-3 py-1 text-sm font-bold text-white">
              {blog.category.name}
            </div>
          </div>

          <div className="p-6">
            <div className="mb-2 flex items-center text-sm text-gray-600">
              <CalendarIcon className="mr-1 h-4 w-4" />
              <p>{formatDate(blog.publishedAt)}</p>
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-800 transition-colors group-hover:text-primary">
              {blog.title}
            </h3>
            {blog.description && (
              <p className="mb-4 line-clamp-2 text-gray-600">
                {blog.description}
              </p>
            )}
            <div className="flex items-center justify-between">
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}
              <motion.span
                className="text-sm font-semibold text-primary-dark"
                whileHover={{ x: 3 }}
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

// ブログカード
const BlogCard = ({ 
  blog, 
  index, 
  formatDate 
}: { 
  blog: Blog; 
  index: number; 
  formatDate: (date: string) => string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mr-4 flex-shrink-0 overflow-hidden rounded-[20px] border-2 border-black bg-white shadow-lg"
      style={{ width: "320px", maxWidth: "100%" }}
    >
      <Link href={`/blogs/${blog.category.slug}/${blog.slug}`}>
        <div className="group flex h-full flex-col">
          <div className="relative h-48">
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
            <div className="absolute left-3 top-3 rounded-full bg-primary-dark px-3 py-1 text-xs font-bold text-white">
              {blog.category.name}
            </div>
          </div>

          <div className="flex flex-1 flex-col p-4">
            <div className="mb-2 flex items-center text-xs text-gray-500">
              <CalendarIcon className="mr-1 h-3 w-3" />
              <p>{formatDate(blog.publishedAt)}</p>
            </div>
            <h3 className="mb-2 line-clamp-2 text-base font-bold text-gray-800 transition-colors group-hover:text-primary">
              {blog.title}
            </h3>
            {blog.description && (
              <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                {blog.description}
              </p>
            )}

            <div className="mt-auto flex items-center justify-between">
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex gap-1">
                  {blog.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}
              <motion.span
                whileHover={{ x: 3 }}
                className="text-xs font-semibold text-primary-dark"
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