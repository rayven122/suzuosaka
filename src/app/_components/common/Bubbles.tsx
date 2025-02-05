"use client";

import { useEffect, useRef } from "react";

export const Bubbles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let bubbles: {
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
    }[] = [];
    const maxBubbles = 550;
    const spawnRate = 300;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createBubble = () => {
      if (bubbles.length < maxBubbles) {
        bubbles.push({
          x: Math.random() * canvas.width,
          y: canvas.height,
          radius: Math.random() * 20 + 10,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.2, // 透明度を低めに設定
        });
      }
    };

    const drawBubbles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((bubble, index) => {
        const { x, y, radius, opacity } = bubble;

        // 外側のぼかし
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity + 0.2})`);
        gradient.addColorStop(0.7, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(255, 255, 255, 0.5)`;
        ctx.fill();
        ctx.closePath();

        // ハイライト
        ctx.beginPath();
        ctx.arc(x - radius / 3, y - radius / 3, radius / 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
        ctx.fill();
        ctx.closePath();

        // 泡を上に移動
        bubble.y -= bubble.speed;

        // 画面外に出た泡を削除
        if (bubble.y + bubble.radius < 0) bubbles.splice(index, 1);
      });

      requestAnimationFrame(drawBubbles);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    const bubbleInterval = setInterval(createBubble, spawnRate);
    drawBubbles();

    return () => {
      clearInterval(bubbleInterval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-full w-full"
    />
  );
};
