"use client";

import { LogoLink2 } from "../_components/common/LogoLink2";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    inquiryType: ["ご予約について"],
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("送信に失敗しました");
      }

      toast.success("お問い合わせを送信しました");
      setFormData({
        inquiryType: ["ご予約について"],
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast.error("エラーが発生しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckbox = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      inquiryType: prev.inquiryType.includes(value)
        ? prev.inquiryType.filter((type) => type !== value)
        : [...prev.inquiryType, value],
    }));
  };

  return (
    <main className="min-h-screen w-full bg-gradient-main">
      <LogoLink2 />
      <div className="container mx-auto px-4 py-8">
        {/* タイトル */}
        <div className="mb-8">
          <h1 className="mb-2 font-shippori-antique-b1 text-2xl md:text-3xl lg:text-4xl">
            お問い合わせ
          </h1>
          <p className="font-shippori-antique-b1 text-4xl md:text-6xl lg:text-8xl">
            CONTACT
          </p>
        </div>

        {/* テキスト */}
        <div className="mx-auto max-w-4xl">
          <p className="mb-8 text-lg">
            ご予約に関する質問や協業のご依頼、取材に関するご質問など、下記フォームよりお気軽にお問い合わせください。
            後ほど、担当者よりご連絡させていただきます。
          </p>

          <form
            onSubmit={handleSubmit}
            className="rounded-lg bg-transparent p-8"
          >
            {/* お問い合わせ種別 */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-4">
                {[
                  "ご予約について",
                  "施設依頼",
                  "取材について",
                  "その他のお問い合わせ",
                ].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 size-6"
                      checked={formData.inquiryType.includes(type)}
                      onChange={() => handleCheckbox(type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* お名前 */}
            <div className="mb-6">
              <label className="mb-2 block">
                <span className="text-lg">お名前</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="山田太郎"
                className="w-full border-b-2 border-gray-300 bg-transparent p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* メールアドレス */}
            <div className="mb-6">
              <label className="mb-2 block">
                <span className="text-lg">メールアドレス</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="info@river.house.osaka.com"
                className="w-full border-b-2 border-gray-300 bg-transparent p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* 電話番号 */}
            <div className="mb-6">
              <label className="mb-2 block">
                <span className="text-lg">電話番号</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="0000-0000-0000"
                className="w-full border-b-2 border-gray-300 bg-transparent p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* お問い合わせ内容 */}
            <div className="mb-8">
              <label className="mb-2 block">
                <span className="text-lg">お問い合わせ内容</span>
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                rows={6}
                className="w-full rounded-[20px] border-2 border-black p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* 送信ボタン */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-blue-500 px-8 py-3 text-white transition-colors disabled:opacity-50 hover:bg-blue-600"
              >
                <span className="text-lg">
                  {isSubmitting ? "送信中..." : "送信する"}
                </span>
                <span className="ml-2">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
