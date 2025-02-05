"use client";
import { motion } from "framer-motion";

export const Access = () => {
  return (
    <section className="relative w-full py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <p className="text-base font-semibold md:text-2xl">ACCESS</p>
          <h2 className="mb-2 font-shippori-antique-b1 text-2xl font-medium md:text-5xl">
            アクセス
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] overflow-hidden rounded-[20px] border-2 border-black md:h-[500px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3231.6223535685845!2d137.3141063!3d35.9072638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6002cf5235d24655%3A0xf83c14ef6c3795a4!2z5bed44Gu5a6244GK44GV44GL77yIUklWRVIgSE9VU0UgT1NBS0Eg77yJ!5e0!3m2!1sja!2sjp!4v1738715575565!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </motion.div>

          {/* アクセス情報 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold">所在地</h3>
              <p className="text-gray-700">
                〒509-3112
                <br />
                岐阜県下呂市小坂町大洞2340-5 小坂町淡水魚養殖業業協同組合
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold">アクセス方法</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold">お車でお越しの場合</h4>
                  <p className="text-gray-700">
                    名古屋より東海環状自動車道富加関ICより車で２時間
                    <br />
                    下呂温泉より高山方面へ車で４０分
                    <br />
                    高山より下呂方面へ車で５０分
                  </p>
                </div>
                <div>
                  <h4 className="font-bold">電車でお越しの場合</h4>
                  <p className="text-gray-700">
                    JR飛騨小坂駅から１０ｋｍ。
                    <br />
                    送迎サービス（公共交通機関含む）はございません。
                    <br />
                    タクシーは片道３０００円以上かかります。
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold">営業時間</h3>
              <p className="text-gray-700">
                釣り体験：10:00〜17:00（最終受付16:00）
                <br />
                お食事：11:00〜15:00（L.O. 14:30）
                <br />
                定休日：水曜日
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 装飾的な要素 */}
    </section>
  );
};
