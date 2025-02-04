import { motion } from "framer-motion";

const bubbleAnimation = {
  initial: { y: 50, opacity: 0, scale: 0.8 },
  animate: (custom: number) => ({
    y: [50, -window.innerHeight],
    opacity: [0, 1, 1, 0],
    scale: [0.8, 1, 1.1, 1],
    transition: {
      duration: custom,
      times: [0, 0.1, 0.9, 1],
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

const floatAnimation = {
  animate: {
    x: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const Bubbles: React.FC = () => {
  const bubbles = [
    { size: "h-16 w-16", left: "10%", top: "20%", delay: 0.5, duration: 8 },
    { size: "h-12 w-12", right: "15%", top: "30%", delay: 2, duration: 10 },
    { size: "h-20 w-20", left: "20%", top: "50%", delay: 1, duration: 9 },
    {
      size: "h-20 w-20",
      left: "10%",
      top: "50%",
      delay: 3,
      duration: 11,
      white: true,
    },
    { size: "h-14 w-14", right: "25%", top: "40%", delay: 4, duration: 8.5 },
    { size: "h-10 w-10", left: "30%", top: "60%", delay: 2.5, duration: 9.5 },
    { size: "h-16 w-16", right: "35%", top: "70%", delay: 1.5, duration: 10.5 },
    {
      size: "h-8 w-8",
      left: "40%",
      top: "80%",
      delay: 3.5,
      duration: 8.8,
      white: true,
    },
    { size: "h-12 w-12", right: "45%", top: "25%", delay: 4.5, duration: 9.2 },
    { size: "h-18 w-18", left: "50%", top: "45%", delay: 2.8, duration: 10.2 },
  ];

  return (
    <div className="absolute inset-0">
      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className={`absolute ${bubble.size} rounded-full ${
            bubble.white ? "bg-white" : "bg-bubble-gradient"
          }`}
          style={{
            left: bubble.left,
            right: bubble.right,
            top: bubble.top,
          }}
          variants={bubbleAnimation}
          custom={bubble.duration}
          initial="initial"
          animate="animate"
          whileInView={floatAnimation.animate}
        />
      ))}
    </div>
  );
};
