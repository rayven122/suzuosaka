import { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/libs/client";

import { LogoLink2 } from "@/app/_components/common/LogoLink2";

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
        {/* ヘッダー */}
        <div className="mb-12 text-center">
          <Link
            href="/blogs"
            className="mb-4 inline-block text-sm font-medium hover:underline"
          >
            ← ブログトップに戻る
          </Link>
          <h1 className="mb-4 font-shippori-antique-b1 text-4xl font-bold md:text-5xl">
            タグ一覧
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            川の家おさかブログのすべてのタグ一覧です。興味のあるタグをクリックして関連記事を探してください。
          </p>
        </div>

        {/* タグ一覧 */}
        {tags.length > 0 ? (
          <div className="mx-auto max-w-4xl rounded-lg bg-white/80 p-8 shadow-lg backdrop-blur-sm">
            <div className="flex flex-wrap gap-4">
              {tags.map((tag) => (
                <Link
                  key={tag.name}
                  href={`/blogs/tags/${encodeURIComponent(tag.name)}`}
                  className="group flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-gray-700 transition-all hover:bg-primary hover:text-white"
                >
                  <span className="font-medium">#{tag.name}</span>
                  <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700 group-hover:bg-white group-hover:text-primary">
                    {tag.count}
                  </span>
                </Link>
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
                <Link
                  key={tag.name}
                  href={`/blogs/tags/${encodeURIComponent(tag.name)}`}
                  className="group flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700 transition-all hover:bg-primary hover:text-white"
                >
                  <span className="font-medium">#{tag.name}</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs text-gray-800 group-hover:bg-white group-hover:text-primary">
                    {tag.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
