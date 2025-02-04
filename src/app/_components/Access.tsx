"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Access() {
  return (
    <section className="relative w-full bg-[#7FE5F0] py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="mb-2 text-3xl font-bold">ACCESS</h2>
          <p className="text-lg">アクセス</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] overflow-hidden rounded-lg border-2 border-black md:h-[500px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAP_EMBED_URL"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </motion.div>

          {/* アクセス情報 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold">所在地</h3>
              <p className="text-gray-700">
                〒000-0000
                <br />
                岐阜県下呂市小坂町大字小坂町XXX-XX
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold">アクセス方法</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold">お車でお越しの場合</h4>
                  <p className="text-gray-700">
                    中央自動車道 〇〇ICより約XX分
                    <br />
                    駐車場：XX台完備
                  </p>
                </div>
                <div>
                  <h4 className="font-bold">電車でお越しの場合</h4>
                  <p className="text-gray-700">
                    JR高山本線 下呂駅より
                    <br />
                    バス：XXX行き XX分
                    <br />
                    タクシー：約XX分
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold">営業時間</h3>
              <p className="text-gray-700">
                釣り体験：9:00〜17:00（最終受付16:00）
                <br />
                お食事：11:00〜15:00（L.O. 14:30）
                <br />
                定休日：水曜日
              </p>
            </div>
          </motion.div>
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
