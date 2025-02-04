"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

export const Fishing = () => {
  return (
    <section className="bg-gradient-main relative h-[800px] w-full overflow-hidden border-b-2 border-black py-16 md:h-[1000px] lg:py-20">
      <div className="container mx-auto px-4">
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <p className="text-base font-semibold md:text-2xl">FISHING</p>
          <h2 className="font-shippori-antique-b1 mb-2 text-2xl font-medium md:text-5xl">
            釣り
          </h2>
        </motion.div>

        {/* セリフ */}
        <ul className="mb-4 ml-2 flex gap-2 text-base md:mb-10 md:ml-14 md:gap-4 md:text-3xl lg:text-4xl">
          {["子供も大人も夢中になっちゃう！", "釣れた！釣れた！"].map(
            (text, index) => (
              <li key={index} className="block">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="font-shippori-antique-b1 border-2 border-black bg-white [writing-mode:vertical-rl]"
                >
                  {text}
                </motion.span>
              </li>
            ),
          )}
        </ul>

        {/* メインビジュアル */}
        <div className="absolute right-[5%] top-[10%] md:right-[35%]">
          <ScrollingMain />
        </div>
        <div className="absolute right-[10%] top-[45%] ">
          <FishSub />
        </div>
        <div className="absolute right-[20%] top-[70%] md:right-[50%]">
          {/* 説明 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-64 space-y-4 md:w-80 md:space-y-8"
          >
            <p className="font-shippori-antique-b1 text-sm leading-relaxed md:text-lg">
              非日常を感じられる美しい景観の中で本格的な渓流釣りから、釣り堀まで体験でき、ファミリーやカップルに大人気です！
            </p>
            <Link href="/" className="group flex items-center gap-2">
              <p className="text-lg font-bold md:text-xl">VIEW MORE</p>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="group-hover:bg-gradient-main relative grid place-items-center rounded-full border border-black bg-white p-3 md:p-4"
              >
                <Image
                  src="/common/arrow.svg"
                  alt="arrow"
                  width={16}
                  height={16}
                  className="md:size-5"
                />
              </motion.div>
            </Link>
          </motion.div>
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
      <Bubbles />
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
      className="relative mb-10 size-[250px] md:size-[450px]"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 aspect-square size-[250px] overflow-hidden md:size-[450px]"
      >
        <div className="bg-gradient-main absolute top-0 z-20 w-full rounded-t-[20px] border-2 border-b-0 border-black py-1">
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
          src="/fishing/fishing.png"
          alt="釣り"
          height={450}
          width={450}
          className="rounded-[20px] border-2 border-black object-cover"
        />
      </motion.div>

      {/* 装飾的な要素 */}
      <div className="absolute left-3 top-1 z-0 size-[250px] rounded-[20px] border-2 border-black bg-primary md:size-[450px]" />
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 1 }}
        className="bg-gradient-main absolute -bottom-8 -right-8 z-30 rounded-full md:-bottom-12 md:-right-12"
      >
        <Image
          src="/BrandStory/logo.svg"
          alt="logo"
          width={60}
          height={60}
          className="md:size-[100px]"
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

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 aspect-square size-[125px] md:size-[250px]"
      >
        {/* 画像 */}
        <Image
          src="/fishing/fish.png"
          alt="釣った魚"
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

export const Bubbles = () => {
  const upperBubbles = [
    { top: "-10px", left: "-40px" },
    { top: "-10px", left: "-10px" },
    { top: "-10px", left: "20px" },
    { top: "-10px", left: "50px" },
  ];
  const underBubbles = [
    { bottom: "-70px", right: "40%" },
    { bottom: "-70px", right: "35%" },
    { bottom: "-70px", right: "30%" },
    { bottom: "-70px", right: "25%" },
    { bottom: "-70px", right: "20%" },
    { bottom: "-70px", right: "15%" },
    { bottom: "-20px", right: "10%" },
    { bottom: "-20px", right: "5%" },
    { bottom: "-20px", right: "0%" },
    { bottom: "-20px", right: "-5%" },
  ];

  return (
    <>
      {/* TODO:左上に表示に変更 */}
      {upperBubbles.map((bubble, index) => (
        <motion.div
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
          style={{
            position: "absolute",
            top: bubble.top,
            right: bubble.left,
          }}
        >
          <Image
            src="/Fishing/bubble-single2.svg"
            alt="装飾"
            width={60}
            height={60}
            className="z-20 md:h-[120px] md:w-[120px]"
          />
        </motion.div>
      ))}
      {underBubbles.map((bubble, index) => (
        <motion.div
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
          style={{
            position: "absolute",
            bottom: bubble.bottom,
            right: bubble.right,
          }}
        >
          <Image
            src="/Fishing/bubble-single.svg"
            alt="装飾"
            width={60}
            height={60}
            className="md:h-[120px] md:w-[120px]"
          />
        </motion.div>
      ))}
    </>
  );
};
