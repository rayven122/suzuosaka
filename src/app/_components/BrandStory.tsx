"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useRef } from "react";
import { Description } from "./common/Discription";

export const BrandStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // パララックス効果のための変換
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const text =
    "霊峰御嶽山の恵みを受ける200以上の滝と清流の町「飛騨小坂」。透明度の高い川には太古の昔からあまご、いわなが豊富に泳ぎ回り、現在でもこの地に数多く棲息しています。";

  return (
    <section
      ref={containerRef}
      className="relative h-[1000px] w-full overflow-hidden bg-gradient-main py-10 lg:h-[1100px] lg:py-20"
    >
      <div className="container z-30 mx-auto px-4">
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <p className="text-base font-semibold md:text-2xl">ABOUT</p>
          <h2 className="mb-2 font-shippori-antique-b1 text-2xl font-medium md:text-5xl">
            おさかとは?
          </h2>
        </motion.div>

        {/* セリフ */}
        <ul className="z-10 flex gap-2 text-base md:mb-10 md:ml-14 md:gap-4 md:text-3xl lg:text-4xl">
          {["面白すぎる「川」の世界へ", "ちゃぽん！"].map((text, index) => (
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
      <div className="absolute right-[10%] top-[35%] z-30 md:right-[5%] xl:right-[18%]">
        <ScrollingMain />
      </div>
      <div className="absolute -right-[5%] top-[8%] md:-right-[2%] md:top-[10%]">
        <ForestSub />
      </div>
      <div className="absolute right-[30%] top-[20%] md:right-[50%] md:top-[20%]">
        <RiverSub />
      </div>
      <div className="absolute right-[20%] top-[65%] md:right-[50%] md:top-[50%] xl:right-[60%]">
        {/* 説明 */}
        <Description
          text="霊峰御嶽山の恵みを受ける200以上の滝と清流の町「飛騨小坂」。透明度の高い川には太古の昔からあまご、いわなが豊富に泳ぎ回り、現在でもこの地に数多く棲息しています。"
          linkHref="/"
        />
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

      {/* ブランド名のスクロール */}
      <div className="absolute -left-10 bottom-20 w-full">
        <p className="w-full rotate-6 overflow-hidden whitespace-nowrap text-4xl font-semibold md:text-7xl">
          RIVERS ARE INTERESTING. RIVERS ARE INTERESTING. RIVERS ARE
          INTERESTING.
        </p>
      </div>
    </section>
  );
};

export const ScrollingMain = () => {
  const brandNames = ["OSAKA💦"];
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
                    className="text-base font-semibold md:text-xl"
                  >
                    {item}
                  </span>
                )),
              )}
            </div>
          </Marquee>
        </div>
        <Image
          src="/BrandStory/garden.png"
          alt="庭から見る川"
          height={550}
          width={550}
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

export const ForestSub = () => {
  const bubbles = [
    { className: "-left-8 md:-left-[50px]" },
    { className: "left-0" },
    { className: "left-8 md:left-[50px]" },
    { className: "left-16 md:left-[100px]" },
    { className: "left-24 md:left-[150px]" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mb-10 size-[125px] md:size-[250px] xl:size-[350px]"
    >
      {/* パララックスで動く泡 */}
      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
          className={`absolute -top-8 md:-top-[50px] ${bubble.className}`}
        >
          <Image
            src="/common/bubble-single.svg"
            alt="装飾"
            width={60}
            height={60}
            className="md:size-[120px] xl:size-[150px]"
          />
        </motion.div>
      ))}

      {/* 画像 */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 aspect-square size-[125px] overflow-hidden md:size-[250px] xl:size-[350px]"
      >
        <Image
          src="/BrandStory/forest.png"
          alt="林"
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

export const RiverSub = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mb-10 size-[125px] md:size-[250px]"
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

      {/* テキスト */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 aspect-square size-[125px] md:size-[250px]"
      >
        <Image
          src="/BrandStory/text.svg"
          alt="川"
          width={120}
          height={90}
          className="absolute -top-10 left-0 z-30 size-[100px] md:size-[200px]"
        />
        {/* 画像 */}
        <Image
          src="/BrandStory/river.png"
          alt="川"
          height={250}
          width={250}
          className="aspect-square rounded-[20px] border-2 border-black object-cover"
        />
      </motion.div>
      {/* 後ろのボックス */}
      <div className="absolute left-2 top-2 size-[125px] rounded-[20px] border-2 border-black bg-primary md:size-[250px]" />
    </motion.div>
  );
};
