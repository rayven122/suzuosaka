"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PostcardPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // GTMが正しく設定されているか確認
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "postcard_redirect",
          event_category: "navigation",
          event_action: "redirect",
          event_label: "postcard_to_home",
        });
        console.log("Event pushed to dataLayer"); // デバッグ用
      } else {
        console.error("dataLayer not found"); // デバッグ用
      }
    }

    const timer = setTimeout(() => {
      router.push("/");
    }, 500);

    return () => clearTimeout(timer);
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
