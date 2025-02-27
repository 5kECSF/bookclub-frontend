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
/*
Books can be filtered via:
- language(select), category(select), genres(multi-select), author(select),
- queries: (instance count<gt,eq>), page<gt,eq>
* */

export const BookValidator = z.object({
  title: z.string().min(2, { message: "min length is 2" }),
  desc: z.string().min(3, { message: "min length is 3" }),
  categoryName: z.string().min(3, { message: "category is required" }),
  authorName: z.string(),
  status: z.string(),
  genres: z.array(z.string()).min(1, { message: "select at least 1 genre" }),
});

export type TBookDto = z.infer<typeof BookValidator>;
