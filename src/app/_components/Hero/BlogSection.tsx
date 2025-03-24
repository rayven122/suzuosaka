import { getAllBlogs } from "@/libs/client";
import { BlogSection as ClientBlogSection } from "./blog";

// サーバーコンポーネントでデータをフェッチ
export async function BlogSection() {
  // 最新の6件のブログ記事を取得
  const blogs = await getAllBlogs();
  const limitedBlogs = blogs.slice(0, 6); // 最新6件のみ表示

  return <ClientBlogSection blogs={limitedBlogs} />;
}
