import Link from "next/link";

type BlogHeaderProps = {
  title: string;
  description: string;
  backLink?: {
    href: string;
    text: string;
  };
};

export const BlogHeader = ({
  title,
  description,
  backLink,
}: BlogHeaderProps) => {
  return (
    <div className="mb-12 text-center">
      {backLink && (
        <Link
          href={backLink.href}
          className="mb-4 inline-block text-sm font-medium hover:underline"
        >
          ← {backLink.text}
        </Link>
      )}
      <h1 className="mb-4 font-shippori-antique-b1 text-4xl font-bold md:text-5xl">
        {title}
      </h1>
      <p className="mx-auto max-w-2xl text-lg text-gray-600">{description}</p>
    </div>
  );
};
