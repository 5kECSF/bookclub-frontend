import { IUpload } from "./upload";


export interface IBook {
    title: string;
    desc: string;
    categoryName: string;
    authorName?: string;
    pageNo?: number;
    featured?: boolean;
    status?: string;
    publishDate?: number;
    genres?: string[];
    meta?: string[];
    language?: BookLanguage;
    //non dto types
    _id?: string;
    slug?: string;
    fileId?: string;
    instanceCnt?: number;
    availableCnt?: number;
    upload?: IUpload;
    //TODO
    // year
}

export enum BookLanguage {
  English = 'English',
  Amharic = 'Amharic',
  AffanOrommo = 'AfanOromo',
  Tigrna = 'Tigrna'
}

