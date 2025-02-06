import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border-b border-gray-800 pb-4">
      <button
        className="flex w-full justify-between text-left font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FaqList = () => {
  const faqData = [
    {
      question: "予約は必要ですか？",
      answer:
        "はい、体験を円滑に進めるために事前予約をお願いしています。予約方法や空き状況については、お電話またはウェブサイトでご確認ください。",
    },
    {
      question: "初心者でも参加できますか？",
      answer:
        "もちろんです。初心者の方も大歓迎です。経験豊富なスタッフが丁寧に指導しますので、安心して参加いただけます。",
    },
    {
      question: "子供も参加できますか？年齢制限はありますか？",
      answer:
        "お子様も参加いただけます。ただし、安全面を考慮して、小学生以下のお子様は保護者同伴でお願いしています。",
    },
    {
      question: "釣った魚の調理方法は選べますか？",
      answer:
        "はい、釣った魚は刺身、塩焼き、天ぷらなど、いくつかの調理方法からお選びいただけます。アレルギーや好みに合わせてご相談ください。",
    },
    {
      question: "釣れなかった場合はどうなりますか？",
      answer:
        "釣果は保証できませんが、釣れなかった場合でも体験を楽しんでいただけるよう工夫しています。また、食事のみのオプションもご用意しております。",
    },
    {
      question: "服装や靴に関する注意点はありますか？",
      answer:
        "渓流釣りの場合、滑りにくい靴底のものをお勧めします。また、季節に応じた動きやすい服装をご準備ください。必要に応じて、ウェーダーなどの特殊な装備もレンタル可能です。",
    },
    // {
    //   question: "アレルギーがある場合、対応してもらえますか？",
    //   answer:
    //     "はい、事前にお申し出いただければ、アレルギー対応の調理方法や代替メニューをご用意いたします。安全に楽しんでいただけるよう最大限配慮いたします。",
    // },
    // {
    //   question: "釣り場までの交通手段はありますか？",
    //   answer:
    //     "最寄り駅からの送迎サービスをご用意しています。また、お車でお越しの方には駐車場もございます。詳細は予約時にお問い合わせください。",
    // },
    {
      question: "雨天時はどうなりますか？",
      answer:
        "小雨程度であれば実施いたしますが、荒天時は安全のため中止または延期となる場合があります。その際は事前にご連絡いたします。",
    },
    {
      question: "釣れる魚の種類は？",
      answer:
        "主にイワナ、アマゴ、ニジマスなどの渓流魚が釣れます。上流域ではイワナ、少し下流域ではアマゴが多く生息しています。",
    },
    // {
    //   question: "釣り方は選べますか？",
    //   answer:
    //     "餌釣り、ルアー釣り、テンカラ釣りなど、複数の釣り方から選択可能です。初心者には餌釣りがおすすめです。",
    // },
    {
      question: "必要な道具は持参する必要がありますか？",
      answer:
        "基本的な釣り道具は当施設で用意しています。ただし、着替えや帽子、日焼け止めなどの個人的な装備はご持参ください。",
    },
  ];

  return (
    <div className="ml-4 mt-20 md:ml-8 lg:mt-40">
      <h2 className="mb-6 text-xl font-bold">よくある質問</h2>
      <div className="mb-12 ml-auto max-w-[1400px] rounded-[20px] p-4 md:p-8 ">
        {faqData.map((item, index) => (
          <FaqItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};
