import { z } from "zod";

export const updateProfileValidator = z.object({
  info: z.string(),
  password: z
    .string()
    .min(6, { message: "password should be length of 6 or more" }),
});

export const changePwdValidator = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "password should be length of 6 or more" }),
    password: z
      .string()
      .min(6, { message: "password should be length of 6 or more" }),
    confirmPassword: z
      .string()
      .min(6, { message: "password should be length of 6 or more" }),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: " passwords must match ",
    path: ["confirmPassword"],
  });


export type TProfileSchema = z.infer<typeof updateProfileValidator>;
export type TChangePwdSchema = z.infer<typeof changePwdValidator>;

