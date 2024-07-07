import { IUpload } from "@/app/admin/_components/upload/upload";
import { z } from "zod";

export interface IGenre {
  _id?: string;
  name: string;
  slug?: string;
  desc?: string;
  fileId?: string;
  body?: string;
  upload?: IUpload;
}

export const GenreValidator = z.object({
  name: z.string().min(2, { message: "min length is 2" }),
  desc: z.string().min(3, { message: "min length is 2" }),
});

export type TGenreDto = z.infer<typeof GenreValidator>;
