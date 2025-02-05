import Image from "next/image";

export default function About() {
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-cyan-200 to-cyan-400">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-3xl font-bold">おさかとは？</h1>

        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <p className="mb-6 text-lg">
              飛騨小坂は霊峰御嶽山の恵みを受け、200以上の滝と透明度の高い清流が流れる豊かな町です。
            </p>
            <p className="mb-6 text-lg">
              そこに住む私たちは太古の昔からあまご、いわなが豊富に泳ぎ回り現在も種苗しております。この環境の中でまで、いわな、にじますの養殖を65年続けています。この魚たちは技術から全て小坂で生産され、健康で生き生きとした魚は食べても臭みもなくて一切の薬剤を使用しなくても安心して飼育され食べられます。
            </p>
            <p className="mb-6 text-lg">
              この地で釣り体験を楽しみ美味しい魚たちの料理を味わってください。環境の美しさと相まってきっと満足して頂けると思います。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative h-64">
              <Image
                src="/images/about-1.jpg"
                alt="川の様子"
                fill
                className="rounded-lg object-cover"
              />
              <div className="absolute right-2 top-2 font-bold text-white">
                川は面白い！！
              </div>
            </div>
            <div className="relative h-64">
              <Image
                src="/images/about-2.jpg"
                alt="釣りの様子"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="relative h-64">
              <Image
                src="/images/about-3.jpg"
                alt="店内の様子"
                fill
                className="rounded-lg object-cover"
              />
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
