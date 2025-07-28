"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LogoLink2 } from "../_components/common/LogoLink2";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { MailIcon, PhoneIcon, UserIcon, MessageSquareIcon } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    inquiryType: "ご予約について",
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
        inquiryType: "ご予約について",
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

  const handleInquiryTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      inquiryType: value,
    }));
  };

  const inquiryTypes = [
    { value: "ご予約について", icon: "🎣" },
    { value: "施設依頼", icon: "🏠" },
    { value: "取材について", icon: "📰" },
    { value: "その他のお問い合わせ", icon: "💬" },
  ];

  return (
    <main className="min-h-screen w-full bg-gradient-main px-4 py-8 sm:px-6 lg:px-8">
      <LogoLink2 />
      <div className="container mx-auto max-w-4xl">
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <p className="text-base font-semibold md:text-2xl">CONTACT</p>
          <h1 className="mb-4 font-shippori-antique-b1 text-3xl font-medium md:text-5xl">
            お問い合わせ
          </h1>
          <p className="max-w-2xl text-gray-700">
            ご予約に関する質問や協業のご依頼、取材に関するご質問など、
            下記フォームよりお気軽にお問い合わせください。
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* お問い合わせ種別 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-[20px] border-2 border-black bg-white p-6 shadow-lg"
          >
            <h2 className="mb-4 flex items-center gap-2 font-shippori-antique-b1 text-xl font-bold">
              <span className="rounded-full bg-primary p-2 text-white">
                <MessageSquareIcon className="h-4 w-4" />
              </span>
              お問い合わせ種別
            </h2>
            
            {/* モバイル: 横スクロール */}
            <div className="block sm:hidden">
              <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
                {inquiryTypes.map((type, index) => (
                  <motion.label
                    key={type.value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    className={`group relative flex cursor-pointer flex-shrink-0 items-center gap-3 rounded-full border-2 border-black p-3 transition-all hover:shadow-md ${
                      formData.inquiryType === type.value
                        ? "bg-primary-dark text-white"
                        : "bg-white hover:border-primary"
                    }`}
                  >
                    <input
                      type="radio"
                      name="inquiryType"
                      value={type.value}
                      className="sr-only"
                      checked={formData.inquiryType === type.value}
                      onChange={() => handleInquiryTypeChange(type.value)}
                    />
                    <span className="text-lg">{type.icon}</span>
                    <span className="text-sm font-medium whitespace-nowrap">{type.value}</span>
                    {formData.inquiryType === type.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3"
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.label>
                ))}
              </div>
            </div>

            {/* PC: グリッドレイアウト */}
            <div className="hidden sm:grid sm:grid-cols-2 sm:gap-3">
              {inquiryTypes.map((type, index) => (
                <motion.label
                  key={type.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  className={`group relative flex cursor-pointer items-center gap-3 rounded-full border-2 border-black p-3 transition-all hover:shadow-md ${
                    formData.inquiryType === type.value
                      ? "bg-primary-dark text-white"
                      : "bg-white hover:border-primary"
                  }`}
                >
                  <input
                    type="radio"
                    name="inquiryType"
                    value={type.value}
                    className="sr-only"
                    checked={formData.inquiryType === type.value}
                    onChange={() => handleInquiryTypeChange(type.value)}
                  />
                  <span className="text-lg">{type.icon}</span>
                  <span className="text-sm font-medium">{type.value}</span>
                  {formData.inquiryType === type.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.label>
              ))}
            </div>
          </motion.div>

          {/* 基本情報 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-[20px] border-2 border-black bg-white p-6 shadow-lg"
          >
            <h2 className="mb-6 font-shippori-antique-b1 text-xl font-bold">
              お客様情報
            </h2>
            
            <div className="space-y-6">
              {/* お名前 */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <UserIcon className="h-4 w-4 text-primary" />
                  お名前
                  <span className="text-xs text-red-500">*必須</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="山田太郎"
                  className="w-full rounded-[12px] border-2 border-gray-300 bg-gray-50 p-3 transition-all focus:border-primary focus:bg-white focus:outline-none"
                />
              </div>

              {/* メールアドレス */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <MailIcon className="h-4 w-4 text-primary" />
                  メールアドレス
                  <span className="text-xs text-red-500">*必須</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="example@email.com"
                  className="w-full rounded-[12px] border-2 border-gray-300 bg-gray-50 p-3 transition-all focus:border-primary focus:bg-white focus:outline-none"
                />
              </div>

              {/* 電話番号 */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <PhoneIcon className="h-4 w-4 text-primary" />
                  電話番号
                  <span className="text-xs text-red-500">*必須</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="090-1234-5678"
                  className="w-full rounded-[12px] border-2 border-gray-300 bg-gray-50 p-3 transition-all focus:border-primary focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </motion.div>

          {/* お問い合わせ内容 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-[20px] border-2 border-black bg-white p-6 shadow-lg"
          >
            <h2 className="mb-4 font-shippori-antique-b1 text-xl font-bold">
              お問い合わせ内容
            </h2>
            <textarea
              required
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              placeholder="お問い合わせ内容をご記入ください"
              rows={6}
              className="w-full rounded-[12px] border-2 border-gray-300 bg-gray-50 p-4 transition-all focus:border-primary focus:bg-white focus:outline-none"
            />
          </motion.div>

          {/* 送信ボタン */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 rounded-full border-2 border-black bg-primary px-8 py-4 font-bold text-white shadow-lg transition-all disabled:opacity-50 hover:bg-primary-dark hover:shadow-xl"
            >
              <span className="text-lg">
                {isSubmitting ? "送信中..." : "送信する"}
              </span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="grid place-items-center rounded-full border-2 border-white bg-white/20 p-2"
              >
                <Image
                  src="/common/arrow.svg"
                  alt="矢印"
                  width={16}
                  height={16}
                  className="brightness-0 invert"
                />
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.form>

        {/* 装飾的な要素 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pointer-events-none fixed bottom-10 right-10 hidden lg:block"
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Image
              src="/common/bubble-single.svg"
              alt="装飾"
              width={80}
              height={80}
              className="opacity-30"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* カスタムスタイル */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
