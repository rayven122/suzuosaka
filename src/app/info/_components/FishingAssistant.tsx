"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Send,
  ArrowLeft,
  Bot,
  X,
  Sparkles,
  MessageCircle,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

type Language = "ja" | "en";

// 推奨質問のリスト - 言語ごとに定義
const suggestedQuestions = {
  ja: [
    "釣り針を魚から外す方法を教えてください",
    "根掛かりした場合どうすれば良いですか？",
    "餌がなくなりました。どうすれば良いですか？",
  ],
  en: [
    "How do I remove a fishing hook from a fish?",
    "What should I do if my hook gets stuck?",
    "I've run out of bait. What should I do?",
  ],
};

// 初期メッセージ - 言語ごとに定義
const initialMessages = {
  ja: {
    id: "1",
    content:
      "こんにちは！釣り体験についてのご質問にお答えします。何かお手伝いできることはありますか？",
    role: "assistant" as const,
    timestamp: new Date(),
  },
  en: {
    id: "1",
    content:
      "Hello! I'm here to answer your questions about the fishing experience. How can I help you today?",
    role: "assistant" as const,
    timestamp: new Date(),
  },
};

// テーマカラー - 暗めのブルーグリーン
const themeColors = {
  primary: "#0369a1", // 深いブルー
  secondary: "#38bdf8", // 明るめの水色
  dark: "#075985", // 濃いネイビー
  light: "#f0f9ff", // 淡いブルーホワイト
  text: "#FFFFFF", // 白テキスト
  textDark: "#1e293b", // ダークスレート
};

