"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loading: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // 2秒後にローディング画面を閉じる

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        >
          <h1>ローディング中...</h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
