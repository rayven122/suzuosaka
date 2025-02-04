"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Fishing() {
  return (
    <section className="relative w-full bg-[#7FE5F0] py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="mb-2 text-3xl font-bold">FISHING</h2>
          <p className="text-lg">釣り</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* メイン画像 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src="/Fishing/main.jpg"
              alt="釣りの様子"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* テキストコンテンツ */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="[writing-mode:vertical-rl]">
              <h3 className="mb-4 text-2xl font-bold">
                釣りを楽しむ
                <br />
                自然を感じる
              </h3>
            </div>
            <p className="mt-4 text-lg leading-relaxed">
              透明度の高い清流で育った魚たちとの出会いをお楽しみください。
              初心者の方でも安心して釣りを体験していただけます。
            </p>
            <motion.div whileHover={{ scale: 1.05 }} className="mt-8">
              <Link
                href="/fishing"
                className="inline-block rounded-full bg-white px-8 py-3 font-bold text-primary shadow-md transition-all hover:bg-primary hover:text-white"
              >
                VIEW MORE
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* サブ情報 */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: "初心者歓迎",
              description: "スタッフが丁寧にサポートいたします",
              image: "/Fishing/beginner.jpg",
            },
            {
              title: "道具レンタル",
              description: "必要な道具は全てご用意しております",
              image: "/Fishing/tools.jpg",
            },
            {
              title: "自然体験",
              description: "豊かな自然の中で癒しのひとときを",
              image: "/Fishing/nature.jpg",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-lg bg-white p-4 shadow-lg"
            >
              <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="mb-2 text-xl font-bold">{item.title}</h4>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 装飾的な要素 */}
      <Image
        src="/common/bubble.svg"
        alt="装飾"
        width={200}
        height={200}
        className="absolute -left-10 bottom-0 w-40 opacity-50"
      />
      <Image
        src="/common/bubble.svg"
        alt="装飾"
        width={150}
        height={150}
        className="absolute right-10 top-20 w-32 opacity-30"
      />
    </section>
  );
}
