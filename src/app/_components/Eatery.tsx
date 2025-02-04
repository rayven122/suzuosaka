"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Description } from "./common/Description";
import { BubblesUnderMotion } from "./common/BubbleUnderMotion";

export const Eatery = () => {
  return (
    <section className="relative h-[900px] w-full overflow-hidden border-b-2 border-black bg-primary py-16 md:h-[1000px] lg:py-20">
      <div className="container mx-auto flex flex-col items-end justify-end px-4">
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-left md:mb-12"
        >
          <p className="text-base font-semibold md:text-2xl">EATERY</p>
          <h2 className="mb-2 font-shippori-antique-b1 text-2xl font-medium md:text-5xl">
            食堂
          </h2>
        </motion.div>
        {/* セリフ */}
        <ul className="flex gap-2 text-base md:mb-10 md:mr-20 md:gap-4 md:text-3xl lg:text-4xl">
          {[
            "食べてさらに良し！",
            "景色良し、釣って良し、",
            "ふわっふわっ。サックサク。",
          ].map((text, index) => (
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
          ))}
        </ul>
      </div>

      {/* メインビジュアル */}
      <div className="absolute left-[15%] top-[40%] z-20 md:left-[5%]">
        <ScrollingMain />
      </div>
      <div className="absolute left-[5%] top-[15%] md:left-[45%] ">
        <TempuraSub />
      </div>
      <div className="absolute left-[5%] top-[75%] md:left-[50%] md:top-[60%] ">
        {/* 説明 */}
        <Description
          text="あなたの知っている川魚の常識が変わるかもしれない！？ 美しい水で育った名物岩魚の天ぷらをはじめ塩焼、刺身などなど心も身体も満腹になります。"
          linkHref="/"
        />
      </div>
      <BubblesUnderMotion />
    </section>
  );
};

export const ScrollingMain = () => {
  const brandNames = ["EATERY🍺"];
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
        <div className="absolute top-0 z-20 w-full rounded-t-[20px] border-2 border-b-0 border-black bg-white py-1 md:py-2">
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
                    className="text-base font-semibold md:text-xl xl:text-2xl"
                  >
                    {item}
                  </span>
                )),
              )}
            </div>
          </Marquee>
        </div>
        <Image
          src="/Eatery/fish.png"
          alt="釣り"
          height={550}
          width={550}
          className="aspect-square size-[250px] rounded-[20px] border-2 border-black object-cover md:size-[450px] xl:size-[550px]"
        />
      </motion.div>

      {/* 装飾的な要素 */}
      <div className="absolute left-3 top-2 z-0 size-[250px] rounded-[20px] border-2 border-black bg-primary md:size-[450px] xl:size-[550px]" />
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 1 }}
        className="absolute -bottom-8 -right-8 z-30 rounded-full bg-primary md:-bottom-12 md:-right-12 xl:-bottom-14 xl:-right-14"
      >
        <Image
          src="/BrandStory/logo.svg"
          alt="logo"
          width={60}
          height={60}
          className="md:size-[100px] xl:size-[120px]"
        />
      </motion.div>
    </motion.div>
  );
};

export const TempuraSub = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mb-10 size-[125px] md:size-[250px] xl:size-[350px]"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 aspect-square size-[125px] md:size-[250px] xl:size-[350px]"
      >
        <Image
          src="/Eatery/text.svg"
          alt="パリッサクッ"
          width={80}
          height={60}
          className="absolute -right-4 -top-4 z-30 size-[70px] md:right-0 md:top-0 md:size-[100px] xl:size-[120px]"
        />
        <Image
          src="/Eatery/text2.svg"
          alt="ふわっふわ"
          width={80}
          height={60}
          className="absolute -bottom-4 -left-4 z-30 size-[70px] md:bottom-0 md:left-10 md:size-[100px] xl:size-[120px]"
        />
        {/* 画像 */}
        <Image
          src="/Eatery/tempura.png"
          alt="釣った魚"
          height={350}
          width={350}
          className="aspect-square rounded-[20px] border-2 border-black object-cover md:size-[250px] xl:size-[350px]"
        />
      </motion.div>
      {/* 後ろのボックス */}
      <div className="absolute left-2 top-2 size-[125px] rounded-[20px] border-2 border-black bg-primary md:left-3 md:top-3 md:size-[250px] xl:size-[350px]" />
    </motion.div>
  );
};
