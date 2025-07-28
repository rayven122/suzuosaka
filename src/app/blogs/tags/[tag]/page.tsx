import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllTags, getBlogsByTagSlug } from "@/libs/client";
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
  const tagSlug = params.tag;
  const tags = await getAllTags();
  const tag = tags.find(t => t.slug === tagSlug);
  
  if (!tag) {
    return {
      title: "タグが見つかりません | 川の家おさかブログ",
    };
  }

  return {
    title: `「${tag.name}」のタグがついた記事 | 川の家おさかブログ`,
    description: tag.description || `川の家おさかブログの「${tag.name}」タグがついている記事一覧です。`,
    alternates: {
      canonical: `https://www.suzu-osaka.com/blogs/tags/${tag.slug}`,
    },
  };
}

// 静的パラメータを生成
export async function generateStaticParams() {
  try {
    const tags = await getAllTags();

    console.log(`静的パラメータ生成: ${tags.length}個のタグを検出しました`);

    return tags.map((tag) => ({
      tag: tag.slug,
    }));
  } catch (error) {
    console.error("タグの静的パラメータ生成中にエラーが発生しました:", error);
    return [];
  }
}

export default async function TagPage({ params }: Props) {
  try {
    const tagSlug = params.tag;
    console.log(`タグページ表示: スラッグ「${tagSlug}」`);

    const tags = await getAllTags();
    const tag = tags.find(t => t.slug === tagSlug);
    
    if (!tag) {
      console.log(`スラッグ「${tagSlug}」のタグが見つかりません`);
      notFound();
    }

    const blogs = await getBlogsByTagSlug(tagSlug);

    if (blogs.length === 0) {
      console.log(`「${tag.name}」のタグがついた記事が見つかりません`);
      notFound();
    }

    return (
      <div className="min-h-screen bg-gradient-main px-4 py-16 sm:px-6 lg:px-8">
        <LogoLink2 />
        <div className="container mx-auto">
          <BlogHeader
            title={`#${tag.name}`}
            description={tag.description || `「${tag.name}」のタグがついた記事一覧です。`}
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
                activeTag={tagSlug}
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
