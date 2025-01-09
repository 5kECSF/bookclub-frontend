"use client";
import React, { useState } from "react";
import "@/assets/css/style.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CodeValidator, TCodeSchema } from "../../models";
import { toast } from "react-toastify";
import { BASE_URL, MTD } from "@/lib/constants";
import { API } from "@/lib/constants/api-paths";
import {
  GoToLink,
  UserNameInput,
  SubmitInput,
} from "@/app/(auth)/_components/inputs";
import { AuthLayout } from "@/app/(auth)/_components/authLayout";
import axios from "axios";
import { HandleAxiosErr } from "@/lib/functions/axios.error";
import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
interface Params {
  code: string;
}

const VerifyCode: React.FC<{ params: Params }> = ({ params }) => {
  const router = useRouter();
  // const pathname = usePathname();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCodeSchema>({
    resolver: zodResolver(CodeValidator),
    defaultValues: { phoneOrEmail: decodeURIComponent(params.code) },
  });

  const onSubmit = async (data: TCodeSchema) => {
    try {
      // console.log("before Reg data==", data, params.code, "pathName", pathname);
      const datas = await axios.post(`${BASE_URL}/${API.activate}`, data); // mutation.mutateAsync({ url: API.register, body: data, method: MTD.POST })
      console.log("registration data==", datas);
      toast.success("Account Successfully Verified");
      reset();
      router.push(`/signin`);
      console.log("data====||", datas);
    } catch (e: any) {
      const resp = HandleAxiosErr(e);
      toast.error(resp.Message);
    }
  };

  return (
    <>
      <AuthLayout title={"Sign Up"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UserNameInput
            register={register("code")}
            error={errors.code}
            placeholder={"verification code"}
          />
          {/*<NameInput*/}
          {/*  register={register("code")}*/}
          {/*  error={errors.code}*/}
          {/*  placeholder={"Code"}*/}
          {/*/>*/}

          <SubmitInput title={"Verify Code"} />
          {/*{!isEmptyObject(errors) ? `${JSON.stringify(errors)}` : ""}*/}
          <GoToLink
            path={"/signup"}
            text1={"Didnt Get Code?"}
            text2="Register"
          />
        </form>
      </AuthLayout>
    </>
  );
};

export default VerifyCode;
