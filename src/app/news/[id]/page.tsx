import { Metadata } from "next";
import { client } from "@/libs/client";
import { News } from "@/types/news";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

async function getNewsDetail(id: string) {
  const data = await client.get<News>({
    endpoint: "news",
    contentId: id,
  });
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await getNewsDetail(params.id);
  return {
    title: data.title,
    description: `${data.title}の記事ページ`,
    openGraph: {
      images: data.eyecatch?.url || "/default-news-image.png",
    },
  };
}

export default async function NewsDetail({
  params,
}: {
  params: { id: string };
}) {
  const data = await getNewsDetail(params.id);

  return (
    <main className="relative min-h-screen w-full bg-gradient-main">
      <div className="container mx-auto px-4 py-16">
        <article className="mx-auto max-w-4xl rounded-lg bg-white/80 p-8 shadow-lg">
          <div className="mb-6">
            <time className="text-sm text-gray-600">
              {format(new Date(data.publishedAt), "yyyy年MM月dd日")}
            </time>
            <h1 className="mt-2 text-3xl font-bold">{data.title}</h1>
          </div>

          {data.eyecatch && (
            <div className="mb-8">
              <Image
                src={data.eyecatch.url}
                alt=""
                width={data.eyecatch.width}
                height={data.eyecatch.height}
                className="w-full rounded-lg object-cover"
              />
            </div>
          )}

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </article>
        <div className="mt-12">
          <Link
            href="/news"
            className="flex items-center gap-2 text-lg hover:underline"
          >
            <Image
              src="/common/arrow.svg"
              alt="一覧に戻る"
              width={24}
              height={24}
              className="rotate-180"
            />
            一覧に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
