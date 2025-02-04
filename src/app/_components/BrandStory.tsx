"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

export const BrandStory = () => {
  return (
    <section className="bg-gradient-main relative h-[1000px] w-full py-20 lg:h-[1100px]">
      <div className="container mx-auto px-4">
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-sm font-semibold md:text-xl">ABOUT</p>
          <h2 className="font-shippori-antique-b1 mb-2 text-xl font-medium md:text-4xl">
            おさかとは?
          </h2>
        </motion.div>

        {/* セリフ */}
        <ul className="mb-6 ml-5 flex gap-2 md:mb-10 md:ml-14 md:gap-4 md:text-3xl lg:text-4xl">
          {["面白すぎる「川」の世界へ", "ちゃぽん！"].map((text, index) => (
            <li key={index} className="block">
              <span className="font-shippori-antique-b1 border-2 border-black bg-white [writing-mode:vertical-rl]">
                {text}
              </span>
            </li>
          ))}
        </ul>

        {/* メインビジュアル */}
        <div className="absolute right-[15%] top-[35%]">
          <ScrollingMain />
        </div>
        <div className="absolute -right-[2%] top-[10%]">
          <ForestSub />
        </div>
        <div className="absolute right-[50%] top-[20%]">
          <RiverSub />
        </div>
        <div className="absolute right-[55%] top-[50%]">
          {/* 説明 */}
          <div className="w-80 space-y-8">
            <p>
              霊峰御嶽山の恵みを受ける200以上の滝と清流の町「飛騨小坂」。
              <br />
              透明度の高い川には太古の昔からあまご、いわなが豊富に泳ぎ回り、現在でもこの地に数多く棲息しています。
            </p>
            <Link href="/" className="group flex items-center gap-2">
              <p className="text-lg font-bold">VIEW MORE</p>
              <div className="group-hover:bg-gradient-main grid place-items-center rounded-full border border-black bg-white p-4 duration-500">
                {/* TODO:矢印がホバー時に消えて、再度表示するようにする */}
                <Image
                  src="/common/arrow.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* 装飾的な泡の要素 （TODO:パララックスで動くようにする）*/}
      <Image
        src="/BrandStory/bubble-single.svg"
        alt="左の泡"
        width={100}
        height={100}
        className="absolute -left-4 bottom-10 z-30"
      />
      <Image
        src="/BrandStory/bubble-single.svg"
        alt="左の泡"
        width={100}
        height={100}
        className="absolute bottom-0 left-12 z-30"
      />
      {/* ブランド名のスクロール */}
      {/* <DiagonalMarquee /> */}
      <div className="absolute -left-10 bottom-20 w-full">
        <p className="w-full rotate-6 whitespace-nowrap text-7xl font-semibold">
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
      className="relative mb-10 size-[450px]"
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
                  className="text-xl font-semibold md:text-xl"
                >
                  {item}
                </span>
              )),
            )}
          </div>
        </Marquee>
      </div>
      <div className="relative z-10 aspect-square size-[450px] overflow-hidden">
        <Image
          src="/BrandStory/garden.png"
          alt="庭から見る川"
          height={450}
          width={450}
          className="rounded-[20px] border-2 border-black object-cover"
        />
      </div>
      {/* 装飾的な要素 */}
      <div className="absolute left-3 top-1 size-[450px] rounded-[20px] border-2 border-black bg-[#00E2FF]" />
      <Image
        src="/BrandStory/logo.svg"
        alt="logo"
        width={100}
        height={100}
        className="bg-gradient-main absolute -bottom-12 -right-12 z-30 rounded-full"
      />
    </motion.div>
  );
};

export const ForestSub = () => {
  const bubbles = [
    { left: "-50px" },
    { left: "0px" },
    { left: "50px" },
    { left: "100px" },
    { left: "150px" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mb-10 size-[250px]"
    >
      {/* 後ろの泡（TODO:パララックスで動くようにする） */}
      {bubbles.map((bubble, index) => (
        <Image
          key={index}
          src="/common/bubble-single.svg"
          alt="装飾"
          width={120}
          height={120}
          style={{
            position: "absolute",
            top: "-50px",
            left: bubble.left,
          }}
        />
      ))}

      {/* 画像 */}
      <div className="relative z-10 aspect-square size-[250px] overflow-hidden">
        <Image
          src="/BrandStory/forest.png"
          alt="林"
          height={250}
          width={250}
          className="aspect-square rounded-[20px] border-2 border-black object-cover"
        />
      </div>
      {/* 後ろのボックス */}
      <div className="absolute left-2 top-2 size-[250px] rounded-[20px] border-2 border-black bg-[#00E2FF]" />
    </motion.div>
  );
};

export const RiverSub = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mb-10 size-[250px]"
    >
      {/* 後ろの泡（TODO:パララックスで動くようにする） */}
      {/* 左の泡 */}
      <Image
        src="/BrandStory/bubble-s-lt.svg"
        alt="左の泡"
        width={30}
        height={30}
        className="absolute -left-12 top-10 z-30"
      />
      <Image
        src="/BrandStory/bubble-b-lt.svg"
        alt="左の泡"
        width={50}
        height={50}
        className="absolute -left-20 top-2 z-50"
      />
      {/* 後ろの泡（TODO:パララックスで動くようにする） */}
      {/* 右の泡 */}
      <Image
        src="/BrandStory/bubble-s-rt.svg"
        alt="右の泡"
        width={35}
        height={35}
        className="absolute -right-4 top-16 z-30"
      />
      <Image
        src="/BrandStory/bubble-b-rt.svg"
        alt="左の泡"
        width={50}
        height={50}
        className="absolute -right-12 top-10 z-50"
      />

      {/* テキスト */}
      <Image
        src="/BrandStory/text.svg"
        alt="川"
        width={200}
        height={150}
        className="absolute left-0 top-0 z-30"
      />
      {/* 画像 */}
      <div className="relative z-10 aspect-square size-[250px] overflow-hidden">
        <Image
          src="/BrandStory/river.png"
          alt="川"
          height={250}
          width={250}
          className="aspect-square rounded-[20px] border-2 border-black object-cover"
        />
      </div>
      {/* 後ろのボックス */}
      <div className="absolute left-2 top-2 size-[250px] rounded-[20px] border-2 border-black bg-[#00E2FF]" />
    </motion.div>
  );
};
// export const DiagonalMarquee = () => {
//   const brandSubNames = ["RIVERS ARE INTERESTING."];

//   return (
//     <div className="relative z-50 h-[600px] w-full overflow-hidden">
//       {/* Marquee コンポーネントを画面下部に配置 */}
//       <div className="absolute bottom-0 left-0 w-full">
//         <Marquee
//           gradient={false}
//           speed={50}
//           pauseOnHover={true}
//           // className="overflow-hidden"
//         >
//           {/* テキスト全体に 10° 回転を適用 */}
//           <div className="flex rotate-[10deg] transform gap-1 px-1">
//             {[...Array(30)].map((_, i) =>
//               brandSubNames.map((item, index) => (
//                 <span
//                   key={`${i}-${index}`}
//                   className="text-4xl font-semibold md:text-6xl"
//                 >
//                   {item}
//                 </span>
//               )),
//             )}
//           </div>
//         </Marquee>
//       </div>
//     </div>
//   );
// };
