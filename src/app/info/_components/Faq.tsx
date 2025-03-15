import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Faq = () => {
  return (
    <div className="rounded-3xl bg-white/80 p-6 shadow-lg backdrop-blur-sm md:p-10">
      <Accordion type="single" collapsible className="w-full">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-black/70"></div>
          <h3 className="text-xl font-bold">釣りの基本操作</h3>
        </div>

        <AccordionItem
          value="bait-run-out"
          className="border-b border-black/10"
        >
          <AccordionTrigger className="py-4 text-lg font-bold text-black">
            餌がなくなった場合はどうすればいいですか？
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-lg text-black/80">
            <span className="font-bold">
              餌がなくなった場合は、スタッフに声をかけてください。
            </span>
            追加の餌をご用意します。餌は
            <span className="font-bold">無料で補充</span>
            いたしますので、遠慮なくお申し付けください。
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rod-usage" className="border-b border-black/10">
          <AccordionTrigger className="py-4 text-lg font-bold text-black">
            釣り竿の使い方がわかりません
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-lg text-black/80">
            基本的には、
            <span className="font-bold">
              餌を付け、糸を垂らし、魚がかかったら竿を立てて引き上げます。
            </span>
            わからないことがあれば、いつでもお近くのスタッフにお声がけください。
          </AccordionContent>
        </AccordionItem>

        <div className="my-8 flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-black/70"></div>
          <h3 className="text-xl font-bold">トラブル対応</h3>
        </div>

        <AccordionItem
          value="tangled-line"
          className="border-b border-black/10"
        >
          <AccordionTrigger className="py-4 text-lg font-bold text-black">
            糸が絡まってしまいました。どうすればいいですか？
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-lg text-black/80">
            糸が絡まった場合は
            <span className="font-bold">
              無理に引っ張らず、スタッフにお声がけ
            </span>
            ください。
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hook-stuck" className="border-b border-black/10">
          <AccordionTrigger className="py-4 text-lg font-bold text-black">
            釣り針が根や石に引っかかってしまいました（根掛かり）。どうすればいいですか？
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-lg text-black/80">
            根掛かりした場合は、以下の手順を試してみてください：
            <ol className="list-decimal pl-5 pt-2">
              <li>
                <span className="font-bold">
                  竿を様々な角度から軽く引いてみる
                </span>
                （強く引っ張らないでください）
              </li>
              <li>
                それでも外れない場合は、
                <span className="font-bold">
                  糸を少しだけ緩めてから再度軽く引く
                </span>
              </li>
              <li>
                上記の方法で外れない場合は、
                <span className="font-bold">スタッフにお声がけください</span>
                。無理に引っ張ると竿や糸を傷める原因になります。
              </li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="remove-hook" className="border-b border-black/10">
          <AccordionTrigger className="py-4 text-lg font-bold text-black">
            釣り針を魚から外す方法を教えてください
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-lg text-black/80">
            魚から針を外す場合は以下の手順で行います：
            <ol className="list-decimal pl-5 pt-2">
              <li>
                <span className="font-bold">魚をしっかりと持つ</span>
              </li>
              <li>
                <span className="font-bold">
                  ペンチを使って針を持ち、少し奥に押し込みます
                </span>
              </li>
              <li>
                <span className="font-bold">
                  魚が針を飲み込んだ方向と逆に針を外します
                </span>
              </li>
            </ol>
            <span className="font-bold">
              初めての方や不安な方は無理をせず、スタッフにお声がけください。
            </span>
            安全に針を外せるようにお手伝いします。
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="fish-swallowed-hook"
          className="border-b border-black/10"
        >
          <AccordionTrigger className="py-4 text-lg font-bold text-black">
            魚が針を飲み込んでしまいました。どうすればいいですか？
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-lg text-black/80">
            魚が針を深く飲み込んでしまった場合は、
            <span className="font-bold">そのままで大丈夫です</span>。
            調理の際に内蔵を処理しますので、その時に取り出します。
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="broken-line" className="border-b border-black/10">
          <AccordionTrigger className="py-4 text-lg font-bold text-black">
            釣り糸が切れてしまいました
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-lg text-black/80">
            釣り糸が切れた場合は、竿先から新しい仕掛けをセットする必要があります。
            <span className="font-bold">
              スタッフにお声がけいただければ、迅速に対応
            </span>
            いたします。
          </AccordionContent>
        </AccordionItem>

        <div className="my-8 flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-black/70"></div>
          <h3 className="text-xl font-bold">魚の取り扱い</h3>
        </div>

        <AccordionItem
          value="take-home-fish"
          className="border-b border-black/10"
        >
          <AccordionTrigger className="py-4 text-lg font-bold text-black">
            持ち帰り用の魚はどのように保管すればいいですか？
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-lg text-black/80">
            持ち帰り用の魚は
            <span className="font-bold">体験終了時に教えてください</span>
            。保冷バッグをお持ちの方はご持参ください。お持ちでない場合は、
            <span className="font-bold">
              簡易保冷パックを有料（300円）でご用意
            </span>
            しております。
            <span className="font-bold">氷は無料でお付けします</span>。
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cook-fish" className="border-b border-black/10">
          <AccordionTrigger className="py-4 text-lg font-bold text-black">
            釣った魚はその場で調理してもらえますか？
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-lg text-black/80">
            <span className="font-bold">
              はい。釣った魚は塩焼き（300円/1匹）や天ぷら（300円/1匹）などでその場で調理可能です。
            </span>
            調理ご希望の場合はスタッフにお申し付けください。
          </AccordionContent>
        </AccordionItem>

        <div className="my-8 flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-black/70"></div>
          <h3 className="text-xl font-bold">安全対策</h3>
        </div>

        <AccordionItem value="hook-injury" className="border-b border-black/10">
          <AccordionTrigger className="py-4 text-lg font-bold text-black">
            釣り針で指を刺してしまいました
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-lg text-black/80">
            釣り針が刺さった場合は、
            <span className="font-bold">すぐにスタッフにお声がけください</span>
            。応急処置用の救急キットをご用意しています。
            <span className="font-bold">
              深く刺さっている場合は無理に抜かず、スタッフの指示に従ってください。
            </span>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="insect-repellent"
          className="border-b border-black/10"
        >
          <AccordionTrigger className="py-4 text-lg font-bold text-black">
            虫除け対策はありますか？
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-lg text-black/80">
            <span className="font-bold">
              虫除けスプレーを受付で貸し出ししています。
            </span>
            また、売店でも虫除けグッズを販売しています。
            <span className="font-bold">
              特に夏場は事前の対策をお勧めします。
            </span>
          </AccordionContent>
        </AccordionItem>

        <div className="my-8 flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-black/70"></div>
          <h3 className="text-xl font-bold">釣りのコツ</h3>
        </div>

        <AccordionItem
          value="fishing-tips"
          className="border-b border-black/10"
        >
          <AccordionTrigger className="py-4 text-lg font-bold text-black">
            魚が釣れないのですが、コツはありますか？
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-lg text-black/80">
            以下のポイントを意識すると釣果が上がりやすくなります：
            <ol className="list-decimal pl-5 pt-2">
              <li>
                <span className="font-bold">
                  水面に影を作らないよう立ち位置に注意する
                </span>
              </li>
              <li>
                <span className="font-bold">大きな音や振動を出さない</span>
              </li>
              <li>
                <span className="font-bold">餌の付け方を工夫する</span>
                （スタッフにお尋ねください）
              </li>
              <li>
                <span className="font-bold">
                  時間帯によって魚のいる場所が変わるので、場所を変えてみる
                </span>
              </li>
            </ol>
            スタッフが釣り方のコツをお教えしますので、お気軽にお声がけください。
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fish-types" className="border-b border-black/10">
          <AccordionTrigger className="py-4 text-lg font-bold text-black">
            どんな種類の魚が釣れますか？
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-lg text-black/80">
            主に<span className="font-bold">イワナ、アマゴ、ニジマス</span>
            が釣れます。季節によって釣れやすい魚種が変わることもあります。それぞれの特徴や見分け方についてはスタッフにお尋ねください。
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <p className="mt-6 text-center text-lg">
        この他にもご質問があれば、お気軽にスタッフまでお声がけください。楽しい釣り体験をサポートいたします！
      </p>
    </div>
  );
};
