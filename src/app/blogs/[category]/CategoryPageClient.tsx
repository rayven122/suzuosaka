"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Blog, BlogCategory } from "@/libs/client";
import { LogoLink2 } from "@/app/_components/common/LogoLink2";
import { CategoryNavigation } from "@/app/_components/blog/CategoryNavigation";
import { CalendarIcon, TagIcon, FishIcon, UsersIcon, BookOpenIcon, UtensilsIcon } from "lucide-react";

type CategoryPageClientProps = {
  currentCategory: BlogCategory;
  categories: BlogCategory[];
  blogs: Blog[];
};

// カテゴリー別の情報
const categoryInfo: Record<string, {
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
}> = {
  "fishing-info": {
    icon: <FishIcon className="h-6 w-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    description: "釣り場の状況、おすすめの釣り方、季節ごとの魚の情報など、釣りに関する最新情報をお届けします。",
  },
  "family-guide": {
    icon: <UsersIcon className="h-6 w-6" />,
    color: "text-green-600",
    bgColor: "bg-green-100",
    description: "ファミリーで楽しむための釣りガイド。お子様連れでも安心して楽しめるコツや注意点をご紹介。",
  },
  "beginner-tips": {
    icon: <BookOpenIcon className="h-6 w-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    description: "釣り初心者の方向けの基本的な知識やテクニック。道具の選び方から釣り方まで丁寧に解説します。",
  },
  "recipe": {
    icon: <UtensilsIcon className="h-6 w-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    description: "釣った魚を美味しく食べるためのレシピ集。地元の伝統料理から創作料理まで幅広くご紹介。",
  },
};

export function CategoryPageClient({ currentCategory, categories, blogs }: CategoryPageClientProps) {
  const categoryData = categoryInfo[currentCategory.slug] || {
    icon: <TagIcon className="h-6 w-6" />,
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: `${currentCategory.name}に関する記事一覧です。`,
  };

  // 日付フォーマット関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  // 最新記事と人気記事（仮）を分ける
  const latestBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

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
          <Link
            href="/blogs"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
          >
            <span>←</span>
            <span>ブログトップに戻る</span>
          </Link>
          
          {/* カテゴリーアイコンとタイトル */}
          <div className="mb-6 flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className={`rounded-full p-4 ${categoryData.bgColor}`}
            >
              <span className={categoryData.color}>{categoryData.icon}</span>
            </motion.div>
            <div>
              <p className="text-base font-semibold md:text-2xl">CATEGORY</p>
              <h1 className="font-shippori-antique-b1 text-3xl font-medium md:text-5xl">
                {currentCategory.name}
              </h1>
            </div>
          </div>
          
          <p className="max-w-2xl text-gray-700">
            {categoryData.description}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {blogs.length}件の記事があります
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
            activeCategory={currentCategory.slug}
            className="mb-12"
          />
        </motion.div>

        {/* 記事一覧 */}
        {blogs.length > 0 ? (
          <>
            {/* 最新記事を大きく表示 */}
            {latestBlog && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="mb-6 font-shippori-antique-b1 text-2xl font-bold">
                  最新記事
                </h2>
                <FeaturedBlogCard blog={latestBlog} formatDate={formatDate} categoryData={categoryData} />
              </motion.div>
            )}

            {/* その他の記事 */}
            {otherBlogs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="mb-6 font-shippori-antique-b1 text-2xl font-bold">
                  その他の記事
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {otherBlogs.map((blog, index) => (
                    <BlogCard 
                      key={blog.id} 
                      blog={blog} 
                      index={index}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[20px] border-2 border-black bg-white p-8 text-center shadow-lg"
          >
            <div className={`mx-auto mb-4 rounded-full p-4 ${categoryData.bgColor} inline-block`}>
              <span className={categoryData.color}>{categoryData.icon}</span>
            </div>
            <p className="mb-4 text-lg font-medium">
              このカテゴリにはまだ記事がありません。
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

// 特集記事カード
const FeaturedBlogCard = ({ 
  blog, 
  formatDate,
  categoryData 
}: { 
  blog: Blog; 
  formatDate: (date: string) => string;
  categoryData: any;
}) => {
  return (
    <Link href={`/blogs/${blog.category.slug}/${blog.slug}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="group grid grid-cols-1 gap-6 overflow-hidden rounded-[20px] border-2 border-black bg-white shadow-lg md:grid-cols-2"
      >
        <div className="relative h-64 md:h-auto">
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
        </div>

        <div className="flex flex-col justify-center p-6">
          <div className="mb-3 flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-sm font-bold ${categoryData.bgColor} ${categoryData.color}`}>
              {blog.category.name}
            </span>
            <div className="flex items-center text-sm text-gray-600">
              <CalendarIcon className="mr-1 h-4 w-4" />
              <p>{formatDate(blog.publishedAt)}</p>
            </div>
          </div>
          
          <h3 className="mb-3 text-2xl font-bold text-gray-800 transition-colors group-hover:text-primary">
            {blog.title}
          </h3>
          
          {blog.description && (
            <p className="mb-4 line-clamp-3 text-gray-600">
              {blog.description}
            </p>
          )}
          
          {blog.tags && blog.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1">
              {blog.tags.map((tag) => (
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
            className="inline-flex items-center text-sm font-semibold text-primary-dark"
            whileHover={{ x: 3 }}
          >
            続きを読む →
          </motion.span>
        </div>
      </motion.div>
    </Link>
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
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link href={`/blogs/${blog.category.slug}/${blog.slug}`}>
        <div className="group flex h-full flex-col overflow-hidden rounded-[20px] border-2 border-black bg-white shadow-lg transition-all hover:shadow-xl">
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
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="mb-2 flex items-center text-xs text-gray-500">
              <CalendarIcon className="mr-1 h-3 w-3" />
              <p>{formatDate(blog.publishedAt)}</p>
            </div>
            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800 transition-colors group-hover:text-primary">
              {blog.title}
            </h3>
            {blog.description && (
              <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                {blog.description}
              </p>
            )}

            <div className="mt-auto">
              {blog.tags && blog.tags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1">
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
              <div className="flex items-center justify-end">
                <motion.span
                  whileHover={{ x: 3 }}
                  className="text-sm font-semibold text-primary-dark"
                >
                  続きを読む →
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};