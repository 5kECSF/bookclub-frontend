export const BASE_URL = "http://127.0.0.1:8000/api/v1";

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
  //core modules
  domain = "domain",
  learnArea = "learnArea",
  subject = "subject",
  knowledge = "knowledge",
  skill = "skill",
  task = "task",
  workRole = "workRole",
  //learning modules
  content = "content",
  section = "section",
  course = "course",
  pkg = "pkg",
  group = "group",
  training = "training",
}

export const getImg = (image: string): string => {
  // const addon: imgAddon = paths[image.path];
  // return addon.prefix + image.image + addon.suffix;
  return BASE_URL + "/" + image;
};
