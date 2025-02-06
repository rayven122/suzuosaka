"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { INSTAGRAM_URL } from "@/constants/sns";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: "TOP", label: "トップ", href: "/" },
    // { title: "ABOUT", label: "おさかとは？", href: "/#brand-story" },
    { title: "FISHING", label: "釣り", href: "/fishing" },
    // { title: "EATERY", label: "食堂", href: "/#eatery" },
    // { title: "NEWS", label: "お知らせ", href: "/#news" },
    { title: "RESERVATION", label: "予約", href: "/reservation" },
    { title: "ACCESS", label: "アクセス", href: "/#access" },
    { title: "CONTACT", label: "お問い合わせ", href: "/contact" },
  ];

  return (
    <div className="relative overflow-hidden">
      <nav className="fixed -right-5 -top-5 z-50">
        <motion.button
          onClick={() => setIsOpen(true)}
          className="grid size-[90px] place-items-center rounded-full border-2 border-black p-2 transition-colors hover:bg-primary md:size-[120px]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center gap-1 pt-2 md:pt-3">
            <Image
              src="/common/menu.svg"
              alt="menu"
              width={45}
              height={25}
              className="h-[20px] w-[32px] md:h-[25px] md:w-[45px]"
            />
            <span className="text-[10px] font-bold md:text-sm">MENU</span>
          </div>
        </motion.button>
      </nav>

      {/* ナビゲーションモーダル */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex w-full flex-col bg-white"
          >
            {/* 閉じるボタン */}
            <div className="absolute -right-5 -top-5 z-10">
              <motion.button
                onClick={() => setIsOpen(false)}
                className="grid size-[90px] place-items-center rounded-full border-2 border-black bg-primary p-2 md:size-[120px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center gap-1 pt-2 md:pt-3">
                  <Image
                    src="/common/menu.svg"
                    alt="menu"
                    width={45}
                    height={25}
                    className="h-[20px] w-[32px] md:h-[25px] md:w-[45px]"
                  />
                  <span className="text-[10px] font-bold md:text-sm">
                    CLOSE
                  </span>
                </div>
              </motion.button>

              {/* モバイル用 */}
              <div className="mt-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="transition-transform"
                >
                  <Link
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 md:hidden"
                  >
                    <FaInstagram className="text-3xl" />
                    <span className="text-xl [writing-mode:vertical-rl]">
                      @river_house_osaka
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
            <div className="flex h-screen flex-col px-[60px] md:px-[100px]">
              {/* メインメニュー */}
              <div className="flex flex-1 flex-col justify-center">
                <div className="grid gap-8 md:grid-cols-2 md:gap-x-24 md:gap-y-12 xl:gap-x-28 xl:gap-y-16">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex flex-col items-start"
                      >
                        <span className="text-base tracking-wider transition-colors group-hover:text-primary md:text-lg">
                          {item.title}
                        </span>
                        <span className="text-2xl font-bold transition-transform group-hover:translate-x-2 md:text-3xl">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* <div className="mt-20 hidden md:flex">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Link
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 transition-colors hover:text-primary"
                    >
                      <FaInstagram className="text-3xl" />
                      <span className="text-xl">@river_house_osaka</span>
                    </Link>
                  </motion.div>
                </div> */}
              </div>
            </div>

            {/* 泡 */}
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-4 left-0 w-full xl:-top-10"
            >
              <Image
                src="/common/bubble2.svg"
                alt="泡"
                width={200}
                height={80}
                className="w-full"
              />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-6 left-0 w-full xl:-bottom-10"
            >
              <Image
                src="/common/bubble.svg"
                alt="泡"
                width={200}
                height={80}
                className="w-full"
              />
            </motion.div>

            {/* コピーライト */}
            <span className="absolute bottom-2 right-2 border-2 border-black bg-white text-xs">
              ©︎ 2024. river house osaka
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
