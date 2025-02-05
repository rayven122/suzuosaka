import Image from "next/image";

export default function Reservation() {
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-cyan-200 to-cyan-400">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-12 text-3xl font-bold">ご予約</h1>

        <div className="mx-auto max-w-4xl">
          <p className="mb-8 text-lg">
            釣り体験および食堂のご予約は、下記フォームよりお申し込みください。
            ご予約内容を確認後、担当者よりご連絡させていただきます。
          </p>

          {/* Airリザーブ埋め込み */}
          <div className="rounded-lg bg-white/80 p-8">
            <iframe
              src="//airrsv.net/osakano-osakana-village/calendar/embed/"
              width="100%"
              height="800px"
              frameBorder="0"
              className="rounded-lg"
            />
          </div>

          {/* 注意事項 */}
          <div className="mt-12 rounded-lg bg-white/80 p-8">
            <h2 className="mb-6 text-xl font-bold">ご予約に関する注意事項</h2>
            <ul className="list-disc space-y-4 pl-6">
              <li>ご予約は2名様から承ります。</li>
              <li>
                天候や河川の状況により、やむを得ず営業を中止する場合がございます。
              </li>
              <li>キャンセルは3日前までにご連絡ください。</li>
              <li>
                当日のキャンセルはキャンセル料が発生する場合がございます。
              </li>
              <li>お子様連れの場合は、必ず保護者の方が同伴してください。</li>
            </ul>
          </div>

          {/* 問い合わせ先 */}
          <div className="mt-8 text-center">
            <p className="mb-2 text-lg">
              ご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
            <p className="text-2xl font-bold">TEL: 0576-62-3045</p>
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
