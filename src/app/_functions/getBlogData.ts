import { client } from "@/libs/client";
import { Blog } from "@/types/blog-types";

export async function getBlogData(id: string): Promise<Blog | null> {
  try {
    return await client.get({
      endpoint: `blogs/${id}`,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
