
import { z } from 'zod'

export const BorrowRequestValidator = z.object({
    startDate: z.date(),
    endDate: z.date(),
    description: z.string().min(1,),
    book: z.string()
});


export type BookRequestType = z.infer<typeof BorrowRequestValidator>