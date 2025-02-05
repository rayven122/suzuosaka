import Image from "next/image";

export default function Contact() {
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-cyan-200 to-cyan-400">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-12 text-3xl font-bold">お問い合わせ</h1>

        <div className="mx-auto max-w-4xl">
          <p className="mb-8 text-lg">
            ご予約や施設のご確認、取材に関するご質問など、下記フォームよりお気軽にお問い合わせください。
            後ほど、担当者よりご連絡させていただきます。
          </p>

          <form className="rounded-lg bg-white/80 p-8">
            {/* お問い合わせ種別 */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" checked />
                  <span>ご予約</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>施設依頼</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>取材について</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>その他のお問い合わせ</span>
                </label>
              </div>
            </div>

            {/* お名前 */}
            <div className="mb-6">
              <label className="mb-2 block">
                <span className="text-lg">お名前</span>
              </label>
              <input
                type="text"
                placeholder="山田太郎"
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            {/* メールアドレス */}
            <div className="mb-6">
              <label className="mb-2 block">
                <span className="text-lg">メールアドレス</span>
              </label>
              <input
                type="email"
                placeholder="info@river.house.osaka.com"
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            {/* 電話番号 */}
            <div className="mb-6">
              <label className="mb-2 block">
                <span className="text-lg">電話番号</span>
              </label>
              <input
                type="tel"
                placeholder="0000-0000-0000"
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            {/* お問い合わせ内容 */}
            <div className="mb-8">
              <label className="mb-2 block">
                <span className="text-lg">お問い合わせ内容</span>
              </label>
              <textarea
                rows={6}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            {/* 送信ボタン */}
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 px-8 py-3 text-white transition-colors hover:bg-blue-600"
              >
                <span className="text-lg">送信する</span>
                <span className="ml-2">→</span>
              </button>
            </div>
          </form>
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
