"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ArrowUp } from "lucide-react";
import { Map } from "./Map";
import { Faq } from "./Faq";
import { useState, useEffect, SetStateAction } from "react";
import { LogoLink } from "@/app/_components/common/LogoLink";

export const FacilityInfo = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("faq");

  // スクロール位置を検知して「トップに戻る」ボタンの表示を制御
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // トップに戻る関数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // タブ切り替え時にスクロール位置をタブ上部に移動
  const handleTabChange = (value: SetStateAction<string>) => {
    setActiveTab(value);
    // タブコンテンツの位置にスクロール
    const tabsElement = document.querySelector(".tabs-container");
    if (tabsElement) {
      const yOffset = -20; // 少し上にオフセット
      const y =
        tabsElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#00e3cb] font-sans">
      {/* モバイルでも安定したヘッダー */}
      <LogoLink />

      {/* メインコンテンツ */}
      <main className="container relative z-10 mx-auto mb-20 px-4 pb-6 pt-20 md:mb-0 md:pb-12 md:pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center md:mb-12">
            <h1 className="mb-3 text-3xl font-bold text-black md:mb-4 md:text-4xl lg:text-6xl">
              施設情報
            </h1>
            <div className="mx-auto h-1 w-32 bg-black md:w-40"></div>
          </div>

          <div className="tabs-container">
            <Tabs
              defaultValue="faq"
              className="w-full"
              value={activeTab}
              onValueChange={handleTabChange}
            >
              <TabsList className="sticky top-[72px] z-40 mb-6 grid w-full grid-cols-2 rounded-full bg-white/30 p-1 backdrop-blur-sm md:top-[88px] md:mb-8">
                <TabsTrigger
                  value="faq"
                  className="items-center rounded-full py-2 text-base font-bold text-gray-600 data-[state=active]:bg-sky-400 data-[state=active]:text-white md:py-3 md:text-lg"
                >
                  <div className="flex items-center justify-center">
                    <h2 className="font-bold"> 釣り体験FAQ</h2>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="map"
                  className="rounded-full py-2 text-base font-bold text-gray-600 data-[state=active]:bg-sky-400 data-[state=active]:text-white md:py-3 md:text-lg"
                >
                  <div className="flex items-center justify-center">
                    <h2 className="font-bold">施設マップ</h2>
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="faq"
                className="mt-0 focus-visible:outline-none focus-visible:ring-0"
              >
                <Faq />
              </TabsContent>

              <TabsContent
                value="map"
                className="mt-0 focus-visible:outline-none focus-visible:ring-0"
              >
                <Map />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* トップに戻るボタン */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg transition-opacity duration-300 ${
          isScrolled
            ? "opacity-90 hover:opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-label="トップに戻る"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
};
