"use client";
import Image from "next/image";
import { LogoLink } from "../_components/common/LogoLink";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Eatery() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden border-b-2 border-black bg-gradient-to-b from-cyan-400 to-green-300">
      <LogoLink />
      <div className="mx-auto py-8 md:py-16">
        <div className="ml-4 mt-28 flex md:mt-60 lg:flex-row lg:justify-between lg:gap-10 xl:ml-60">
          {/* タイトルとテキスト */}
          <div className="mb-8 lg:mb-0">
            <h1 className="mb-2 font-shippori-antique-b1 text-2xl md:text-3xl lg:text-4xl">
              食堂
            </h1>
            <p className="font-shippori-antique-b1 text-4xl md:text-6xl lg:text-8xl">
              EATERY
            </p>
            {/* セリフ */}
            <ul className="my-6 flex flex-wrap gap-2 text-base md:my-12 md:gap-4 md:text-2xl lg:text-3xl xl:text-5xl">
              {[
                "景色良し、釣って良し、食べてさらに良し！",
                "ふわっふわっ、サックサク",
              ].map((text, index) => (
                <li key={index} className="block min-w-[28px]">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="border-2 border-black bg-white font-shippori-antique-b1 [writing-mode:vertical-rl]"
                  >
                    {text}
                  </motion.span>
                </li>
              ))}
            </ul>
          </div>

          {/* メインビジュアル */}
          <div className="relative mt-28 h-[500px] w-full md:h-[550px] lg:mt-40 lg:h-[800px] xl:h-[900px]">
            <div className="absolute -right-[30px] top-0 mb-8 w-[300px] md:right-0 md:w-[400px] lg:z-10 lg:w-[620px] xl:w-[800px]">
              <Image
                src="/Eatery/fish.png"
                alt="料理の様子"
                width={620}
                height={410}
                layout="responsive"
                className="rounded-[20px] border-2 border-black"
              />
            </div>
            <div className="absolute -left-[100px] bottom-0 w-[200px] md:-left-[50px] md:w-[300px] lg:w-[400px] xl:-left-[200px] xl:w-[500px]">
              <Image
                src="/Eatery/tempura.png"
                alt="天ぷらの様子"
                width={400}
                height={280}
                layout="responsive"
                className="rounded-[20px] border-2 border-black"
              />
              <p className="mt-4 text-sm md:text-lg lg:mt-12 lg:text-xl">
                あなたの知っている川魚の常識が変わるかもしれない！？
                美しい水で育った名物岩魚の天ぷらをはじめ、塩焼、刺身などなど心も身体も満腹になります。
              </p>
            </div>

            {/* 装飾的な泡 */}
            <div className="absolute right-[20%] top-[20%]">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="size-16 rounded-full bg-blue-300 md:size-24"
              />
            </div>
            <div className="absolute right-[10%] top-[40%]">
              <motion.div
                animate={{ y: [-15, 5, -15] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="size-12 rounded-full bg-blue-300 md:size-20"
              />
            </div>
            <div className="absolute bottom-[30%] right-[5%]">
              <motion.div
                animate={{ y: [-8, 12, -8] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                className="size-20 rounded-full bg-blue-300 md:size-32"
              />
            </div>
          </div>
        </div>

        {/* 予約ページに遷移 */}
        <div className="flex justify-center pt-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/reservation"
              className="inline-block rounded-full bg-white px-8 py-3 font-bold text-primary shadow-md transition-all hover:bg-primary hover:text-white"
            >
              予約はこちら
            </Link>
          </motion.div>
        </div>

        {/* メニュー */}
        <div className="mx-auto mt-28 max-w-6xl bg-white px-4 py-12">
          <h2 className="mb-12 text-center text-3xl font-bold">メニュー</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center">
              <div className="mb-4 h-64 w-64 rounded-full border border-gray-300"></div>
              <h3 className="mb-2 text-xl">魚づくし定食</h3>
              <p className="text-xl font-bold">2,500円</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4 h-64 w-64 rounded-full border border-gray-300"></div>
              <h3 className="mb-2 text-xl">魚の塩焼き天ぷら定食</h3>
              <p className="text-xl font-bold">2,000円</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4 h-64 w-64 rounded-full border border-gray-300"></div>
              <h3 className="mb-2 text-xl">いわな天丼定食</h3>
              <p className="text-xl font-bold">1,600円</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4 h-64 w-64 rounded-full border border-gray-300"></div>
              <h3 className="mb-2 text-xl">魚の天ぷら</h3>
              <p className="text-xl font-bold">1,600円</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
