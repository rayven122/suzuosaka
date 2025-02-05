import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getBlogData } from "@/app/_functions/getBlogData";
import { Blog } from "@/types/blog-types";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const data: Blog | null = await getBlogData(params.id);
  if (data === null) return notFound();
  return {
    title: `${data.title} | ブログ`,
    description: `${data.title}の記事ページ`,
    // openGraph: {
    //   images: data.eyecatch.url,
    // },
  };
}

export default function NewsDetail({ params }: { params: { id: string } }) {
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-cyan-200 to-cyan-400">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <time className="text-sm text-gray-600">2024/00/00</time>
            <h1 className="mt-2 text-2xl font-bold">
              ここに見出しが入ります。
            </h1>
          </div>

          {/* サムネイル画像 */}
          <div className="relative mb-8 h-96 w-full">
            <Image
              src="/images/news-thumbnail.jpg"
              alt="ニュースサムネイル"
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* 記事本文 */}
          <div className="prose max-w-none">
            <p className="mb-4 text-lg">
              文章はダミーです。文字の大きさや文字間の目安を示したものなので、内容は意味ありません。ここまでです。文章はダミーです。文字の大きさや文字間の目安を示したものなので、内容は意味ありません。ここまでです。
            </p>
            <p className="mb-4 text-lg">
              文章はダミーです。文字の大きさや文字間の目安を示したものなので、内容は意味ありません。ここまでです。文章はダミーです。文字の大きさや文字間の目安を示したものなので、内容は意味ありません。ここまでです。文章はダミーです。文字の大きさや文字間の目安を示したものなので、内容は意味ありません。ここまでです。
            </p>
          </div>

          {/* 戻るボタン */}
          <div className="mt-12">
            <Link
              href="/news"
              className="inline-flex items-center text-lg hover:underline"
            >
              <span className="mr-2">←</span>
              一覧に戻る
            </Link>
          </div>
        </div>
      </div>

      {/* 波のデザイン */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="h-24 w-full"
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,74L1360,74C1280,74,1120,74,960,74C800,74,640,74,480,74C320,74,160,74,80,74L0,74Z"
            fill="#0099ff"
          />
        </svg>
      </div>
    </main>
  );
}
