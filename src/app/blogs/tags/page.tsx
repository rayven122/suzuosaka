import { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/libs/client";
import { LogoLink2 } from "@/app/_components/common/LogoLink2";
import { BlogHeader } from "@/app/_components/blog/BlogHeader";
import { TagLink } from "@/app/_components/blog/TagLink";

export const metadata: Metadata = {
  title: "タグ一覧 | 川の家おさかブログ",
  description:
    "川の家おさかブログのすべてのタグ一覧です。釣り情報、初心者ガイド、レシピなど様々な情報を掲載。",
  alternates: {
    canonical: "https://www.suzu-osaka.com/blogs/tags",
  },
};

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="min-h-screen bg-gradient-main px-4 py-8 sm:px-6 lg:px-8">
      <LogoLink2 />
      <div className="container mx-auto">
        <BlogHeader
          title="タグ一覧"
          description="川の家おさかブログのすべてのタグ一覧です。興味のあるタグをクリックして関連記事を探してください。"
          backLink={{
            href: "/blogs",
            text: "ブログトップに戻る",
          }}
        />

        {/* タグ一覧 */}
        {tags.length > 0 ? (
          <div className="mx-auto max-w-4xl rounded-lg bg-white/80 p-8 shadow-lg backdrop-blur-sm">
            <div className="flex flex-wrap gap-4">
              {tags.map((tag) => (
                <TagLink key={tag.name} tag={tag.name} count={tag.count} />
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm">
            <p className="text-lg font-medium">
              現在、ブログにタグはありません。
            </p>
            <Link
              href="/blogs"
              className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-white transition-all hover:bg-primary/80"
            >
              ブログトップに戻る
            </Link>
          </div>
        )}

        {/* 人気のタグ (もしあれば) */}
        {tags.length > 5 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">人気のタグ</h2>
            <div className="flex flex-wrap gap-4">
              {tags.slice(0, 5).map((tag) => (
                <TagLink
                  key={tag.name}
                  tag={tag.name}
                  count={tag.count}
                  isPopular={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
