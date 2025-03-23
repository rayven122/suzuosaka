import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllBlogCategories,
  getBlogsByCategory,
  type BlogCategory,
} from "@/libs/client";
import { BlogHeader } from "@/app/_components/blog/BlogHeader";
import { CategoryNavigation } from "@/app/_components/blog/CategoryNavigation";
import { BlogCard } from "@/app/_components/blog/BlogCard";
import { LogoLink2 } from "@/app/_components/common/LogoLink2";

type Props = {
  params: {
    category: string;
  };
};

// 動的メタデータの生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = await getAllBlogCategories();
  const category = categories.find((cat) => cat.slug === params.category);

  if (!category) {
    return {
      title: "カテゴリが見つかりません | 川の家おさかブログ",
      description: "指定されたカテゴリは存在しません。",
    };
  }

  return {
    title: `${category.name} | 川の家おさかブログ`,
    description: `川の家おさかブログの${category.name}カテゴリの記事一覧です。`,
    alternates: {
      canonical: `https://www.suzu-osaka.com/blogs/${category.slug}`,
    },
  };
}

// 静的パラメータを生成
export async function generateStaticParams() {
  const categories = await getAllBlogCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const categories = await getAllBlogCategories();
  const currentCategory = categories.find(
    (cat) => cat.slug === params.category,
  );

  if (!currentCategory) {
    notFound();
  }

  const blogs = await getBlogsByCategory(currentCategory.id);

  return (
    <div className="min-h-screen bg-gradient-main px-4 py-8 sm:px-6 lg:px-8">
      <LogoLink2 />
      <div className="container mx-auto">
        <BlogHeader
          title={currentCategory.name}
          description={`川の家おさかブログの「${currentCategory.name}」カテゴリの記事一覧です。`}
          backLink={{
            href: "/blogs",
            text: "ブログトップに戻る",
          }}
        />

        <CategoryNavigation
          categories={categories}
          activeCategory={currentCategory.slug}
          className="mb-12"
        />

        {/* 記事一覧 */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm">
            <p className="text-lg font-medium">
              このカテゴリにはまだ記事がありません。
            </p>
            <Link
              href="/blogs"
              className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-white transition-all hover:bg-primary/80"
            >
              ブログトップに戻る
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
