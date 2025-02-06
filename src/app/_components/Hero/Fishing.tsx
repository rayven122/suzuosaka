"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Description } from "../common/Description";
import { BubblesUnderMotion } from "../common/BubbleUnderMotion";
import { BubblesUpperMotion } from "../common/BubbleUpperMotion";

export const Fishing = () => {
  return (
    <section className="relative h-[800px] w-full overflow-hidden border-b-2 border-black bg-gradient-main py-16 md:h-[1000px] lg:py-20">
      <div className="container mx-auto px-4">
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <p className="text-base font-semibold md:text-2xl">FISHING</p>
          <h2 className="mb-2 font-shippori-antique-b1 text-2xl font-medium md:text-5xl">
            釣り
          </h2>
        </motion.div>

        {/* セリフ */}
        <ul className="mb-4 ml-2 flex gap-2 text-base md:mb-10 md:ml-14 md:gap-4 md:text-3xl lg:text-4xl">
          {["子供も大人も夢中になっちゃう！", "釣れた！釣れた！"].map(
            (text, index) => (
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
            ),
          )}
        </ul>

        {/* メインビジュアル */}
        <div className="absolute right-[5%] top-[10%] z-30 md:right-[35%]">
          <ScrollingMain />
        </div>
        <div className="absolute right-[10%] top-[45%] ">
          <FishSub />
        </div>
        <div className="absolute right-[20%] top-[70%] md:right-[50%]">
          {/* 説明 */}
          <Description
            text="非日常を感じられる美しい景観の中で本格的な渓流釣りから、釣り堀まで体験でき、ファミリーやカップルに大人気です！"
            linkHref="/fishing"
          />
        </div>
      </div>

      {/* パララックスで動く泡 */}
      <Image
        src="/BrandStory/bubble-single.svg"
        alt="左の泡"
        width={80}
        height={80}
        className="absolute -left-4 bottom-10 z-30 size-[50px] md:size-[100px]"
      />
      <Image
        src="/BrandStory/bubble-single.svg"
        alt="左の泡"
        width={80}
        height={80}
        className="absolute bottom-4 left-4 z-30 size-[50px] md:bottom-0 md:left-12 md:size-[100px]"
      />
      <BubblesUnderMotion />
      <BubblesUpperMotion />
    </section>
  );
};

export const ScrollingMain = () => {
  const brandNames = ["FISHING🐟"];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mb-10 size-[250px] md:size-[450px] xl:size-[550px]"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 aspect-square size-[250px] overflow-hidden md:size-[450px] xl:size-[550px]"
      >
        <div className="absolute top-0 z-20 w-full rounded-t-[20px] border-2 border-b-0 border-black bg-gradient-main py-1 md:py-2">
          <Marquee
            gradient={false}
            speed={50}
            pauseOnHover={true}
            className="overflow-hidden"
          >
            <div className="flex gap-1 px-1">
              {[...Array(10)].map((_, i) =>
                brandNames.map((item, index) => (
                  <span
                    key={`${i}-${index}`}
                    className="text-base font-semibold md:text-xl xl:text-2xl "
                  >
                    {item}
                  </span>
                )),
              )}
            </div>
          </Marquee>
        </div>
        <Image
          src="/Fishing/fishing.png"
          alt="釣り"
          height={450}
          width={450}
          className="rounded-[20px] border-2 border-black object-cover md:size-[450px] xl:size-[550px]"
        />
      </motion.div>

      {/* 装飾的な要素 */}
      <div className="absolute left-3 top-1 z-0 size-[250px] rounded-[20px] border-2 border-black bg-primary md:top-2 md:size-[450px] xl:size-[550px]" />
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 1 }}
        className="absolute -bottom-8 -right-8 z-30 rounded-full bg-gradient-main md:-bottom-12 md:-right-12"
      >
        <Image
          src="/common/logo.svg"
          alt="logo"
          width={60}
          height={60}
          className="md:size-[100px] xl:size-[120px]"
        />
      </motion.div>
    </motion.div>
  );
};

export const FishSub = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mb-10 size-[125px] md:size-[250px] xl:size-[350px]"
    >
      {/* パララックスで動く泡 */}
      {/* 左の泡 */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Image
          src="/BrandStory/bubble-s-lt.svg"
          alt="左の泡"
          width={20}
          height={20}
          className="absolute -left-8 top-6 z-30 md:-left-12 md:top-10 md:size-[30px]"
        />
      </motion.div>
      <motion.div
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Image
          src="/BrandStory/bubble-b-lt.svg"
          alt="左の泡"
          width={30}
          height={30}
          className="absolute -left-12 top-1 z-50 md:-left-20 md:top-2 md:size-[50px]"
        />
      </motion.div>

      {/* 右の泡 */}
      <Image
        src="/BrandStory/bubble-s-rt.svg"
        alt="右の泡"
        width={20}
        height={20}
        className="absolute -right-6 top-10 z-20 md:-right-4 md:top-16 md:size-[35px]"
      />
      <Image
        src="/BrandStory/bubble-b-rt.svg"
        alt="左の泡"
        width={30}
        height={30}
        className="absolute -right-8 top-6 z-30 md:-right-12 md:top-10 md:size-[50px]"
      />

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 aspect-square size-[125px] md:size-[250px] xl:size-[350px]"
      >
        {/* 画像 */}
        <Image
          src="/Fishing/fish.png"
          alt="釣った魚"
          height={350}
          width={350}
          className="aspect-square rounded-[20px] border-2 border-black object-cover md:size-[250px] xl:size-[350px]"
        />
      </motion.div>
      {/* 後ろのボックス */}
      <div className="absolute left-2 top-2 size-[125px] rounded-[20px] border-2 border-black bg-primary md:size-[250px] xl:size-[350px]" />
    </motion.div>
  );
};
