export const BASE_URL = "https://fivekecsf.onrender.com" //"http://127.0.0.1:8000/api/v1";
// export const BASE_URL = "http://127.0.0.1:9001";
import { IUpload } from "@/app/admin/_components/upload/upload";
export enum CookieNames {
  AccessToken = "access_token",
  RefreshToken = "refresh_token",
  User = "user",
}

export const AppHeaders = {
  MULTIPART: {
    "Content-Type": "multipart/form-data",
  },
  JSON: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export enum MTD {
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum KY {
  //library modules
  category = "category",
  genre = "genre",
  book = "book",
  author = "author",
  section = "section",
}

const projName = `aait-a3640.appspot.com`;
const ToBeAdded = `https://firebasestorage.googleapis.com/v0/b/${projName}/o/`;

interface imgAddon {
  prefix: string;
  suffix: string;
}

const paths: Record<string, imgAddon> = {
  p1: {
    prefix: ToBeAdded,
    suffix: "?alt=media",
  },
};

export const getImg = (image: IUpload): string => {
  const addon: imgAddon = paths[image?.pathId || "p1"];
  return addon.prefix + image?.fileName + addon.suffix;
};
export const getImgUrl = (imgName: string, p: string): string => {
  const addon = paths[p || "p1"];
  return addon.prefix + imgName + addon.suffix;
};
