import { motion } from "framer-motion";
import Image from "next/image";

export const BubblesUpperMotion = () => {
  const upperBubbles = [
    { top: "-10px", left: "-40px" },
    { top: "-10px", left: "-10px" },
    { top: "-10px", left: "20px" },
    { top: "-10px", left: "50px" },
  ];
  return (
    <>
      {upperBubbles.map((bubble, index) => (
        <motion.div
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
          style={{
            position: "absolute",
            top: bubble.top,
            right: bubble.left,
          }}
        >
          <Image
            src="/Fishing/bubble-single2.svg"
            alt="装飾"
            width={60}
            height={60}
            className="z-20 md:h-[120px] md:w-[120px]"
          />
        </motion.div>
      ))}
    </>
  );
};
