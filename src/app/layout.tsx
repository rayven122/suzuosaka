import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";
import { Navigation } from "./_components/Navigation";
import { Shippori_Antique_B1 } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const font = Noto_Sans({ subsets: ["latin"] });

const shipporiAntiqueB1 = Shippori_Antique_B1({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-shippori-antique-b1",
});

export const metadata: Metadata = {
  title: "川の家おさか ~RIVER HOUSE OSAKA~",
  description:
    "川の家おさかは、岐阜県下呂市小坂町の大洞川のほとりにある、川魚に特化したレジャー施設です。霊峰御嶽山の清流で育った魚を使った釣り体験や、その場で調理して味わえる新鮮な川魚料理を提供しています。自然豊かな環境で、池釣りや渓流釣りを楽しめ、ファミリーやカップルに人気のスポットです。",
  metadataBase: new URL("https://www.suzu-osaka.com"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: { images: "/ogp.png" },
};

const GTM_ID = "GTM-5T5JVT5Q";

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
        <GoogleTagManager gtmId={GTM_ID} />
        <Toaster />
        <SpeedInsights />
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
