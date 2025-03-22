"use client";
import React, { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";

interface NewsItem {
  id: string;
  publishedAt: string;
  title: string;
}

interface NewsPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  allNews: NewsItem[];
}

export default function NewsPagination({
  totalItems,
  itemsPerPage,
  allNews,
}: NewsPaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const totalPages: number = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number): void => {
    if (page === currentPage || page < 1 || page > totalPages) return;

    setIsLoading(true);

    window.scrollTo({ top: 0, behavior: "smooth" });

    setCurrentPage(page);

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const getCurrentPageNews = (): NewsItem[] => {
    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    return allNews.slice(startIndex, endIndex);
  };

  const getPageNumbers = (): number[] => {
    const MAX_VISIBLE_PAGES: number = 5;
    let startPage: number = Math.max(
      currentPage - Math.floor(MAX_VISIBLE_PAGES / 2),
      1,
    );
    let endPage: number = startPage + MAX_VISIBLE_PAGES - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - MAX_VISIBLE_PAGES + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };

  const displayedNews: NewsItem[] = getCurrentPageNews();

  return (
    <>
      {currentPage > 1 && !isLoading && (
        <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-xl bg-white/30 shadow-lg backdrop-blur-md">
          {displayedNews.map((news: NewsItem) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className="group block border-b border-white/40 px-6 py-5 transition-all hover:bg-black/20"
            >
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-sm">
                    {format(new Date(news.publishedAt), "yyyy/MM/dd")}
                  </div>
                  <h2 className="mt-2 text-lg font-bold text-white drop-shadow-sm sm:text-xl">
                    {news.title}
                  </h2>
                </div>
                <div className="mt-2 hidden rounded-full bg-white/30 p-2 text-xl text-white shadow-md transition-all group-hover:bg-primary group-hover:text-white sm:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-colors
            ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-400 text-gray-200"
                : "bg-white/50 text-white hover:bg-primary"
            }`}
          aria-label="前のページへ"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>

        {getPageNumbers().map((page: number) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={isLoading}
            className={`h-10 w-10 rounded-full font-bold shadow-md transition-colors
              ${
                page === currentPage
                  ? "bg-primary text-white"
                  : "bg-white/50 text-white hover:bg-white/70"
              }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-colors
            ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-400 text-gray-200"
                : "bg-white/50 text-white hover:bg-primary"
            }`}
          aria-label="次のページへ"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </div>

      {isLoading && (
        <div className="mt-4 text-center text-lg font-bold text-white drop-shadow-md">
          読み込み中...
        </div>
      )}
    </>
  );
}
