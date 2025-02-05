"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Bubbles } from "./_components/common/Bubbles";

export default function NotFound() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-hero">
      <Bubbles />
      <div className="flex h-full flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="z-10 text-center"
        >
          <motion.h1
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4 rounded-full border-4 border-black bg-white px-8 py-4 text-8xl font-bold text-primary"
          >
            404
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8 text-2xl font-bold text-black"
          >
            ページが見つかりません
          </motion.p>
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full border-2 border-black bg-primary px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-blue-600"
            >
              ホームに戻る
            </motion.div>
          </Link>
        </motion.div>
      </div>

      <Image
        src="/common/logo-vertical.svg"
        alt="川の家 おさか"
        width={150}
        height={150}
        className="absolute left-5 top-5 w-24 md:w-32"
      />
    </div>
  );
}
