import { IUpload } from "@/types/upload";
import { z } from "zod";

export interface IBook {
  _id?: string;
  title: string;
  desc: string;
  categoryId: string;
  slug?: string;
  fileId?: string;
  body?: string;
  genres?: string[];
  upload?: IUpload;
}

export const BookValidator = z.object({
  title: z.string().min(2, { message: "min length is 2" }),
  desc: z.string().min(3, { message: "min length is 2" }),
  categoryId: z.string(),
  genres: z.array(z.string()).min(1),
});

export type TBookDto = z.infer<typeof BookValidator>;
