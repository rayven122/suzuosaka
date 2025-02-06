"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Bubbles } from "./common/Bubbles";

import { LogoLink } from "./common/LogoLink";

const CircularImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) => (
  <div className={`overflow-hidden border-2 border-black ${className}`}>
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      className="h-full w-full object-cover"
    />
  </div>
);

export const Hero = () => {
  return (
    <section className="relative h-[600px] w-full overflow-hidden bg-gradient-hero md:h-[1000px]">
      <LogoLink />
      {/* 画面に滞在する泡 */}
      <Image
        src="/Hero/bubble2.svg"
        alt="泡"
        width={150}
        height={150}
        className="absolute left-[40%] top-0 w-20 md:left-[25%] md:w-[150px]"
      />
      {/* 下から上まで行く泡 */}
      <Bubbles />
      {/* 釣り画像 */}
      <div
        id="main-image"
        className="absolute -right-[5%] top-[25%] md:right-[15%] md:top-[10%] lg:right-[20%]"
      >
        <div className="relative">
          <Image
            src="/Hero/text2.svg"
            alt="釣れた釣れた"
            width={200}
            height={200}
            className="absolute -left-[20%] -top-[25%] w-[120px] md:-left-[10%] md:-top-[20%] md:w-[180px] lg:w-[200px]"
          />
          <CircularImage
            src="/Hero/fishing.png"
            alt="釣りの様子"
            className="h-[200px] w-[300px] rounded-[50%] md:h-[250px] md:w-[400px] lg:h-[300px] lg:w-[500px] xl:h-[500px] xl:w-[700px]"
          />
          <Image
            src="/Hero/bubble.svg"
            alt="泡"
            width={200}
            height={200}
            className="absolute -top-[35%] right-[10%] h-auto w-[120px] md:-right-[35%] md:-top-[8%] md:w-[180px] lg:w-[200px]"
          />
        </div>
      </div>
      <CircularImage
        src="/Hero/fish.png"
        alt="塩焼き"
        className="absolute right-[25%] top-[60%] size-[130px] rounded-full md:right-[15%] md:size-[200px] lg:right-[20%] lg:size-[250px] xl:size-[350px]"
      />
      <Image
        src="/Hero/text1.svg"
        alt="川は面白い"
        width={180}
        height={380}
        className="absolute right-[5%] top-[55%] w-[75px] md:top-[20%] md:w-[150px] lg:w-[180px]"
      />
      <CircularImage
        src="/Hero/river.png"
        alt="川底の様子"
        className="absolute right-[80%] top-[30%] h-[130px] w-[100px] rounded-[50%] md:right-[55%] md:h-[180px] md:w-[150px] lg:right-[60%] lg:h-[230px] lg:w-[180px] xl:right-[65%] xl:h-[280px] xl:w-[230px]"
      />

      {/* 下部 */}
      <div className="absolute bottom-0 left-0 w-full">
        {/* お品書き */}
        <ul className="mb-6 ml-3 flex space-x-2 bg-yellow-500/60 font-bold md:mb-10 md:ml-14 md:space-x-4 md:text-3xl lg:text-4xl">
          {["お食事", "釣り", "養殖場見学", "体験"].map((text, index) => (
            <li key={index} className="block">
              <span className="border-2 border-black bg-primary [writing-mode:vertical-rl]">
                {text}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-end justify-between gap-4">
          <Image
            src="/Hero/river-house-osaka.svg"
            alt="川の家おさか"
            width={200}
            height={60}
            className="w-[50%] pl-4"
          />
          <Image
            src="/common/bubble.svg"
            alt="泡"
            width={200}
            height={60}
            className="w-[45%]"
          />
        </div>
        <ScrollingMenu />
      </div>
    </section>
  );
};

export const ScrollingMenu = () => {
  const menuItems = [
    "FISHING",
    "RESTAURANT",
    "TOUR OF AQUACULTURE FARM",
    "EXPERIENCE",
  ];
  return (
    <div className="w-full border-y-2 border-black bg-white py-2 md:py-3">
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        <div className="flex gap-4 px-4">
          {[...Array(4)].map((_, i) =>
            menuItems.map((item, index) => (
              <span
                key={`${i}-${index}`}
                className="text-base font-medium md:text-xl"
              >
                {item}
              </span>
            )),
          )}
        </div>
      </Marquee>
    </div>
  );
};
