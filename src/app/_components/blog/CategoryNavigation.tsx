"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BlogCategory } from "@/libs/client";
import { TagIcon } from "lucide-react";

type CategoryNavigationProps = {
  categories: BlogCategory[];
  activeCategory?: string;
  className?: string;
  showAllCount?: number; // "すべて"の記事数
  categoryCounts?: Record<string, number>; // 各カテゴリーの記事数
  variant?: "default" | "filter"; // スタイルバリエーション
  onCategoryClick?: (slug: string | null) => void; // フィルター用のクリックハンドラー
};

export const CategoryNavigation = ({
  categories,
  activeCategory,
  className = "",
  showAllCount,
  categoryCounts,
  variant = "default",
  onCategoryClick,
}: CategoryNavigationProps) => {
  const isFilter = variant === "filter";

  return (
    <div className={`rounded-[20px] border-2 border-black bg-white p-6 shadow-lg ${className}`}>
      <h2 className="mb-4 flex items-center gap-2 font-shippori-antique-b1 text-xl font-bold">
        {isFilter && (
          <span className="rounded-full bg-primary p-2 text-white">
            <TagIcon className="h-4 w-4" />
          </span>
        )}
        {isFilter ? "カテゴリーで絞り込む" : "カテゴリー"}
      </h2>
      <div className="flex flex-wrap gap-3">
        {/* すべての記事 */}
        {isFilter ? (
          <button
            onClick={() => onCategoryClick?.(null)}
            className={`group relative overflow-hidden rounded-full border-2 border-black px-4 py-2 text-sm font-medium transition-all hover:shadow-md ${
              activeCategory === undefined || activeCategory === "all" 
                ? "bg-primary-dark text-white" 
                : "bg-white hover:border-primary hover:text-primary"
            }`}
          >
            <span className="relative z-10">
              すべて{showAllCount !== undefined && ` (${showAllCount})`}
            </span>
          </button>
        ) : (
          <Link
            href="/blogs/all"
            className={`group relative overflow-hidden rounded-full border-2 border-black px-4 py-2 text-sm font-medium transition-all hover:shadow-md ${
              activeCategory === "all" 
                ? "bg-primary-dark text-white" 
                : "bg-gradient-main hover:border-primary hover:shadow-md"
            }`}
          >
            <span className="relative z-10">すべての記事</span>
            {activeCategory !== "all" && (
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
        )}

        {/* カテゴリー一覧 */}
        {categories.map((category) => {
          const count = categoryCounts?.[category.slug];
          const isActive = activeCategory === category.slug;

          if (isFilter) {
            return (
              <button
                key={category.id}
                onClick={() => onCategoryClick?.(category.slug)}
                className={`group relative overflow-hidden rounded-full border-2 border-black px-4 py-2 text-sm font-medium transition-all hover:shadow-md ${
                  isActive 
                    ? "bg-primary-dark text-white" 
                    : "bg-white hover:border-primary hover:text-primary"
                }`}
              >
                <span className="relative z-10">
                  {category.name}{count !== undefined && ` (${count})`}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={category.id}
              href={`/blogs/${category.slug}`}
              className={`group relative overflow-hidden rounded-full border-2 border-black px-4 py-2 text-sm font-medium transition-all hover:shadow-md ${
                isActive 
                  ? "bg-primary-dark text-white" 
                  : "bg-white"
              }`}
            >
              <span className={`relative z-10 ${!isActive && "transition-colors group-hover:text-white"}`}>
                {category.name}
              </span>
              {!isActive && (
                <motion.div
                  className="absolute inset-0 bg-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};