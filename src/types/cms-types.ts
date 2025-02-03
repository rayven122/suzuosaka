type Reference<T, R> = T extends 'get' ? R : string | null;
interface GetsType<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
type DateType = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};
type Structure<T, P> = T extends 'get'
  ? { id: string } & DateType & Required<P>
  : T extends 'gets'
  ? GetsType<{ id: string } & DateType & Required<P>>
  : Partial<DateType> & (T extends 'patch' ? Partial<P> : P);

export type details<T='get'> = Structure<
T,
{
  /**
   * ゲームタイトル
   */
  title: string
  /**
   * サムネイル
   */
  thumb: { url: string, width: number, height: number }
  /**
   * 紹介文
   */
  description?: string
  /**
   * ステータス
   */
  status?: ['販売中' | '予約受付中' | '完売' | '近日登場']
  /**
   * 販売ページリンク
   */
  saleLink?: string
  /**
   * 予約ページリンク
   */
  reservationLink?: string
  /**
   * ヘッダー画像
   */
  headerImg?: { url: string, width: number, height: number }
  /**
   * ゲームデザイン
   */
  designer?: string
  /**
   * アートワーク
   */
  artwork?: string
  /**
   * プレイ人数
   */
  players?: string
  /**
   * プレイ時間
   */
  time?: string
  /**
   * 対象年齢
   */
  age?: string
  /**
   * サイズ（mm）
   */
  size?: string
  /**
   * 制作年
   */
  createdDate?: string
  /**
   * 説明書有無
   */
  hasInstruction?: boolean
  /**
   * ゲーム詳細記事（カスタムフィールド）
   */
  article: (details_richEditor | details_html)[]
}>

interface details_richEditor {
  fieldId: 'richEditor'
  /**
   * リッチエディタ
   */
  richEditor?: any
}
interface details_html {
  fieldId: 'html'
  /**
   * HTML
   */
  html?: string
}

export interface EndPoints {
  get: {
    'details': details<'get'>
  }
  gets: {
    'details': details<'gets'>
  }
  post: {
    'details': details<'post'>
  }
  put: {
    'details': details<'put'>
  }
  patch: {
    'details': details<'patch'>
  }
}
