"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Blog, BlogCategory } from "@/libs/client";
import { LogoLink2 } from "@/app/_components/common/LogoLink2";
import { CategoryNavigation } from "@/app/_components/blog/CategoryNavigation";
import { CalendarIcon } from "lucide-react";

type AllBlogsPageClientProps = {
  blogs: Blog[];
  categories: BlogCategory[];
};

export function AllBlogsPageClient({ blogs, categories }: AllBlogsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // カテゴリーでフィルタリング
  const filteredBlogs = selectedCategory
    ? blogs.filter(blog => blog.category.slug === selectedCategory)
    : blogs;

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
          <Link
            href="/blogs"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
          >
            <span>←</span>
            <span>ブログトップに戻る</span>
          </Link>
          <p className="text-base font-semibold md:text-2xl">ALL POSTS</p>
          <h1 className="mb-4 font-shippori-antique-b1 text-3xl font-medium md:text-5xl">
            すべての記事
          </h1>
          <p className="max-w-2xl text-gray-700">
            川の家おさかのブログ記事をすべて一覧で表示しています。
            {blogs.length}件の記事があります。
          </p>
        </motion.div>

        {/* カテゴリーフィルター */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CategoryNavigation
            categories={categories}
            activeCategory={selectedCategory}
            className="mb-12"
            showAllCount={blogs.length}
            categoryCounts={categories.reduce((acc, cat) => {
              acc[cat.slug] = blogs.filter(b => b.category.slug === cat.slug).length;
              return acc;
            }, {} as Record<string, number>)}
            variant="filter"
            onCategoryClick={setSelectedCategory}
          />
        </motion.div>

        {/* 記事一覧 */}
        {filteredBlogs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredBlogs.map((blog, index) => (
              <BlogCard 
                key={blog.id} 
                blog={blog} 
                index={index}
                formatDate={formatDate}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[20px] border-2 border-black bg-white p-8 text-center shadow-lg"
          >
            <p className="mb-4 text-lg font-medium">
              該当する記事はありません。
            </p>
            <button
              onClick={() => setSelectedCategory(null)}
              className="rounded-full border-2 border-black bg-gradient-main px-6 py-2 font-medium transition-all hover:bg-primary hover:text-white"
            >
              すべての記事を表示
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

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
            <div className="absolute left-3 top-3 rounded-full bg-primary-dark px-3 py-1 text-xs font-bold text-white">
              {blog.category.name}
            </div>
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
                  {blog.tags.length > 3 && (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                      +{blog.tags.length - 3}
                    </span>
                  )}
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