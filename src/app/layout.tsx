import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";
import { Navigation } from "./_components/Navigation";
import { Shippori_Antique_B1 } from "next/font/google";

const font = Noto_Sans({ subsets: ["latin"] });

const shipporiAntiqueB1 = Shippori_Antique_B1({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-shippori-antique-b1",
});

export const metadata: Metadata = {
  title: "川の家おさか公式サイト",
  description: "川の家おさかは岐阜県下呂市にある、川の家おさかです。",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: { images: "/ogp.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${font.className} ${shipporiAntiqueB1.variable}`}
    >
      <body
        className={`${font.className} ${shipporiAntiqueB1.variable} font-sans antialiased`}
      >
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
