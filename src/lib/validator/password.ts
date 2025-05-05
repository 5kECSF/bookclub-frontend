
import { z } from 'zod'

export const passwordValidator = z.object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6,),
});


export type passwordChangeType = z.infer<typeof passwordValidator>
