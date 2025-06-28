"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MTD } from "@/lib/constants";
import { AppHeaders, useMakeReqState } from "@/lib/state/hooks/useMutation";
import { UserUpdatetype, UserValidator } from "@/lib/validator/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import ReaderCard from "./reader-card";

import { useAuth } from "@/lib/state/context/jotai-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PasswordChange from "./password-change";

type image = File & {
  preview: string;
};
export default function Body({}: {}) {
  const [files, setFiles] = useState<image[]>([]);
  const { makeReq, loading } = useMakeReqState();

  const [tab, setTab] = useState(1);
  const { user } = useAuth();
  const router = useRouter();

  const form = useForm<UserUpdatetype>({
    resolver: zodResolver(UserValidator),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      // avater: user?.lName ? getImg(user?.avatar) : ""
    },
  });

  const onSubmit = async (data: UserUpdatetype) => {
    const formData = new FormData();
    formData.append("firstName", data?.firstName as string);
    formData.append("lastName", data?.lastName);
    if (
      !(
        typeof data.avater === "string" &&
        data.avater.startsWith("https://firebasestorage")
      )
    ) {
      formData.append("file", data.avater);
    }

    try {
      const resp = await makeReq(
        "profile",
        formData,
        MTD.PATCH,
        AppHeaders.MULTIPART,
      );
      if (!resp.ok) {
        console.log("````````````````````error data", resp.body);
        toast.error(resp.message);
        return;
      }
      toast.success(`user update success`);
      router.refresh();
    } catch (e: any) {
      // console.log(e.messag
    }
  };

  const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
    if (acceptedFiles?.length) {
      form.setValue("avater", acceptedFiles[0]);
      setFiles((previousFiles: any) => [
        // ...previousFiles,
        ...acceptedFiles.map((file: File) =>
          Object.assign(file, { preview: URL.createObjectURL(file) }),
        ),
      ]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });
  const Upload = (
    <div
      {...getRootProps({
        className: "cursor-pointer",
      })}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-4">
        <h3 className="underline">Upload new photo</h3>
      </div>
    </div>
  );

  return (
    <section className="mx-6 mt-4 min-h-[70vh] rounded-lg bg-white px-4 py-6 sm:mx-11">
      <div className="flex items-center gap-6 text-[16px] ">
        <h4
          onClick={() => setTab(1)}
          className={`cursor-pointer border-b ${tab === 1 ? "border-b-red-600 text-red-600" : ""}`}
        >
          Account Setting
        </h4>
        <h4
          onClick={() => setTab(2)}
          className={`cursor-pointer border-b ${tab === 2 ? "border-b-red-600 text-red-600" : ""}`}
        >
          Login & Security
        </h4>
      </div>
      {tab === 1 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mx-auto my-8 flex flex-col justify-center gap-9 sm:flex-row sm:justify-start ">
              <div className="mr-10 flex flex-col">
                <p className="text-gray-200 mb-2 capitalize">
                  your profile picture
                </p>
                {!form.getValues("avater") ? (
                  <div
                    {...getRootProps({
                      className:
                        "border border-black py-4 cursor-pointer rounded",
                    })}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center justify-center gap-4 ">
                      <BsFillCloudArrowUpFill className="h-[40px] w-[40px] " />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>Select Avater</p>
                      )}
                    </div>
                  </div>
                ) : null}

                {files.map((file, i) => (
                  <div key={i} className=" mt-3">
                    <Image
                      src={file.preview}
                      alt={file.name}
                      width={100}
                      height={100}
                      onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                      }}
                      className="mx-5 h-20 w-20 rounded-full object-cover "
                    />
                    <button
                      type="button"
                      className=" text-gray-600 mt-4 flex items-center justify-center transition-colors"
                      onClick={() => {}}
                    >
                      {Upload}
                    </button>
                  </div>
                ))}
                {typeof form.getValues("avater") === "string" &&
                form
                  .getValues("avater")
                  .startsWith("https://firebasestorage") ? (
                  <div className="  ">
                    <Image
                      width={100}
                      height={100}
                      className="mx-5 h-20 w-20   rounded-full  object-cover"
                      src={form.getValues("avater")}
                      alt="person"
                    />
                    <button
                      type="button"
                      className=" text-gray-600 mt-4 flex items-center justify-center transition-colors"
                      onClick={() => {}}
                    >
                      {Upload}
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-5 lg:flex-row">
                <ReaderCard text="Reading" count={12} type="one" />
                <ReaderCard text="Donated" count={1} type="two" />
              </div>
            </div>

            <div className="flex max-w-lg flex-col gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name </FormLabel>
                    <FormControl>
                      <Input disabled={false} {...field} />
                    </FormControl>
                    <FormMessage className="text-red-800" />
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
                      <Input disabled={false} {...field} />
                    </FormControl>
                    <FormMessage className="text-red-800" />
                  </FormItem>
                )}
              />
            </div>
            <div className="  my-4 flex gap-4 ">
              <Button type="button" disabled={loading} variant={"outline"}>
                Cancle
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="text-white [background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)]"
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      )}
      {tab === 2 && <PasswordChange />}
    </section>
  );
}
