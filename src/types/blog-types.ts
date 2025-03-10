type Reference<T, R> = T extends "get" ? R : string | null;
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
type Structure<T, P> = T extends "get"
  ? { id: string } & DateType & Required<P>
  : T extends "gets"
    ? GetsType<{ id: string } & DateType & Required<P>>
    : Partial<DateType> & (T extends "patch" ? Partial<P> : P);

export type News<T = "get"> = Structure<
  T,
  {
    /**
     * タイトル
     */
    title: string;
    /**
     * 内容
     */
    content: string;
    /**
     * アイキャッチ
     */
    eyecatch: {
      url: string;
      width: number;
      height: number;
    };
    /**
     * カテゴリ
     */
    category: {
      id: string;
      name: string;
    };
  }
>;

export interface EndPoints {
  get: {
    news: News<"get">;
  };
  gets: {
    news: News<"gets">;
  };
  post: {
    news: News<"post">;
  };
  put: {
    news: News<"put">;
  };
  patch: {
    news: News<"patch">;
  };
}
