import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MTD } from '@/lib/constants'
import { passwordChangeType, passwordValidator } from '@/lib/validator/password'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "react-toastify";
import React from 'react'
import { useForm } from 'react-hook-form'
import {useMakeReqState} from "@/lib/state/hooks/useMutation";


const PasswordChange = () => {
    const {  makeReq, loading } = useMakeReqState();
    const form = useForm<passwordChangeType>({
        resolver: zodResolver(passwordValidator),
        defaultValues: {
            oldPassword: "",
            newPassword: "",

        }
    });

    const onSubmit = async (data: passwordChangeType) => {
        const body: passwordChangeType = {
            oldPassword: data.oldPassword, newPassword: data.newPassword
        }


        try {
            const resp= await makeReq("auth/changePassword", body, MTD.PATCH )
            if(!resp.ok){
                console.log("````````````````````error data", resp.body);
                toast.error(resp.message);
            }
            toast.success(`password update success`);
            form.reset()

        } catch (e: any) {
            // console.log(e.message);
        }
    }

    return (
        <div className="max-w-lg flex gap-2 flex-col mt-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Old password </FormLabel>
                                <FormControl>
                                    <Input disabled={false}  {...field} />
                                </FormControl>
                                <FormMessage className='text-red-800' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New password </FormLabel>
                                <FormControl>
                                    <Input disabled={false}  {...field} />
                                </FormControl>
                                <FormMessage className='text-red-800' />
                            </FormItem>
                        )}
                    />
                    <div className="  my-4 flex gap-4 ">
                        <Button disabled={loading} onClick={() => form.reset()} type='button' variant={'outline'} >Cancle</Button>
                        <Button disabled={loading} type='submit' className="bg-black text-white" >Change</Button>

                    </div>
                </form>
            </Form>

        </div>
    )
}

export default PasswordChange