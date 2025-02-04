import { motion } from "framer-motion";
import Image from "next/image";

export const BubblesMotion = () => {
  const upperBubbles = [
    { top: "-10px", left: "-40px" },
    { top: "-10px", left: "-10px" },
    { top: "-10px", left: "20px" },
    { top: "-10px", left: "50px" },
  ];
  const underBubbles = [
    { bottom: "-70px", right: "53.47%" }, // 670 / 1440 * 100
    { bottom: "-70px", right: "42.36%" }, // 610 / 1440 * 100
    { bottom: "-70px", right: "38.19%" }, // 550 / 1440 * 100
    { bottom: "-70px", right: "34.03%" }, // 490 / 1440 * 100
    { bottom: "-70px", right: "29.86%" }, // 430 / 1440 * 100
    { bottom: "-70px", right: "25.69%" }, // 370 / 1440 * 100
    { bottom: "-70px", right: "21.53%" }, // 310 / 1440 * 100
    { bottom: "-70px", right: "17.36%" }, // 250 / 1440 * 100
    { bottom: "-20px", right: "13.19%" }, // 190 / 1440 * 100
    { bottom: "-20px", right: "9.03%" }, // 130 / 1440 * 100
    { bottom: "-20px", right: "4.86%" }, // 70 / 1440 * 100
    { bottom: "-20px", right: "0.69%" }, // 10 / 1440 * 100
    { bottom: "-20px", right: "-3.47%" }, // -50 / 1440 * 100
  ];

  return (
    <>
      {/* TODO:左上に表示に変更 */}
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
      {underBubbles.map((bubble, index) => (
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
            bottom: bubble.bottom,
            right: bubble.right,
          }}
        >
          <Image
            src="/Fishing/bubble-single.svg"
            alt="装飾"
            width={60}
            height={60}
            className="md:h-[120px] md:w-[120px]"
          />
        </motion.div>
      ))}
    </>
  );
};
