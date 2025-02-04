import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./_components/common/Button";
import Spinner from "./_components/Spinner";
import { client } from "@/libs/client";
import { Blog } from "@/types/blog-types";

import { InstaRing } from "./_components/common/InstaRing";
import News from "./_components/News";
import Fishing from "./_components/Fishing";
import Eatery from "./_components/Eatery";
import Access from "./_components/Access";
import CTA from "./_components/CTA";
import { Hero } from "./_components/Hero";
import { BrandStory } from "./_components/BrandStory";

export default async function Home() {
  try {
    const data = await client.get({
      endpoint: "blogs",
      queries: { fields: "id,title,content,eyecatch,category" },
    });

    return (
      <main>
        <InstaRing />
        <Hero />
        <BrandStory />
        <News />
        <Fishing />
        <Eatery />
        <Access />
        <CTA />
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 px-5 md:mt-20 md:grid-cols-2 md:gap-y-20 md:px-10 xl:grid-cols-3 xl:gap-x-16 xl:px-20">
          <Suspense fallback={<Spinner />}>
            {data.contents.map((blog: Blog) => {
              return (
                <div key={blog.id} className="grid gap-y-3">
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="group relative block h-[58vw] overflow-hidden rounded-md focus:outline-none focus-visible:ring md:h-[28vw] xl:h-[18vw]"
                  >
                    <Image
                      src={blog.eyecatch.url}
                      width={blog.eyecatch.width}
                      height={blog.eyecatch.height}
                      alt={`「${blog.title}」のアイキャッチ画像`}
                      className="absolute left-2/4 top-2/4 w-full -translate-x-2/4 -translate-y-2/4 transition duration-200 ease-in-out group-hover:scale-110 group-hover:bg-gray-100"
                    />
                  </Link>
                  <h2 className="mt-5 text-2xl font-bold text-gray-800 lg:mt-2">
                    {blog.title}
                  </h2>
                  <p className="line-clamp-3 text-gray-800">
                    {blog.content.replace(/<[^>]*>/g, "")}
                  </p>
                  <div className="mt-2 grid h-11 grid-cols-2 gap-5 lg:mt-0">
                    {blog.category && (
                      <div className="flex items-center text-gray-600">
                        <span>カテゴリ: {blog.category.name}</span>
                      </div>
                    )}
                    <Button link={`/blogs/${blog.id}`} color="gray">
                      詳細を見る
                    </Button>
                  </div>
                </div>
              );
            })}
          </Suspense>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">エラーが発生しました。</h1>
      </div>
    );
  }
}
