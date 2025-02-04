import Link from "next/link";

type Props = {
  noLink?: boolean;
  color?: "black" | "gray";
  link?: string;
  blank?: boolean;
  children?: string;
};

export default function Button({
  noLink = false,
  color = "black",
  link = "/",
  blank = false,
  children,
}: Props) {
  return noLink ? (
    <div className="bg-gray-white relative inline-block w-full rounded-md border p-2 text-center text-lg font-bold text-gray-800">
      {children}
    </div>
  ) : (
    <Link
      href={link}
      className={`${color === "gray" ? "bg-gray-100" : "bg-gray-900"} ${color === "gray" ? "text-gray-800" : "text-white"} relative inline-block w-full overflow-hidden rounded-md p-2 text-center text-lg font-bold before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-full before:w-full before:-translate-x-full before:bg-white before:opacity-20 before:transition-transform before:duration-200 before:ease-in-out before:content-[''] hover:before:translate-x-0 focus:outline-none focus-visible:ring`}
      target={blank ? "_blank" : undefined}
    >
      {children}
    </Link>
  );
}
