"use client";

import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { INSTAGRAM_URL } from "@/constants/sns";

export const InstaRing = () => {
  return (
    <Link
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[20px] right-[20px] z-50 md:bottom-[50px] md:right-[50px]"
    >
      <motion.div
        className="relative grid size-[70px] cursor-pointer place-items-center rounded-full md:size-[90px]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 top-0 h-full w-full"
        >
          <Image
            src="/common/instagram-ring.svg"
            alt="インスタグラムフォロー"
            width={90}
            height={90}
            className="h-auto w-auto"
          />
        </motion.div>
        <FaInstagram className="text-[24px] md:text-[32px]" />
      </motion.div>
    </Link>
  );
};
