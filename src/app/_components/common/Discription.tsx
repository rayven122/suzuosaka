"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const Description = ({
  text,
  linkHref,
}: {
  text: string;
  linkHref: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="w-64 space-y-4 md:w-80 md:space-y-8"
    >
      <p className="font-shippori-antique-b1 text-sm leading-relaxed md:text-lg xl:text-2xl">
        {text}
      </p>
      <Link href={linkHref} className="group flex items-center gap-2">
        <p className="text-lg font-bold md:text-xl">VIEW MORE</p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative grid place-items-center rounded-full border border-black bg-white p-3 group-hover:bg-gradient-main md:p-4"
        >
          <Image
            src="/common/arrow.svg"
            alt="arrow"
            width={16}
            height={16}
            className="md:size-5"
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};
