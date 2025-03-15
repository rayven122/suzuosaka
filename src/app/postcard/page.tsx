// postcard/page.tsx などのクライアントコンポーネントでGTMイベントを送信する場合
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PostcardPage() {
  const router = useRouter();

  useEffect(() => {
    // dataLayerが既に存在することを前提として利用
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "postcard_redirect",
        event_category: "navigation",
        event_action: "redirect",
        event_label: "postcard_to_home",
      });
    }

    setTimeout(() => {
      router.push("/");
    }, 500);
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
