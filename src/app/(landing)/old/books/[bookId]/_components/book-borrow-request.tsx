import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BookRequestType, BorrowRequestValidator } from '@/lib/validator/borrow-request';
import { IBook } from '@/types/db';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker, Modal } from 'antd'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { BsFillPatchCheckFill } from 'react-icons/bs';

const BookBorrowModal = ({ isOpen, setOpen, book }: { isOpen: boolean, book: IBook, setOpen: (open: boolean) => void }) => {
    const [sucess, setSucess] = useState(false)
    const form = useForm<BookRequestType>({
        resolver: zodResolver(BorrowRequestValidator),
        defaultValues:
        {
            description: "",
            book: book.title

        }
    });
    const onSubmit = (data: BookRequestType) => {
        setSucess(true)
    }

    return (
        <Modal
            // title={"BorrowBook"}
            open={isOpen}
            onOk={form.handleSubmit(onSubmit)}
            onCancel={() => {
                setSucess(false)
                setOpen(false)
            }}
            footer={[]}
        >
            <div className='flex flex-col justify-center items-center'>
                {!sucess ? <div className='w-full'>
                    <h3 className='font-bold'>Fill up the details</h3>
                    <Form {...form}>
                        <form className="space-y-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start date</FormLabel>
                                        <FormControl>
                                            <DatePicker className='w-full' onChange={(value: any) => field.onChange(new Date(value.$d))} />
                                        </FormControl>
                                        <FormMessage data-test='borrow-request-start-error' className='text-red-800' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End date </FormLabel>
                                        <FormControl>
                                        <DatePicker className='w-full' onChange={(value: any) => field.onChange(new Date(value.$d))} />
                                        </FormControl>
                                        <FormMessage data-test='borrow-request-end-error' className='text-red-800' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="book"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Book selected </FormLabel>
                                        <FormControl>
                                            <Input readOnly={true} className='w-full capitalize' {...field} />
                                        </FormControl>
                                        <FormMessage data-test='borrow-request-end-error' className='text-red-800' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Purpose</FormLabel>
                                        <FormControl>
                                            <Textarea data-test='author-description-input' disabled={false}  {...field} />
                                        </FormControl>
                                        <FormMessage data-test='author-disc-error' className='text-red-800' />
                                    </FormItem>
                                )}
                            />

                            <div className='flex w-full justify-end gap-4 '>
                                <Button data-test="cancle-save-category-btn" variant={'outline'} className=' text-sm' onClick={() => setOpen(false)}>
                                    Cancle
                                </Button>
                                <Button data-test="save-category-button" className='text-white bg-black text-sm  border-2' >
                                    Borrow
                                </Button>

                            </div>


                        </form>
                    </Form >  </div> :
                    <div className='h-[300px] justify-center items-center flex flex-col gap-10'>
                        <h1 className='font-bold text-[20px]'>Request sent sucessfully!</h1>
                        <BsFillPatchCheckFill className='text-[100px]' />
                    </div>}


            </div>
        </Modal >
    )
}

export default BookBorrowModal