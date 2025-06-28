"use client";
import { AuthLayout } from "@/app/(auth)/_components/authLayout";
import {
  EmailInput,
  GoToLink,
  NameInput,
  Password,
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
import { SignupValidator, TSignupSchema } from "../models";

const SignUp: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignupSchema>({ resolver: zodResolver(SignupValidator) });

  const { makeReq, loading } = useCleanReqState();

  const onSubmit = async (data: TSignupSchema) => {
    const datas = await makeReq(`${BASE_URL}/${API.register}`, data, MTD.POST); // mutation.mutateAsync({ url: API.register, body: data, method: MTD.POST })
    if (!datas.ok) {
      toast.error(datas.message);
      return;
    }
    reset();
    router.push(`/signup/${data.email}`);
  };

  return (
    <>
      <AuthLayout title={"Sign Up"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Name
            </label>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <NameInput
                  register={register("firstName")}
                  error={errors.firstName}
                  placeholder={"First Name"}
                />
              </div>
              <div className="flex-1">
                <NameInput
                  register={register("lastName")}
                  error={errors.lastName}
                  placeholder={"Last Name"}
                />
              </div>
            </div>
          </div>
          <EmailInput
            register={register("email")}
            error={errors.email}
            placeholder={"email"}
          />
          <Password
            register={register("password")}
            error={errors.password}
            placeHolder={"6+ Characters, 1 Capital letter"}
            label={"Password"}
          />
          <Password
            register={register("confirmPassword")}
            error={errors.confirmPassword}
            placeHolder={"Re-enter your password"}
            label={"Re-type Password"}
          />
          <SubmitInput loading={loading} title={"Create account"} />
          {DisplayErrors(errors)}
          <GoToLink
            path={"/signin"}
            text1={"Already have an account?"}
            text2="Sign In"
          />
          <GoToLink
            path={"/resetPwd"}
            text1={" Forgot Password?"}
            text2="Reset Password"
          />
        </form>
      </AuthLayout>
    </>
  );
};

export default SignUp;
