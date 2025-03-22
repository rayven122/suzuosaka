import Link from "next/link";
import { LogoLink } from "../_components/common/LogoLink";

export default function Reservation() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden border-b-2 border-black bg-gradient-hero">
      <LogoLink />
      <div className="mx-auto py-8 md:py-16">
        {/* <div className="ml-4 mt-28 flex md:mt-60 lg:flex-row lg:justify-between lg:gap-10 xl:ml-60"> */}
        <div className="ml-4 mt-28 md:mt-60 xl:ml-60">
          {/* タイトルとテキスト */}
          <div className="mb-8">
            <h1 className="mb-2 font-shippori-antique-b1 text-2xl md:text-3xl lg:text-4xl">
              予約
            </h1>
            <p className="font-shippori-antique-b1 text-4xl md:text-6xl lg:text-7xl">
              RESERVATION
            </p>
          </div>
        </div>
        {/* 予約ガイド - コンパクトなステップ */}
        <div className="mx-4 mb-8 md:mx-8 lg:mx-auto lg:max-w-5xl">
          <div className="rounded-[20px] bg-white p-4 shadow-lg md:p-6">
            <h2 className="mb-4 text-center text-lg font-bold md:text-xl">
              予約方法
            </h2>
            <div className="flex flex-row justify-between gap-2">
              <div className="flex flex-1 items-center">
                <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white md:h-10 md:w-10 md:text-base">
                  1
                </div>
                <div>
                  <h3 className="text-xs font-bold md:text-sm">日時選択</h3>
                  <p className="hidden text-xs text-gray-600 md:block">
                    希望日時を選択
                  </p>
                </div>
              </div>
              <div className="flex flex-1 items-center">
                <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white md:h-10 md:w-10 md:text-base">
                  2
                </div>
                <div>
                  <h3 className="text-xs font-bold md:text-sm">情報入力</h3>
                  <p className="hidden text-xs text-gray-600 md:block">
                    必要事項を入力
                  </p>
                </div>
              </div>
              <div className="flex flex-1 items-center">
                <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white md:h-10 md:w-10 md:text-base">
                  3
                </div>
                <div>
                  <h3 className="text-xs font-bold md:text-sm">予約完了</h3>
                  <p className="hidden text-xs text-gray-600 md:block">
                    メールで確認
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 予約フォーム */}
        <div className="mx-4 mt-6 md:mx-8 lg:mx-auto lg:max-w-5xl">
          <div className="mb-12 rounded-[20px] shadow-lg ">
            <h2 className="sr-only mb-4 text-center text-xl font-bold md:text-2xl">
              釣り体験のご予約はこちらから
            </h2>

            <div
              className="relative overflow-hidden rounded-lg"
              style={{ height: "900px" }}
            >
              <iframe
                src="//airrsv.net/osakano-osakana-village/calendar/embed/"
                width="100%"
                height="1250px"
                className="absolute left-0 top-[-250px] w-full"
              />
            </div>
          </div>
        </div>

        {/* 問い合わせ先 */}
        <div className="mb-8 flex justify-center">
          <div className="text-center">
            <p className="mb-2 text-base md:text-lg">
              ご不明な点はお電話またはお問い合わせフォームから
            </p>
            <p className="mb-3 text-xl font-bold md:text-2xl">
              TEL: 0576-62-3045
            </p>
            <p className="mb-4 text-sm text-gray-700">受付時間: 9:00〜17:00</p>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-white px-6 py-2 text-sm font-bold text-primary shadow-md transition-all hover:bg-primary hover:text-white md:px-8 md:py-3 md:text-base"
            >
              お問い合わせフォームへ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
