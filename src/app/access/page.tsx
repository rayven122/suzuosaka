"use client";
import Image from "next/image";
import { LogoLink } from "../_components/common/LogoLink";
import { motion } from "framer-motion";

export default function Access() {
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-cyan-200 to-cyan-400">
      <LogoLink />
      <div className="mx-auto py-8 md:py-16">
        <div className="ml-4 mt-28 md:mt-60 xl:ml-60">
          {/* タイトルとテキスト */}
          <div className="mb-8 lg:mb-0">
            <p className="mb-2 font-shippori-antique-b1 text-2xl md:text-3xl lg:text-4xl">
              ACCESS
            </p>
            <h1 className="font-shippori-antique-b1 text-4xl md:text-6xl lg:text-8xl">
              アクセス
            </h1>
          </div>
          {/* 住所情報 */}
          <div className="mt-20 font-shippori-antique-b1 text-2xl">
            <p className="text-lg">〒509-3112</p>
            <p className="text-lg">岐阜県下呂市小坂町大島2340-5</p>
            <p className="text-lg">小坂町漁業協同組合直営部門</p>
          </div>

          {/* Google Map */}
          <div className="relative my-12 h-[300px] w-full md:h-[400px] xl:h-[700px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3231.6223535685845!2d137.3141063!3d35.9072638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6002cf5235d24655%3A0xf83c14ef6c3795a4!2z5bed44Gu5a6244GK44GV44GL77yIUklWRVIgSE9VU0UgT1NBS0Eg77yJ!5e0!3m2!1sja!2sjp!4v1738715575565!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 rounded-l-[20px]"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        {/* お越しになる皆様へ */}
        <div className="rounded-lg bg-white/80 p-8">
          <h2 className="mb-6 text-2xl font-bold">お越しになる皆様へ</h2>
          <div className="mb-6">
            <h3 className="mb-4 text-xl font-bold">
              カーナビを最後まで信じてきてください！
            </h3>
            <p className="mb-2 text-lg">お越しになるお客様より時折、</p>
            <p className="mb-4 text-lg">
              「辿り着くまでに3回くらい不安になった」
            </p>
            <p className="mb-4 text-lg">との声をいただきます。</p>
            <p className="mb-4 text-lg font-bold text-blue-600">大丈夫です！</p>
            <p className="text-lg">
              ちゃんと辿り着きますので不安になっても
              ナビを信じて進んでいただけましたら嬉しいです。
              心が折れそうになったらお話しください！
            </p>
          </div>
          <div className="text-center">
            <p className="mb-4 text-2xl font-bold">TEL 0576-62-3045</p>
          </div>
        </div>
      </div>
    </main>
  );
}
