import { IUpload } from "@/types/upload";
import { z } from "zod";

export interface IAuthor {
  _id?: string;
  name: string;
  slug?: string;
  desc?: string;
  fileId?: string;
  body?: string;
  upload?: IUpload;
}

export const AuthorValidator = z.object({
  name: z.string().min(2, { message: "min length is 2" }),
  desc: z.string().min(3, { message: "min length is 2" }),
});

export type TAuthorDto = z.infer<typeof AuthorValidator>;
