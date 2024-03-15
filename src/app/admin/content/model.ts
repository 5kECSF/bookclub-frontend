import { z } from "zod"

export interface Upload {
  id?: string;
  name: string;
  desc?: string;
  url?: string
}

export interface IContent {
  id?: string;
  name: string;
  slug?: string
  desc?: string;
  upload_names?: string[];
  body?: string;
  uploads?: Upload[]
}

export const ContentValidator = z.object({
  name: z.string().min(2, { message: "min length is 2" }),
  desc: z.string().min(3, { message: "min length is 2" }),
  // upload_names: z.array(z.string()),
  // learnArea: z.string().min(3, { message: "min length is 2" }),
  // body: z.string().min(2),
})

export type TContentDto = z.infer<typeof ContentValidator>
