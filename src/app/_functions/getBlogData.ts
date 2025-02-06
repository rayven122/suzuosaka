import { client } from "@/libs/client";
import { News } from "@/types/news";

export async function getNewsData(id: string): Promise<News | null> {
  try {
    return await client.get({
      endpoint: `news/${id}`,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
