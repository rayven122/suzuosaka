import { Suspense } from "react";
// import Image from "next/image";
import { notFound } from "next/navigation";
import parse from "html-react-parser";
import Spinner from "@/app/_components/Spinner";
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

export default async function BlogDetail({ params }: Props) {
  const data: Blog | null = await getBlogData(params.id);
  if (data === null) return notFound();

  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <div className="mx-auto max-w-screen-xl p-5 pt-8 md:p-10 lg:p-14">
          <article className="prose w-full max-w-full">
            <h1 className="mb-4 text-3xl font-bold">{data.title}</h1>
            {data.category && (
              <div className="mb-6 text-gray-600">
                カテゴリ: {data.category.name}
              </div>
            )}
            {/* <Image
              src={data.eyecatch.url}
              width={data.eyecatch.width}
              height={data.eyecatch.height}
              alt={`${data.title}のアイキャッチ画像`}
              className="mb-8 rounded-lg"
            /> */}
            <div className="mt-8">{parse(data.content)}</div>
          </article>
        </div>
      </Suspense>
    </main>
  );
}
