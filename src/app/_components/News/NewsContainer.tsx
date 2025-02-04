// NewsContainer.tsx
import { client } from "@/libs/client";
import { NewsClient } from "./NewsClient";

async function getNews() {
  const data = await client.get({
    endpoint: "blogs",
    queries: {
      fields: "id,title,publishedAt,description",
      limit: 3,
      orders: "-publishedAt",
    },
  });

  return data.contents.map((content: any) => ({
    id: content.id,
    title: content.title,
    date: new Date(content.publishedAt).toLocaleDateString(),
    description: content.description || "",
  }));
}

export const NewsContainer = async () => {
  const newsItems = await getNews();
  return <NewsClient newsItems={newsItems} />;
};
