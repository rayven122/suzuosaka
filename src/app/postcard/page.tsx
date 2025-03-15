// src/app/postcard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PostcardPage() {
  const router = useRouter();

  useEffect(() => {
    // Googleタグマネージャーのデータレイヤーイベントをプッシュしてトラッキング
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "postcard_redirect",
        event_category: "navigation",
        event_action: "redirect",
        event_label: "postcard_to_home",
      });
    }

    // 少し遅延させてGTMがデータを送信する時間を確保
    setTimeout(() => {
      // ホームページにリダイレクト
      router.push("/");
    }, 300); // 300ミリ秒の遅延
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-gradient-main">
      {/* ロゴ */}
      <Image
        src="/common/logo-horizontal.svg"
        alt="ロゴ"
        width={400}
        height={400}
      />
    </div>
  );
}
