# 川の家おさか 公式ウェブサイト

飛騨小坂の自然と伝統を発信する公式ウェブサイトです。

## 使用技術

- [Next.js](https://nextjs.org/) - App Router採用
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) - アニメーション実装
- [MicroCMS](https://microcms.io/) - コンテンツ管理
- [Air リザーブ](https://airrsv.net/) - 予約管理システム

## ディレクトリ構成

```sh
.
├── public/             # 静的アセット（画像など）
└── src/
    ├── app/           # Next.js App Router
    │   ├── _components/  # 共通コンポーネント
    │   ├── _functions/  # ユーティリティ関数
    │   ├── about/      # 飛騨小坂について
    │   ├── news/       # ニュース一覧・詳細
    │   ├── fishing/    # 釣り体験
    │   ├── eatery/     # お食事処
    │   ├── access/     # アクセス
    │   ├── reservation/ # 予約
    │   └── contact/    # お問い合わせ
    ├── libs/          # 外部サービス連携
    ├── schema/        # MicroCMS APIスキーマ
    └── types/         # 型定義
```

## 開発ガイドライン

### コンポーネント設計

- 基本的にサーバーコンポーネント（SC）を使用
- クライアントコンポーネント（CC）は必要な場合のみ使用
- Headless UIコンポーネントはCCとして実装

### スタイリング

- Tailwind CSSを基本とする
- [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) - CMS記事のスタイリング
- [HeadlessUI](https://headlessui.com/) - アクセシビリティ対応コンポーネント

### アニメーション

- Framer Motionを使用
- ローディングアニメーション
  - ロゴ表示
  - 泡の上昇アニメーション
  - コンテンツ切り替え

### コンテンツ管理（MicroCMS）

- ニュース記事
- 釣り体験情報
- お食事メニュー
- 営業情報

### 外部サービス連携

- Google Maps - アクセスページ
- Airリザーブ - 予約管理

## セットアップ

```bash
# パッケージインストール
bun install

# 開発サーバー起動
bun dev

# ビルド
bun run build

# 型チェック
bun typecheck
```

## 環境変数

```env
MICROCMS_API_KEY=your_api_key
MICROCMS_SERVICE_DOMAIN=your_domain
GOOGLE_MAPS_API_KEY=your_api_key
```

## MicroCMS型生成

```bash
# APIスキーマから型定義を生成
pnpm generate:cms types
```

## ライセンス

All rights reserved.
