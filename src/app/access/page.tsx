import Image from "next/image";

export default function Access() {
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-cyan-200 to-cyan-400">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-12 text-3xl font-bold">アクセス</h1>

        <div className="mx-auto max-w-4xl">
          {/* 住所情報 */}
          <div className="mb-8">
            <p className="text-lg">〒509-3112</p>
            <p className="text-lg">岐阜県下呂市小坂町大島2340-5</p>
            <p className="text-lg">小坂町漁業協同組合直営部門</p>
          </div>

          {/* Google Map */}
          <div className="relative mb-12 h-96 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3231.6223535685845!2d137.3141063!3d35.9072638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6002cf5235d24655%3A0xf83c14ef6c3795a4!2z5bed44Gu5a6244GK44GV44GL77yIUklWRVIgSE9VU0UgT1NBS0Eg77yJ!5e0!3m2!1sja!2sjp!4v1738715575565!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 rounded-lg"
            />
          </div>

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
              <p className="mb-4 text-lg font-bold text-blue-600">
                大丈夫です！
              </p>
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
      </div>

      {/* 波のデザイン */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="h-24 w-full"
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,74L1360,74C1280,74,1120,74,960,74C800,74,640,74,480,74C320,74,160,74,80,74L0,74Z"
            fill="#0099ff"
          />
        </svg>
      </div>
    </main>
  );
}
