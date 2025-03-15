// src/app/postcard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PostcardPage() {
  const router = useRouter();

  useEffect(() => {
    // dataLayerが定義されていない場合は初期化
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];

      // リダイレクトイベントをdataLayerにプッシュ
      window.dataLayer.push({
        event: "postcard_redirect",
        event_category: "navigation",
        event_action: "redirect",
        event_label: "postcard_to_home",
      });

      // コンソールに情報を出力（デバッグ用）
      if (process.env.NODE_ENV === "development") {
        console.log("Postcard redirect event pushed to dataLayer");
      }
    }

    // イベントが処理される時間を確保するため遅延させてからリダイレクト
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 500);

    // クリーンアップ関数
    return () => clearTimeout(redirectTimer);
  }, [router]);

  // ロード中の表示
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
