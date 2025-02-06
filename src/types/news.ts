import { MicroCMSListResponse } from "microcms-js-sdk";

export type News = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch: {
    url: string;
    width: number;
    height: number;
  };
};

export type NewsResponse = MicroCMSListResponse<News>;
