import Link from "next/link";
import { BlogCategory } from "@/libs/client";

type CategoryNavigationProps = {
  categories: BlogCategory[];
  activeCategory?: string;
  className?: string;
};

export const CategoryNavigation = ({
  categories,
  activeCategory,
  className = "",
}: CategoryNavigationProps) => {
  return (
    <div
      className={`rounded-xl border border-gray-100 bg-white/90 p-6 shadow-md backdrop-blur-md transition-all hover:shadow-lg ${className}`}
    >
      <h2 className="mb-6 font-sans text-xl font-semibold text-gray-800">
        カテゴリ
      </h2>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/blogs/all"
          className={`group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
            !activeCategory
              ? "bg-primary text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <span className="relative">
            すべて
            {!activeCategory && (
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
            )}
          </span>
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/blogs/${category.slug}`}
            className={`group flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              activeCategory === category.slug
                ? "bg-primary text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="relative">
              {category.name}
              {activeCategory === category.slug && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              )}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
