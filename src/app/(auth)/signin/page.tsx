"use client";
import { AuthLayout } from "@/app/(auth)/_components/authLayout";
import {
  GoToLink,
  Password,
  SubmitInput,
  UserNameInput,
} from "@/app/(auth)/_components/inputs";
import { DisplayErrors } from "@/lib/functions/object";
import { useAuth } from "@/lib/state/context/jotai-auth";
import { RoleType } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoginValidator, TLoginSchema } from "../models";

const SignIn: React.FC = () => {
  const { loading, login } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({ resolver: zodResolver(LoginValidator) });

  // const refresh = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     const data = await refreshToken();
  //     console.log("the refreshed data ===", data);
  //   } catch (e: any) {
  //     console.log("err-=", e.message);
  //   }
  // };

  const onSubmit = async (input: TLoginSchema) => {
    const data = await login(input);
    if (!data.ok) {
      toast.error(`${data.message}`);
      return;
    }
    toast.success(`Successfully logged In as ${data.body.user_data?.email}`, {
      duration: 2000,
    });
    if (data.body.user_data?.role == RoleType.ADMIN) {
      router.push("/");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <AuthLayout title={"Login"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UserNameInput
            register={register("info")}
            error={errors.info}
            placeholder={"Enter User Name"}
          />
          <Password
            register={register("password")}
            error={errors.password}
            placeHolder={"Enter Password"}
            label={"Password"}
          />
          <SubmitInput title={"Login"} loading={loading} />
          {/* <button onClick={refresh}>refresh</button> */}
          <GoToLink
            path={"/signup"}
            text1={" Don’t have any account?"}
            text2="Sign Up"
          />
          <GoToLink
            path={"/resetPwd"}
            text1={" Forgot Password?"}
            text2="Reset Password"
          />
          {DisplayErrors(errors)}
        </form>
      </AuthLayout>
    </>
  );
};

export default SignIn;
