import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";
import { Navigation } from "./_components/Navigation";

const font = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "デバッグモンキーズ公式サイト｜ボードゲーム販売中！",
  description:
    "デバッグモンキーズは東京と福岡で活動しているボードゲーム制作団体です。代表作：エラロト / Qubism / ゾンビパニックとライフルおじさん / 鍋代官など",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: { images: "https://debug-monkeys.com/common/ogp.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${font.className} font-sans antialiased`}>
        {/* Popover（ヘッダーナビ）を開いている状態でPopoverコンテンツ外をクリックした時にPopoverが閉じないバグ対策用のdiv
         詳細: https://github.com/tailwindlabs/headlessui/issues/2752#issuecomment-1724096430 */}
        <div className="relative">
          <Navigation />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
