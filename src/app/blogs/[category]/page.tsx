import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllBlogCategories,
  getBlogsByCategory,
  type BlogCategory,
} from "@/libs/client";
import { CategoryPageClient } from "./CategoryPageClient";

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
    <CategoryPageClient
      currentCategory={currentCategory}
      categories={categories}
      blogs={blogs}
    />
  );
}