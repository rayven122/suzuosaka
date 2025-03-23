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
  slug: string;
  eyecatch?: {
    url: string;
    width: number;
    height: number;
  };
  updatedAt: string;
  publishedAt: string;
};

// すべてのニュース記事を取得する関数
export const getAllNews = async (): Promise<News[]> => {
  try {
    const response = await client.getList<News>({
      endpoint: "news",
      queries: { limit: 100 }, // 必要に応じて調整してください
    });

    console.log("ニュース取得結果:", response.contents[0]);

    // slugがない場合にidをslugとして使用
    const processedNews = response.contents.map((news) => {
      if (!news.slug) {
        console.log(
          `News ID: ${news.id} にslugがありません。IDをslugとして使用します。`,
        );
        return {
          ...news,
          slug: news.id,
        };
      }
      return news;
    });

    return processedNews;
  } catch (error) {
    console.error("ニュース取得エラー:", error);
    return [];
  }
};

// 特定のIDのニュース記事を取得する関数
export const getNewsById = async (id: string): Promise<News | null> => {
  try {
    const news = await client.get<News>({
      endpoint: "news",
      contentId: id,
    });

    // slugがない場合にidをslugとして使用
    if (!news.slug) {
      console.log(
        `News ID: ${news.id} にslugがありません。IDをslugとして使用します。`,
      );
      return {
        ...news,
        slug: news.id,
      };
    }

    return news;
  } catch (error) {
    console.error("Error fetching news by ID:", error);
    return null;
  }
};

// 特定のスラッグからニュース記事を取得する関数
export const getNewsBySlug = async (slug: string): Promise<News | null> => {
  try {
    // まずはスラッグで検索
    const response = await client.getList<News>({
      endpoint: "news",
      queries: {
        filters: `slug[equals]${slug}`,
      },
    });

    if (response.contents.length > 0) {
      return response.contents[0];
    }

    // スラッグで見つからない場合、IDとして検索（互換性のため）
    try {
      const newsById = await getNewsById(slug);
      if (newsById) {
        return newsById;
      }
    } catch (e) {
      console.log("IDでの検索に失敗:", e);
    }

    return null;
  } catch (error) {
    console.error("スラッグでのニュース検索エラー:", error);
    return null;
  }
};

// ブログのカテゴリの型定義
export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
};

// ブログ記事の型定義
export type Blog = {
  id: string;
  title: string;
  content: string;
  description: string;
  eyecatch?: {
    url: string;
    width: number;
    height: number;
  };
  category: BlogCategory;
  slug: string;
  tags: string; // カンマ区切りのタグ
  publishedAt: string;
  updatedAt: string;
};

// すべてのブログカテゴリを取得する関数
export const getAllBlogCategories = async (): Promise<BlogCategory[]> => {
  const response = await client.getList<BlogCategory>({
    endpoint: "categories",
    queries: { limit: 100 },
  });
  return response.contents;
};

// 特定のカテゴリに属するブログ記事を取得する関数
export const getBlogsByCategory = async (
  categoryId: string,
): Promise<Blog[]> => {
  const response = await client.getList<Blog>({
    endpoint: "blogs",
    queries: {
      filters: `category[equals]${categoryId}`,
      orders: "-publishedAt",
      limit: 100,
    },
  });
  return response.contents;
};

// すべてのブログ記事を取得する関数
export const getAllBlogs = async (): Promise<Blog[]> => {
  const response = await client.getList<Blog>({
    endpoint: "blogs",
    queries: {
      orders: "-publishedAt",
      limit: 100,
    },
  });
  return response.contents;
};

// 特定のスラッグからブログ記事を取得する関数
export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const response = await client.getList<Blog>({
      endpoint: "blogs",
      queries: {
        filters: `slug[equals]${slug}`,
      },
    });

    return response.contents[0] || null;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
};

// 特定のIDのブログ記事を取得する関数
export const getBlogById = async (id: string): Promise<Blog | null> => {
  try {
    const blog = await client.get<Blog>({
      endpoint: "blogs",
      contentId: id,
    });
    return blog;
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return null;
  }
};

// 特定のタグを含むブログ記事を取得する関数
export const getBlogsByTag = async (tag: string): Promise<Blog[]> => {
  try {
    console.log(`「${tag}」タグで記事を検索します`);
    // タグはカンマ区切りのテキストフィールドなので、含む検索を使用
    const response = await client.getList<Blog>({
      endpoint: "blogs",
      queries: {
        filters: `tags[contains]${tag}`,
        orders: "-publishedAt",
        limit: 100,
      },
    });

    console.log(
      `「${tag}」タグの記事: ${response.contents.length}件見つかりました`,
    );

    // クライアント側でもフィルタリングして確実に該当するタグを含む記事だけを返す
    const filteredBlogs = response.contents.filter((blog) => {
      if (!blog.tags) return false;
      const blogTags = blog.tags.split(",").map((t) => t.trim());
      return blogTags.includes(tag);
    });

    console.log(
      `「${tag}」タグの記事（フィルタリング後）: ${filteredBlogs.length}件`,
    );

    return filteredBlogs;
  } catch (error) {
    console.error(`「${tag}」タグの記事検索中にエラーが発生しました:`, error);
    return [];
  }
};

// すべてのタグとその記事数を取得する関数
export const getAllTags = async (): Promise<
  { name: string; count: number }[]
> => {
  const blogs = await getAllBlogs();

  // タグの出現回数を集計
  const tagCounts: Record<string, number> = {};
  blogs.forEach((blog) => {
    if (blog.tags) {
      blog.tags.split(",").forEach((tag) => {
        const trimmedTag = tag.trim();
        if (trimmedTag) {
          tagCounts[trimmedTag] = (tagCounts[trimmedTag] || 0) + 1;
        }
      });
    }
  });

  // タグ情報を配列に変換して返す
  return Object.keys(tagCounts)
    .map((name) => ({
      name,
      count: tagCounts[name],
    }))
    .sort((a, b) => b.count - a.count); // 出現頻度順にソート
};
