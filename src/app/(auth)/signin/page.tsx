"use client";
import { AuthLayout } from "@/app/(auth)/_components/authLayout";
import {
  GoToLink,
  Password,
  SubmitInput,
  UserNameInput,
} from "@/app/(auth)/_components/inputs";
import { useAuth } from "@/lib/context/auth.context";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { LoginValidator, TLoginSchema } from "../models";

const SignIn: React.FC = () => {
  const { loading, login, refreshToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginSchema>({ resolver: zodResolver(LoginValidator) });

  const refresh = async (e:any) => {
    e.preventDefault();
    try{
      const data = await refreshToken();
    console.log("the refreshed data ===", data);
    }catch(e:any){
      console.log("err-=",e)
    }
    
  };

  const onSubmit = async (input: TLoginSchema) => {
    try {
      const data = await login(input?.userName, input.password);
      console.log("Login data ===", data);
      toast.success(`Successfully logged In as ${data?.user_data?.email}`);
    } catch (e: any) {
      console.log("login error is ==", e.message);
    }
  };

  return (
    <>
      <AuthLayout title={"Login"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UserNameInput
            register={register("userName")}
            error={errors.userName}
            placeholder={"Enter User Name"}
          />
          <Password
            register={register("password")}
            error={errors.password}
            placeHolder={"Enter Password"}
            label={"Password"}
          />
          <SubmitInput title={"Login"} loading={loading} />
          <button onClick={refresh}>refresh</button>
          <GoToLink
            path={"/signup"}
            text1={" Don’t have any account?"}
            text2="Sign Up"
          />
        </form>
      </AuthLayout>
    </>
  );
};

export default SignIn;
