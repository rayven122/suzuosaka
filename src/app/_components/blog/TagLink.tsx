import Link from "next/link";
import { Tag } from "@/libs/client";

type TagLinkProps = {
  tag: Tag;
  count?: number;
  isPopular?: boolean;
};

export const TagLink = ({ tag, count, isPopular = false }: TagLinkProps) => {
  return (
    <Link
      href={`/blogs/tags/${tag.slug}`}
      className={`group flex items-center gap-2 rounded-full px-4 py-2 transition-all hover:bg-primary hover:text-white ${
        isPopular ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
      }`}
      title={tag.description}
    >
      <span className="font-medium">#{tag.name}</span>
      {count !== undefined && (
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${
            isPopular ? "bg-white text-gray-800" : "bg-gray-200 text-gray-700"
          } group-hover:bg-white group-hover:text-primary`}
        >
          {count}
        </span>
      )}
    </Link>
  );
};
