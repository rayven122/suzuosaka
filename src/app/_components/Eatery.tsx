"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Eatery() {
  return (
    <section className="relative w-full bg-[#7FE5F0] py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="mb-2 text-3xl font-bold">EATERY</h2>
          <p className="text-lg">お食事</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* メイン料理画像 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/Eatery/main-dish.jpg"
                alt="メイン料理"
                fill
                className="object-cover"
              />
            </div>
            {/* 装飾的な要素 */}
            <div className="absolute -right-4 -top-4 h-full w-full rounded-lg border-2 border-black bg-transparent" />
          </motion.div>

          {/* テキストと予約ボタン */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="[writing-mode:vertical-rl]">
              <h3 className="mb-6 text-2xl font-bold">
                清流が育てた
                <br />
                極上の味わい
              </h3>
            </div>
            <p className="mt-4 text-lg leading-relaxed">
              地元で育った新鮮な魚を使用した料理の数々。
              伝統的な調理法と現代的なアレンジを織り交ぜた逸品をお楽しみください。
            </p>
            <motion.div whileHover={{ scale: 1.05 }} className="mt-8">
              <Link
                href="/reservation"
                className="inline-block rounded-full bg-white px-8 py-3 font-bold text-primary shadow-md transition-all hover:bg-primary hover:text-white"
              >
                ご予約はこちら
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* サブ料理画像 */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: "塩焼き",
              description: "シンプルな味わいで魚本来の美味しさを",
              image: "/Eatery/dish1.jpg",
            },
            {
              title: "刺身",
              description: "新鮮な旬の魚を贅沢に",
              image: "/Eatery/dish2.jpg",
            },
            {
              title: "煮付け",
              description: "優しい味付けで魚の旨みを引き立てて",
              image: "/Eatery/dish3.jpg",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h4 className="mb-2 text-xl font-bold">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
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
        className="absolute -right-10 bottom-0 w-40 opacity-50"
      />
      <Image
        src="/common/bubble.svg"
        alt="装飾"
        width={150}
        height={150}
        className="absolute left-10 top-20 w-32 opacity-30"
      />
    </section>
  );
}
