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
  description: string;
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
      queries: {
        limit: 100,
        orders: "-publishedAt", // 公開日の新しい順（降順）
      },
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

// タグの型定義
export type Tag = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
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
  tags?: Tag[]; // タグのリレーション
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

// 特定のタグスラッグを含むブログ記事を取得する関数
export const getBlogsByTagSlug = async (tagSlug: string): Promise<Blog[]> => {
  try {
    console.log(`タグスラッグ「${tagSlug}」で記事を検索します`);
    
    // まずタグIDを取得
    const tagResponse = await client.getList<Tag>({
      endpoint: "tags",
      queries: {
        filters: `slug[equals]${tagSlug}`,
        limit: 1,
      },
    });

    if (tagResponse.contents.length === 0) {
      console.log(`タグスラッグ「${tagSlug}」が見つかりません`);
      return [];
    }

    const tag = tagResponse.contents[0];
    
    // タグIDでブログ記事を検索
    const response = await client.getList<Blog>({
      endpoint: "blogs",
      queries: {
        filters: `tags[contains]${tag.id}`,
        orders: "-publishedAt",
        limit: 100,
      },
    });

    console.log(
      `タグ「${tag.name}」の記事: ${response.contents.length}件見つかりました`,
    );

    return response.contents;
  } catch (error) {
    console.error(`タグスラッグ「${tagSlug}」の記事検索中にエラーが発生しました:`, error);
    return [];
  }
};

// すべてのタグを取得する関数
export const getAllTags = async (): Promise<Tag[]> => {
  try {
    const response = await client.getList<Tag>({
      endpoint: "tags",
      queries: {
        limit: 100,
        orders: "slug",
      },
    });
    return response.contents;
  } catch (error) {
    console.error("タグの取得中にエラーが発生しました:", error);
    return [];
  }
};

// すべてのタグとその記事数を取得する関数
export const getAllTagsWithCount = async (): Promise<
  { tag: Tag; count: number }[]
> => {
  const [tags, blogs] = await Promise.all([getAllTags(), getAllBlogs()]);

  // タグごとの記事数を集計
  const tagCountMap = new Map<string, number>();
  
  blogs.forEach((blog) => {
    if (blog.tags && Array.isArray(blog.tags)) {
      blog.tags.forEach((tag) => {
        const currentCount = tagCountMap.get(tag.id) || 0;
        tagCountMap.set(tag.id, currentCount + 1);
      });
    }
  });

  // タグ情報と記事数を結合
  return tags
    .map((tag) => ({
      tag,
      count: tagCountMap.get(tag.id) || 0,
    }))
    .filter((item) => item.count > 0) // 記事が存在するタグのみ
    .sort((a, b) => b.count - a.count); // 記事数の多い順にソート
};
