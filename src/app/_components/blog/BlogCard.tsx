import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/libs/client";

type BlogCardProps = {
  blog: Blog;
  showTags?: boolean;
  activeTag?: string;
};

export const BlogCard = ({
  blog,
  showTags = true,
  activeTag,
}: BlogCardProps) => {
  // 日付フォーマットの改善
  const publishDate = new Date(blog.publishedAt);
  const formattedDate = `${publishDate.getFullYear()}年${
    publishDate.getMonth() + 1
  }月${publishDate.getDate()}日`;

  // 新しいtagsフィールドを使用
  const tags = blog.tags && Array.isArray(blog.tags) ? blog.tags : [];

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl">
      {blog.eyecatch ? (
        <div className="relative h-48 w-full">
          <Image
            src={blog.eyecatch.url}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-gray-100">
          <span className="text-gray-400">画像なし</span>
        </div>
      )}
      <div className="p-6">
        <div className="mb-2">
          <Link href={`/blogs/${blog.category.slug}`}>
            <span className="inline-block rounded border-l-4 border-primary bg-primary-light/10 px-3 py-1 text-sm font-semibold text-primary transition-colors hover:bg-primary/10">
              {blog.category.name}
            </span>
          </Link>
        </div>
        <Link
          href={`/blogs/${blog.category.slug}/${blog.slug}`}
          className="group"
        >
          <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
            {blog.title}
          </h3>
        </Link>
        <p className="mb-4 line-clamp-2 text-gray-600">{blog.description}</p>

        {/* タグの表示（オプション） */}
        {showTags && tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blogs/tags/${tag.slug}`}
                className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                  tag.slug === activeTag
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                title={tag.description}
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
            <time dateTime={blog.publishedAt}>{formattedDate}</time>
          </div>
          <Link
            href={`/blogs/${blog.category.slug}/${blog.slug}`}
            className="text-sm font-medium text-primary-dark hover:underline"
          >
            続きを読む →
          </Link>
        </div>
      </div>
    </div>
  );
};
