"use client";
import Image from "next/image";
import { LogoLink } from "../_components/common/LogoLink";
import { motion } from "framer-motion";
import { BubblesUnderMotion } from "../_components/common/BubbleUnderMotion";
import { FaqList } from "../_components/common/Faq";
import Link from "next/link";
export default function Fishing() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden border-b-2 border-black bg-gradient-hero">
      <LogoLink />
      <div className="mx-auto py-8 md:py-16">
        <div className="ml-4 mt-28 flex md:mt-60 lg:flex-row lg:justify-between lg:gap-10 xl:ml-60">
          {/* タイトルとテキスト */}
          <div className="mb-8 lg:mb-0">
            <h1 className="mb-2 font-shippori-antique-b1 text-2xl md:text-3xl lg:text-4xl">
              釣り
            </h1>
            <h1 className="font-shippori-antique-b1 text-4xl md:text-6xl lg:text-8xl">
              FISHING
            </h1>
            {/* セリフ */}
            <ul className="my-6 flex flex-wrap gap-2 text-base md:my-12 md:gap-4 md:text-2xl lg:text-3xl xl:text-5xl">
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
          <div className="relative mt-28 h-[500px] w-full md:h-[550px] lg:mt-40 lg:h-[800px] xl:h-[900px]">
            <div className="absolute -right-[30px] top-0 mb-8 w-[300px] md:right-0 md:w-[400px] lg:z-10 lg:w-[620px] xl:w-[800px]">
              <Image
                src="/fishing/fishing2.png"
                alt="釣りの様子"
                width={620}
                height={410}
                layout="responsive"
                className="rounded-[20px] border-2 border-black"
              />
            </div>
            <div className="absolute -left-[100px] bottom-0 w-[200px] md:-left-[50px]  md:w-[300px] lg:w-[400px] xl:-left-[200px] xl:w-[500px]">
              <Image
                src="/fishing/fish2.png"
                alt="釣りの様子"
                width={400}
                height={280}
                layout="responsive"
                className="rounded-[20px] border-2 border-black"
              />
              <p className="mt-4 text-sm md:text-lg lg:mt-12 lg:text-xl">
                非日常を感じられる美しい景観の中で本格的な渓流釣りから、釣り堀まで体験でき、ファミリーやカップルに大人気です！
              </p>
            </div>
          </div>
        </div>
        {/* 予約ページに遷移*/}
        <div className="flex justify-center pt-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className=""
          >
            <Link
              href="/reservation"
              className="inline-block rounded-full bg-white px-8 py-3 font-bold text-primary shadow-md transition-all hover:bg-primary hover:text-white"
            >
              予約はこちら
            </Link>
          </motion.div>
        </div>
        {/* 釣り体験料金 */}
        <div className="ml-4 mt-12 md:ml-8">
          {/* 料金表 */}
          <div className="mb-12 ml-auto max-w-[1400px] rounded-[20px] bg-white p-4 md:p-8">
            <h2 className="mb-6 text-xl font-bold">釣り体験料金</h2>
            <div className="">
              <table className="w-full text-sm md:text-lg">
                <tbody>
                  <tr className="border-b-2 border-black">
                    <td className="py-4">入場料</td>
                    <td className="py-4">500円</td>
                    <td className="py-4 text-gray-600">
                      1人あたり500円です。ご参加いただく人数に応じたシンプルな料金設定です！
                    </td>
                  </tr>
                  <tr className="border-b-2 border-black">
                    <td className="py-4">渓流釣り道具レンタル（１セット）</td>
                    <td className="py-4">3,500円</td>
                    <td className="py-4 text-gray-600 ">
                      渓流用竿、餌、バケツがすべて含まれたセットです。
                      <br />
                      ※複数名でシェア可能。
                      例:2名の場合、500円×2名+3,500円=4,500円
                    </td>
                  </tr>
                  <tr className="border-b-2 border-black">
                    <td className="py-4">池釣り道具レンタル（１セット）</td>
                    <td className="py-4">2,500円</td>
                    <td className="py-4 text-gray-600 ">
                      池釣り用の竿、餌、バケツがセットになっています。
                      <br />
                      ※複数名でシェア可能。
                      例:2名の場合、500円×2名+2,500円=3,500円
                    </td>
                  </tr>
                  <tr className="border-b-2 border-black">
                    <td className="py-4">魚代</td>
                    <td className="py-4">300円/1匹</td>
                    <td className="py-4 text-gray-600 ">
                      釣ったお魚は、即日調理してその場で味わうか、お持ち帰りいただけます。お好みでお選びください！
                    </td>
                  </tr>
                  <tr className="border-b-2 border-black">
                    <td className="py-4">魚調理代金</td>
                    <td className="py-4">300円/1匹</td>
                    <td className="py-4 text-gray-600 ">
                      その場で釣り上げたお魚を、
                      <span className="font-bold">塩焼き</span>や
                      <span className="font-bold">天ぷら</span>
                      にして美味しく仕上げます。
                    </td>
                  </tr>
                  {/* <tr className="border-b-2 border-black">
                    <td className="py-4">雨天用カッパ</td>
                    <td className="py-4">300円</td>
                    <td className="py-4 text-gray-600 ">
                      急な雨でも安心！雨天時も楽しく体験していただけるよう、カッパをレンタルいたします。
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* よくある質問 */}
        <FaqList />
      </div>
    </main>
  );
}
