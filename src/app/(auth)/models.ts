import { z } from "zod"

export const LoginValidator = z.object({
  userName: z.string(),
  password: z.string().min(6, { message: "password should be length of 6 or more" }),

})

export const SignupValidator = z.object({
  userName: z.string(),
  password: z.string().min(6, { message: "password should be length of 6 or more" }),
  confirmPassword: z.string().min(6, { message: "password should be length of 6 or more" }),
  fName: z.string().min(3).max(20),
  lName: z.string().min(3).max(20),
}).refine((data) => data.password == data.confirmPassword, {
  message: " passwords must match ",
  path: ["confirmPassword"],
})

export type TLoginSchema = z.infer<typeof LoginValidator>
export type  TSignupSchema = z.infer<typeof SignupValidator>