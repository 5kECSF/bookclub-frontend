"use client"
import { Input } from "@/components/ui/input";
import ReaderCard from "./reader-card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from 'react-hook-form'
import { UserUpdatetype, UserValidator } from "@/lib/validator/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { MTD} from "@/lib/constants";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsFillCloudArrowUpFill, } from "react-icons/bs";
import  { AppHeaders, useMakeReqState } from "@/lib/state/hooks/useMutation";
import { message } from "antd";
import PasswordChange from "./password-change";
import { useRouter } from "next/navigation";
import {useAuth} from "@/lib/state/context/jotai-auth";

type image = File & {
  preview: string;
}
export default function Body({  }: { }) {
  const [files, setFiles] = useState<image[]>([])
  const {  makeReq, loading } = useMakeReqState();

  const [tab, setTab] = useState(1)
  const {user} = useAuth()
  const router = useRouter()



  const form = useForm<UserUpdatetype>({
    resolver: zodResolver(UserValidator),
    defaultValues: {
      firstName: user?.fName ?? "",
      lastName: user?.lName ?? "",
      // avater: user?.lName ? getImg(user?.avatar) : ""
    }
  });

  const onSubmit = async (data: UserUpdatetype) => {
    const formData = new FormData();
    formData.append("firstName", data?.firstName as string);
    formData.append("lastName", data?.lastName);
    if (!(typeof data.avater === 'string' && data.avater.startsWith('https://firebasestorage') )) {
      formData.append("file", data.avater);
    }


    try {
      const resp= await makeReq("profile", formData, MTD.PATCH, AppHeaders.MULTIPART )
      if(!resp.ok){
        console.log("````````````````````error data", resp.body);
        message.error(resp.message);
      }
      message.success(`user update success`);
      router.refresh()
    } catch (e: any) {
      // console.log(e.messag
    }
  }


  const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
    if (acceptedFiles?.length) {
      form.setValue("avater", acceptedFiles[0])
      setFiles((previousFiles: any) => [
        // ...previousFiles,
        ...acceptedFiles.map((file: File) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000,
    onDrop
  })
  const Upload = <div
    {...getRootProps({
      className: "cursor-pointer"
    })}
  >
    <input {...getInputProps()} />
    <div className='flex flex-col items-center justify-center gap-4'>
      <h3 className="underline">Upload new photo</h3>
    </div>
  </div>

  return (
    <section className="sm:mx-11 mx-6 mt-4 bg-white px-4 py-6 rounded-lg min-h-[70vh]" >
      <div className="flex gap-6 items-center text-[16px] ">
        <h4 onClick={() => setTab(1)} className={`border-b cursor-pointer ${tab === 1 ? 'border-b-red-600 text-red-600' : ''}`}>Account Setting</h4>
        <h4 onClick={() => setTab(2)} className={`border-b cursor-pointer ${tab === 2 ? 'border-b-red-600 text-red-600' : ''}`}>Login & Security</h4>
      </div>
      {tab === 1 && <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="my-8 flex flex-col sm:flex-row justify-center sm:justify-start mx-auto gap-9 ">
            <div className="flex flex-col mr-10">
              <p className="capitalize mb-2 text-gray-200">your profile picture</p>
              {!form.getValues('avater') ?
                <div
                  {...getRootProps({
                    className: "border border-black py-4 cursor-pointer rounded"
                  })}
                >
                  <input {...getInputProps()} />
                  <div className='flex flex-col items-center justify-center gap-4 '>
                    <BsFillCloudArrowUpFill className='w-[40px] h-[40px] ' />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>Select Avater</p>
                    )}
                  </div>
                </div> : null
              }

              {files.map((file, i) => (
                <div key={i} className=" mt-3">
                  <Image
                    src={file.preview}
                    alt={file.name}
                    width={100}
                    height={100}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview)
                    }}
                    className='w-20 h-20 mx-5 object-cover rounded-full '
                  />
                  <button
                    type='button'
                    className=' flex justify-center items-center text-gray-600 transition-colors mt-4'
                    onClick={() => { }}
                  >
                    {Upload}
                  </button>
                </div>
              ))}
              {
                typeof form.getValues('avater') === 'string' && form.getValues('avater').startsWith('https://firebasestorage') ?
                  <div className="  ">
                    <Image
                      width={100}
                      height={100}
                      className="w-20 h-20 mx-5   rounded-full  object-cover"
                      src={form.getValues('avater')}
                      alt="person" />
                    <button
                      type='button'
                      className=' flex justify-center items-center text-gray-600 transition-colors mt-4'
                      onClick={() => { }}
                    >
                      {Upload}
                    </button>
                  </div>
                  : null
              }
            </div>
            <div className="flex flex-col lg:flex-row gap-5">
              <ReaderCard text='Reading' count={12} type='one' />
              <ReaderCard text='Donated' count={1} type='two' />
            </div>
          </div>

          <div className="max-w-lg flex gap-2 flex-col">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name </FormLabel>
                  <FormControl>
                    <Input disabled={false}  {...field} />
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name </FormLabel>
                  <FormControl>
                    <Input disabled={false}  {...field} />
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
          </div>
          <div className="  my-4 flex gap-4 ">
            <Button type="button" disabled={loading} variant={'outline'} >Cancle</Button>
            <Button type='submit' disabled={loading} className="[background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)] text-white" >Update</Button>

          </div>
        </form>
      </Form>}
      {
        tab === 2 && <PasswordChange />
      }
    </section >
  );
}
