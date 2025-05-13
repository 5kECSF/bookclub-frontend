import { IUpload } from "@/types/upload";

export interface ICategory {
  _id?: string;
  name: string;
  upload?: IUpload;
  desc?: string;
  count?: number;
  url?: string;
}

export interface Iauthor {
  _id?: string;
  name: string;
  img?: img;
  info?: string;
  count?: number;
}

export interface IBook {
  _id?: string;
  title: string;
  slug?: string;
  genres?: string[];
  pageNo?: number;
  img?: img;
  desc?: string;
  categoryId: string;
  language: string;
  authorName?: string;
  authorId?: string;
  availableCnt?: number;
}

export interface Igenre {
  _id?: string;
  name: string;
  upload: IUpload;
  desc?: string;
  count?: number;
}
