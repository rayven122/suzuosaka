import { createClient } from "microcms-js-sdk";

if (!process.env.MICROCMS_SERVICE_DOMAIN)
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
if (!process.env.MICROCMS_API_KEY)
  throw new Error("MICROCMS_API_KEY is required");

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ニュース記事の型定義
export type News = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  publishedAt: string;
};

// すべてのニュース記事を取得する関数
export const getAllNews = async (): Promise<News[]> => {
  const response = await client.getList<News>({
    endpoint: "news",
    queries: { limit: 100 }, // 必要に応じて調整してください
  });
  return response.contents;
};
