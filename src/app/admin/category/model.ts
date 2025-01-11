import { IUpload } from "@/types/upload";
import { z } from "zod";

export interface ICategory {
  _id?: string;
  name: string;
  slug?: string;
  desc?: string;
  fileId?: string;
  body?: string;
  upload?: IUpload;
}

export const CategoryValidator = z.object({
  name: z.string().min(2, { message: "min length is 2" }),
  desc: z.string().min(3, { message: "min length is 2" }),
  status: z.string().optional(),
});

export type TCategoryDto = z.infer<typeof CategoryValidator>;
