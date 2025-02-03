# デバッグモンキーズ公式HP

https://debug-monkeys.com/

## 使用技術

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [MicroCMS](https://microcms.io/)
- [AWS Amplify](https://aws.amazon.com/jp/amplify/)

## ディレクトリ構成

```sh
.
├── public                # 画像及びPDFなど
└── src
    ├── app
    │   ├── _components   # 汎用的なコンポーネント
    │   ├── _functions    # 汎用的な関数
    │   └── detail
    │       └── [game]    # 詳細ページ
    ├── libs              # ライブラリ
    ├── schema            # microCMSのAPIスキーマ
    └── types             # 型情報
```

## 全体の概要

パッケージマネージャはpnpmを使用。

Next.jsでは[App Router](https://nextjs.org/docs/app)を使用する。

基本的にサーバーコンポーネント（SC）を使用。やむを得ない場合のみクライアントコンポーネント（CC）を使用する。

スタイリングはTailwindCSSを使用する。

MicroCMSでゲームの情報を管理し、ゲーム一覧と記事ページの中身はゲーム情報APIから動的に生成する。

## TailwinCSSの[HeadlessUI](https://headlessui.com/)

TailwindCSS公式が提供している、アクセシビリティ対応もしてくれている便利コンポーネント集。

ヘッダーメニューではHeadlessUIの[Popover](https://headlessui.com/react/popover)を使用。

HeadlessUIはCCのみ使用可能なため、Headerコンポーネント(SC)でHeaderClientコンポーネント（CC）を呼び出している。

### [menu](https://headlessui.com/react/menu)との違い

menuはタブ選択時にはボタンがfocusできるが、中の選択肢にはfocusしない。矢印上下キーで選択肢を選択できるようになっている。

ヘッダーメニューではメニュー内部もfocusできるpopoverの方が適している。

App RouterでPopoverを開いている状態でPopoverコンテンツ外をクリックした時にPopoverが閉じないバグあり。対策用のdivを追加する必要がある。  
参照：[HeadlessUIのissueコメント](https://github.com/tailwindlabs/headlessui/issues/2752#issuecomment-1724096430)

## MicroCMSから読み込んだ記事のスタイリング

MicroCMSではリッチエディタかHTML記述を選べる（組み合わせも可）。ID指定などをしたい場合はHTMLで記載する。  
参照：[Title: リッチエディタを使いつつ一部はHTMLで入稿する | microCMSブログ](https://blog.microcms.io/input-richeditor-and-html/)

MicroCMSのリッチエディタで作成した記事は[html-react-parser](https://github.com/remarkablemark/html-react-parser)でDOMに変換後、[@tailwind/typography](https://github.com/tailwindlabs/tailwindcss-typography)を使用してスタイリングする。  
これはTailwind公式が提供する、タグ要素を適切にレイアウトされたライブラリ。

さらにカスタムが必要であれば`prose`でクラスを指定、または`tailwind.config`に`prose`の指定を記述する。

## microCMSから型を抽出する方法

`API設定 > APIスキーマ > 「この設定をエクスポートする」`で出力されるjsonファイルを`src/schema`配下に格納し、`generate:cms types`コマンドを実行すると、`src/types`配下に型が出力される。

ファイル名からエンドポイント名を取り出すので、スキーマのファイル名は変更しない。

フォルダ上に同じエンドポイント名のファイルがある場合は、ファイル末尾の日付から最新のものが選択される。

## AWS Amplify

AWS Amplify × Route53でホスティング。
`production_netlify`ブランチにプッシュすることでビルド可能。

MicroCMSのAPI情報は環境変数で保持する。

※以前はnetlifyでVue CLIのSSG環境を立てていたが、App RouterでSSRビルドすると404になるバグが発生したため、Amplifyに移行した。
