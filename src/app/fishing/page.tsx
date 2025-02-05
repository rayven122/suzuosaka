"use client";
import Image from "next/image";
import { LogoLink } from "../_components/common/LogoLink";
import { motion } from "framer-motion";

export default function Fishing() {
  return (
    <main className="relative min-h-screen w-full bg-gradient-hero">
      <LogoLink />
      <div className="mx-auto bg-gray-600 py-16">
        <div className="ml-[250px] mt-[220px] flex justify-between gap-10 bg-yellow-400">
          {/* タイトルとテキスト */}
          <div className=" bg-red-400">
            <h1 className="mb-2 font-shippori-antique-b1 text-4xl">釣り</h1>
            <h1 className="font-shippori-antique-b1 text-7xl">FISHING</h1>
            {/* セリフ */}
            <ul className="mt-12 flex gap-2 text-base md:gap-4 md:text-3xl">
              {["子供も大人も夢中になっちゃう！", "釣れた！釣れた！"].map(
                (text, index) => (
                  <li key={index} className="block">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="border-2 border-black bg-white font-shippori-antique-b1 [writing-mode:vertical-rl]"
                    >
                      {text}
                    </motion.span>
                  </li>
                ),
              )}
            </ul>
          </div>
          {/* メインビジュアル */}
          <div>
            <div className="h-[410px] w-[620px]">
              <Image
                src="/Hero/fishing.png"
                alt="釣りの様子"
                height={410}
                width={620}
                className="rounded-[20px] border-2 border-black"
              />
            </div>
            <div className="h-[280px] w-[400px] bg-red-400">
              <Image
                src="/fishing/fish.png"
                alt="釣りの様子"
                height={280}
                width={400}
                className="aspect-3/2 rounded-[20px] border-2 border-black"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* 説明文 */}
          <div className="mb-12">
            <p className="mb-4 text-lg">
              休日等を楽しむ良い環境の中で本格的な渓流釣りが楽しめます。
              ファミリーやカップルにも人気です！
            </p>
          </div>

          {/* 料金表 */}
          <div className="mb-12 rounded-lg bg-white/80 p-8">
            <h2 className="mb-6 text-xl font-bold">渓流釣り料金</h2>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-4">入場料</td>
                  <td className="py-4">500円</td>
                  <td className="py-4 text-sm text-gray-600">
                    事前予約にてお支払いいただきます。
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4">渓流道具レンタル</td>
                  <td className="py-4">2,500円</td>
                  <td className="py-4 text-sm text-gray-600">
                    渓流竿用セット・えさ・バケツ込み
                    <br />
                    ※複数人でもレンタルセット 500円+2,500円=3,500円
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4">魚代</td>
                  <td className="py-4">300円/1匹</td>
                  <td className="py-4 text-sm text-gray-600">
                    ※お持ち帰りサービスとなります。
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4">魚調理代金</td>
                  <td className="py-4">300円/1匹</td>
                  <td className="py-4 text-sm text-gray-600">
                    釣ったお魚を塩焼きや天ぷらに調理いたします。
                  </td>
                </tr>
                <tr>
                  <td className="py-4">用カッパ</td>
                  <td className="py-4">300円</td>
                  <td className="py-4 text-sm text-gray-600">
                    ※用意無しでもお楽しみください。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* サブ画像 */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative h-64">
              <Image
                src="/images/fishing-1.jpg"
                alt="釣りの様子1"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="relative h-64">
              <Image
                src="/images/fishing-2.jpg"
                alt="釣りの様子2"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 波のデザイン */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="h-24 w-full"
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,74L1360,74C1280,74,1120,74,960,74C800,74,640,74,480,74C320,74,160,74,80,74L0,74Z"
            fill="#0099ff"
          />
        </svg>
      </div>
    </main>
  );
}
