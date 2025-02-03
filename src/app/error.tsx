"use client";
import { useEffect } from "react";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex h-screen flex-col items-center justify-center p-10">
      <h1 className="text-center text-4xl font-bold">
        ページにエラーが<span className="inline-block">発生しました</span>
      </h1>
      <button onClick={reset} className="mt-10" type="button">
        Reset
      </button>
    </div>
  );
}
