import { z } from "zod";
import { IContent } from "../content/model";
// import { ISkill } from "@/app/admin/(core_modules)/skill/model"
// import { IKnowledge } from "@/app/admin/(core_modules)/knowledge/model"

export interface IContentSection {
  section_slug?: string;
  content_slug?: string;
  order?: number;
  content?: IContent;
}

export interface ISection {
  id?: string;
  name: string;
  desc?: string;
  time_takes?: string;

  contents?: IContentSection[];
  skills?: any;
  knowledge?: any;
  // these fields are used for create and update & are not always not Uptodate with latest data
  content_slugs?: string[];
  skill_names?: string[];
  knowledge_names?: string[];

  // learnArea?: string;
}

export const SectionValidator = z.object({
  name: z.string().min(2, { message: "min length is 2" }),
  desc: z.string().min(3, { message: "min length is 2" }),
  content_slugs: z
    .array(z.string())
    .min(1, "Please select at least one option"),
  skill_names: z.array(z.string()).min(1, "Please select at least one option"),
  knowledge_names: z
    .array(z.string())
    .min(1, "Please select at least one option"),
});

export type TSectionDto = z.infer<typeof SectionValidator>;
