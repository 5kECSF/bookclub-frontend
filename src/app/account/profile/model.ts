import { z } from "zod";

export const ProfileValidator = z.object({
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
    bio: z.string().optional(),
    team: z.string().min(3, { message: "category is required" }),
    department: z.string(),
    phoneInfo: z.string().length(9,"must be 9 digits").regex(/^\d{9}$/,"must contain only digits").optional(),
//   idNumber: z.string(),
//   genres: z.array(z.string()).min(1, { message: "select at least 1 genre" }),

});
export type TProfile = z.infer<typeof ProfileValidator>;

//===========  Passowrd change Validators

export const changePwdValidator = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "password should be length of 6 or more" }),
    newPassword: z
      .string()
      .min(6, { message: "password should be length of 6 or more" }),
    confirmPassword: z
      .string()
      .min(6, { message: "password should be length of 6 or more" }),
  })
  .refine((data) => data.newPassword == data.confirmPassword, {
    message: " passwords must match ",
    path: ["confirmPassword"],
  });
export type TChangePwdSchema = z.infer<typeof changePwdValidator>;



//=========== New Email validator

export const NewEmailValidator = z
  .object({
    newEmail: z.string().email("email must have correct format"),
  })

export type TNewEmailSchema = z.infer<typeof NewEmailValidator>;

//=========== Change Email Validator

export const ChangeEmailValidator = z.object({
  code: z
    .string()
    .min(4, { message: "the code consists only 4 characters" })
    .max(4, { message: "the code consists only 4 characters" }),
    password: z
      .string()
      .min(6, { message: "password should be length of 6 or more" }),
    
});


export type TChangeEmailSchema = z.infer<typeof ChangeEmailValidator>;


