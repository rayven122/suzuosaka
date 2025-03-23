import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllBlogs, getBlogsByTag } from "@/libs/client";
import { LogoLink2 } from "@/app/_components/common/LogoLink2";
import { BlogHeader } from "@/app/_components/blog/BlogHeader";
import { BlogCard } from "@/app/_components/blog/BlogCard";
import { TagLink } from "@/app/_components/blog/TagLink";

type Props = {
  params: {
    tag: string;
  };
};

// 動的メタデータの生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag);

  return {
    title: `「${decodedTag}」のタグがついた記事 | 川の家おさかブログ`,
    description: `川の家おさかブログの「${decodedTag}」タグがついている記事一覧です。`,
    alternates: {
      canonical: `https://www.suzu-osaka.com/blogs/tags/${params.tag}`,
    },
  };
}

// 静的パラメータを生成
export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogs();

    // すべてのタグを収集
    const allTags = new Set<string>();
    blogs.forEach((blog) => {
      if (blog.tags) {
        blog.tags.split(",").forEach((tag) => {
          const trimmedTag = tag.trim();
          if (trimmedTag) {
            allTags.add(trimmedTag);
          }
        });
      }
    });

    console.log(`静的パラメータ生成: ${allTags.size}個のタグを検出しました`);

    return Array.from(allTags).map((tag) => ({
      tag: encodeURIComponent(tag),
    }));
  } catch (error) {
    console.error("タグの静的パラメータ生成中にエラーが発生しました:", error);
    return [];
  }
}

export default async function TagPage({ params }: Props) {
  try {
    const decodedTag = decodeURIComponent(params.tag);
    console.log(`タグページ表示: 「${decodedTag}」`);

    const blogs = await getBlogsByTag(decodedTag);

    if (blogs.length === 0) {
      console.log(`「${decodedTag}」のタグがついた記事が見つかりません`);
      notFound();
    }

    return (
      <div className="min-h-screen bg-gradient-main px-4 py-16 sm:px-6 lg:px-8">
        <LogoLink2 />
        <div className="container mx-auto">
          <BlogHeader
            title={`#${decodedTag}`}
            description={`「${decodedTag}」のタグがついた記事一覧です。`}
            backLink={{
              href: "/blogs/tags",
              text: "タグ一覧に戻る",
            }}
          />

          {/* 記事一覧 */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                showTags={true}
                activeTag={decodedTag}
              />
            ))}
          </div>

          {/* ブログトップに戻るボタン */}
          <div className="mt-12 text-center">
            <Link
              href="/blogs"
              className="rounded-full bg-primary px-6 py-3 text-white transition-all hover:bg-primary/80"
            >
              ブログトップに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`タグページの表示中にエラーが発生しました:`, error);
    notFound();
  }
}
