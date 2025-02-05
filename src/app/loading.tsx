"use client";
import Image from "next/image";

export default function Loading() {
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
