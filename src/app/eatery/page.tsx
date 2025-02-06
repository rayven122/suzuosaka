import Image from "next/image";

export default function Eatery() {
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-cyan-200 to-cyan-400">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-12 text-3xl font-bold">食堂</h1>

        <div className="mx-auto max-w-4xl">
          {/* メインビジュアル */}
          <div className="relative mb-12 h-96">
            <Image
              src="/images/eatery-hero.jpg"
              alt="食堂の様子"
              fill
              className="rounded-lg object-cover"
            />
            <div className="absolute right-4 top-4 rounded-lg bg-white/90 p-4">
              <p className="text-lg font-bold">雰囲気良し、釣って良し</p>
              <p className="text-sm">食べてさらに良し！</p>
            </div>
          </div>

          {/* 説明文 */}
          <div className="mb-12">
            <p className="mb-4 text-lg">
              あなたの釣った川魚の調理がおまかせもしれない？
              美しい水で育った新鮮な魚の天ぷらをはじめ、
              中塩焼、時雨なども含めた調理も環境になります。
            </p>
          </div>

          {/* メニュー */}
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white/80 p-6 text-center">
              <h3 className="mb-4 text-xl">魚づくし定食</h3>
              <div className="relative mb-4 h-48">
                <Image
                  src="/images/menu-1.jpg"
                  alt="魚づくし定食"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <p className="text-2xl font-bold">2,500円</p>
            </div>
            <div className="rounded-lg bg-white/80 p-6 text-center">
              <h3 className="mb-4 text-xl">魚の塩焼き天ぷら定食</h3>
              <div className="relative mb-4 h-48">
                <Image
                  src="/images/menu-2.jpg"
                  alt="魚の塩焼き天ぷら定食"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <p className="text-2xl font-bold">2,000円</p>
            </div>
            <div className="rounded-lg bg-white/80 p-6 text-center">
              <h3 className="mb-4 text-xl">いわな天丼定食</h3>
              <div className="relative mb-4 h-48">
                <Image
                  src="/images/menu-3.jpg"
                  alt="いわな天丼定食"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <p className="text-2xl font-bold">1,600円</p>
            </div>
            <div className="rounded-lg bg-white/80 p-6 text-center">
              <h3 className="mb-4 text-xl">魚の天ぷら</h3>
              <div className="relative mb-4 h-48">
                <Image
                  src="/images/menu-4.jpg"
                  alt="魚の天ぷら"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <p className="text-2xl font-bold">1,600円</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
