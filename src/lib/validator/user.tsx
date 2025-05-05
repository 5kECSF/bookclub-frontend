import { z } from 'zod'

export const UserValidator = z.object({
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
    avater: z.any()
});

export type UserUpdatetype = z.infer<typeof UserValidator>