export const FishingAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([initialMessages.ja]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("ja");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 言語が変更されたときに初期メッセージを更新
  useEffect(() => {
    if (messages.length === 1) {
      setMessages([initialMessages[language]]);
    }
  }, [language, messages.length]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // テキストエリアの高さを自動調整
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [input]);

  // チャットモーダルを開いたときに入力フィールドにフォーカス
  useEffect(() => {
    if (showChat && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 300);
    }
  }, [showChat]);

  // 言語を切り替える関数
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ja" ? "en" : "ja"));
  };

  // プレースホルダーテキスト - 言語に応じて変更
  const getPlaceholderText = () => {
    return language === "ja"
      ? "質問を入力してください..."
      : "Type your question...";
  };

  // サポートリンクテキスト - 言語に応じて変更
  const getSupportText = () => {
    return language === "ja"
      ? "スタッフによるサポートが必要な場合は"
      : "Need staff assistance?";
  };

  // リンクテキスト - 言語に応じて変更
  const getLinkText = () => {
    return language === "ja" ? "こちら" : "Click here";
  };

  // チャットモーダルを閉じたときにチャットをリセットする
  const handleCloseChat = () => {
    setShowChat(false);
    // タイミングをずらして、モーダルが閉じた後にリセットする
    setTimeout(() => {
      setMessages([initialMessages[language]]);
      // 会話IDをリセットすることで新しい会話を開始
      localStorage.removeItem("dify_conversation_id");
    }, 300);
  };

  // Dify APIを使ってメッセージを送信する関数
  const sendMessageToDify = async (userMessage: string) => {
    try {
      setIsLoading(true);

      // Dify APIエンドポイントを修正 - 正しいパスは /chat-messages
      const apiEndpoint =
        process.env.NEXT_PUBLIC_DIFY_API_ENDPOINT ||
        "https://api.dify.ai/v1/chat-messages"; // ドキュメントに基づいて修正

      const apiKey = process.env.NEXT_PUBLIC_DIFY_API_KEY;

      if (!apiKey) {
        console.error("Dify API キーが設定されていません");
        return language === "ja"
          ? "システムエラー: API設定が不完全です。管理者にお問い合わせください。"
          : "System Error: API configuration is incomplete. Please contact the administrator.";
      }

      // デバッグ用のログ
      console.log("リクエスト送信:", {
        endpoint: apiEndpoint,
        query: userMessage,
        language: language,
        conversation_id:
          localStorage.getItem("dify_conversation_id") || undefined,
      });

      // ドキュメントに基づいたリクエスト形式
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          query: userMessage, // 正しいフォーマット: messagesではなくquery
          inputs: { language: language }, // 言語情報を入力変数として渡す
          response_mode: "blocking", // blocking または streaming
          conversation_id:
            localStorage.getItem("dify_conversation_id") || undefined,
          user: "website_user",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Dify API エラーレスポンス:", errorData);
        console.error("ステータスコード:", response.status);
        throw new Error(`APIリクエストに失敗しました: ${response.status}`);
      }

      const data = await response.json();
      console.log("API レスポンス:", data); // デバッグ用

      // レスポンス構造を確認
      let answer =
        language === "ja"
          ? "申し訳ありません、回答を生成できませんでした。"
          : "Sorry, I couldn't generate an answer.";

      if (data.answer) {
        answer = data.answer;
      } else if (data.message) {
        answer = data.message; // 一部のレスポンス形式では message として返される可能性がある
      }

      // 会話IDがある場合は保存
      if (data.conversation_id) {
        localStorage.setItem("dify_conversation_id", data.conversation_id);
      }

      return answer;
    } catch (error) {
      console.error("Dify API エラー:", error);
      return language === "ja"
        ? "申し訳ありません、技術的な問題が発生しました。スタッフにお声がけください。"
        : "Sorry, a technical issue occurred. Please contact our staff for assistance.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userInput = input.trim();
    // 送信前に入力をクリア
    setInput("");

    // テキストエリアの高さをリセット
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Dify APIを呼び出す
    const responseContent = await sendMessageToDify(userInput);

    // 応答メッセージを追加
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: responseContent,
      role: "assistant",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleSuggestedQuestion = async (question: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Dify APIを呼び出す
    const responseContent = await sendMessageToDify(question);

    // 応答メッセージを追加
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: responseContent,
      role: "assistant",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative">
      {/* Chat button - より目立つアニメーション付きボタン */}
      <AnimatePresence>
        {!showChat && (
          <motion.button
            onClick={() => setShowChat(true)}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-${themeColors.primary} to-${themeColors.dark} p-4 text-white shadow-lg hover:shadow-xl`}
            style={{
              background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.dark})`,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="h-6 w-6" />
            <span className="font-bold">
              {language === "ja" ? "釣りアシスタント" : "Fishing Assistant"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat interface */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="flex h-[600px] max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Chat header - グラデーションヘッダー */}
              <div
                className="flex items-center justify-between p-4 text-white"
                style={{
                  background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.dark})`,
                }}
              >
                <div className="flex items-center gap-2">
                  <Bot className="h-6 w-6" />
                  <div>
                    <h2 className="text-lg font-bold">
                      {language === "ja"
                        ? "釣り体験アシスタント"
                        : "Fishing Experience Assistant"}
                    </h2>
                    <p className="text-xs opacity-80">
                      {language === "ja" ? "AI サポート" : "AI Support"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* 言語切り替えボタン */}
                  <button
                    onClick={toggleLanguage}
                    className="rounded-full bg-white/20 p-2 transition-colors hover:bg-white/30"
                    aria-label={
                      language === "ja"
                        ? "Switch to English"
                        : "日本語に切り替え"
                    }
                    title={
                      language === "ja"
                        ? "Switch to English"
                        : "日本語に切り替え"
                    }
                  >
                    <Globe className="h-5 w-5" />
                  </button>
                  {/* 閉じるボタン */}
                  <button
                    onClick={handleCloseChat}
                    className="rounded-full bg-white/20 p-2 transition-colors hover:bg-white/30"
                    aria-label="Close chat"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Chat messages - 改良されたメッセージUI */}
              <div
                className="flex-1 overflow-y-auto p-4"
                style={{ backgroundColor: `${themeColors.light}` }}
              >
                <div className="space-y-4">
                  {/* メッセージ一覧 */}
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {message.role === "assistant" && (
                        <div
                          className="mr-2 flex h-8 w-8 items-center justify-center rounded-full text-white"
                          style={{
                            background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
                          }}
                        >
                          <Sparkles className="h-4 w-4" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] overflow-hidden rounded-2xl px-4 py-3 shadow-sm ${
                          message.role === "user"
                            ? "rounded-tr-none text-white"
                            : "rounded-tl-none bg-white"
                        }`}
                        style={{
                          backgroundColor:
                            message.role === "user"
                              ? themeColors.primary
                              : "white",
                          color:
                            message.role === "user"
                              ? "white"
                              : themeColors.textDark,
                        }}
                      >
                        <p className="whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>
                        <p className="mt-1 text-right text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* おすすめの質問ボタン - 改良UI */}
                  {messages.length === 1 && (
                    <motion.div
                      className="mt-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      <p
                        className="mb-2 font-medium"
                        style={{ color: themeColors.textDark }}
                      >
                        {language === "ja"
                          ? "よくある質問:"
                          : "Frequently asked questions:"}
                      </p>
                      <div className="flex flex-col gap-2">
                        {suggestedQuestions[language].map((question, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleSuggestedQuestion(question)}
                            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium shadow-sm transition-all hover:shadow-md"
                            style={{
                              color: themeColors.textDark,
                              borderColor: `${themeColors.secondary}30`,
                            }}
                            whileHover={{
                              scale: 1.01,
                              borderColor: themeColors.primary,
                              backgroundColor: `${themeColors.light}`,
                            }}
                            whileTap={{ scale: 0.99 }}
                          >
                            {question}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ローディングインジケーター - アニメーション改良 */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="ml-10 flex max-w-[70%] items-center space-x-3 rounded-2xl rounded-tl-none bg-white px-4 py-3 shadow-sm">
                        <div className="flex space-x-2">
                          <motion.div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: themeColors.primary }}
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              repeatType: "loop",
                            }}
                          />
                          <motion.div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: themeColors.primary }}
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                              duration: 0.6,
                              delay: 0.15,
                              repeat: Infinity,
                              repeatType: "loop",
                            }}
                          />
                          <motion.div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: themeColors.primary }}
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                              duration: 0.6,
                              delay: 0.3,
                              repeat: Infinity,
                              repeatType: "loop",
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-400">
                          {language === "ja" ? "考え中..." : "Thinking..."}
                        </span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input area - 改良された入力エリア */}
              <div className="border-t border-gray-200 bg-white p-3">
                <div className="flex items-end gap-2">
                  <div className="relative flex-1">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={getPlaceholderText()}
                      className={`h-12 max-h-32 min-h-12 w-full resize-none rounded-xl border bg-gray-50 p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-opacity-30 focus:ring-[${themeColors.primary}] focus:border-[${themeColors.primary}]`}
                      style={{
                        color: themeColors.textDark,
                        borderColor: `${themeColors.secondary}30`,
                      }}
                      rows={1}
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                      className="absolute bottom-2 right-2 rounded-full p-2 text-white shadow-sm transition-colors disabled:opacity-50 hover:shadow-md"
                      style={{
                        background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.dark})`,
                      }}
                      aria-label="Send message"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-center text-xs text-gray-400">
                  {getSupportText()}
                  <Link
                    href="/contact"
                    className="ml-1 font-medium underline transition-colors"
                    style={{ color: themeColors.primary }}
                  >
                    {getLinkText()}
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
