"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative w-full bg-[#7FE5F0] py-20">
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-xl md:p-12">
          {/* 装飾的な要素 */}
          <div className="absolute -left-4 -top-4 h-full w-full rounded-2xl border-2 border-black bg-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative text-center"
          >
            <h2 className="mb-8 text-3xl font-bold">CONTACT</h2>
            <p className="mb-12 text-lg leading-relaxed">
              釣り体験やお食事のご予約、その他お問い合わせはこちらから
              <br />
              スタッフ一同、心よりお待ちしております
            </p>

            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-full md:w-auto"
              >
                <Link
                  href="/reservation"
                  className="block rounded-full bg-primary px-12 py-4 text-lg font-bold text-white shadow-md transition-all hover:bg-primary/90"
                >
                  ご予約はこちら
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-full md:w-auto"
              >
                <Link
                  href="/contact"
                  className="block rounded-full border-2 border-primary bg-white px-12 py-4 text-lg font-bold text-primary shadow-md transition-all hover:bg-primary hover:text-white"
                >
                  お問い合わせ
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 装飾的な泡の要素 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
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
          className="absolute -right-10 top-0 w-32 opacity-30"
        />
        <Image
          src="/common/bubble.svg"
          alt="装飾"
          width={100}
          height={100}
          className="absolute left-1/4 top-1/3 w-24 opacity-20"
        />
        <Image
          src="/common/bubble.svg"
          alt="装飾"
          width={120}
          height={120}
          className="absolute right-1/4 top-2/3 w-28 opacity-25"
        />
      </div>
    </section>
  );
}
