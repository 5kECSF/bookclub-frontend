"use client";
import { AuthLayout } from "@/app/(auth)/_components/authLayout";
import {
  EmailInput,
  GoToLink,
  SubmitInput,
} from "@/app/(auth)/_components/inputs";
import "@/assets/css/style.css";
import { BASE_URL, MTD } from "@/lib/constants";
import { API } from "@/lib/constants/routes";
import { DisplayErrors } from "@/lib/functions/object";
import { useCleanReqState } from "@/lib/state/hooks/useMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ForgotPwdValidator, TForgotPwdSchema } from "../models";

const SignUp: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TForgotPwdSchema>({ resolver: zodResolver(ForgotPwdValidator) });

  const { makeReq, loading } = useCleanReqState();

  const onSubmit = async (data: TForgotPwdSchema) => {
    //Todo set signup email
    const datas = await makeReq(`${BASE_URL}/${API.forgotPwd}`, data, MTD.POST);
    if (!datas.ok) {
      toast.error(datas.message);
      return;
    }
    reset();
    router.push(`/resetPwd/${data.email}`);

  };

  return (
    <>
      <AuthLayout title={"Reset Your Passowrd"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <EmailInput
            register={register("email")}
            error={errors.email}
            placeholder={"email"}
          />
          <SubmitInput loading={loading} title={"Reset Your Passord"} />
          {DisplayErrors(errors)}
          <GoToLink
            path={"/signin"}
            text1={"Already have an account?"}
            text2="Sign In"
          />
        </form>
      </AuthLayout>
    </>
  );
};

export default SignUp;
