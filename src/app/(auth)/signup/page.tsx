"use client";
import React from "react";
import "@/css/style.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupValidator, TSignupSchema } from "../models";
import { toast } from "react-toastify";
import { BASE_URL, MTD } from "@/lib/constants";
import { API } from "@/lib/constants/api-paths";
import {
  GoToLink,
  NameInput,
  Password,
  SubmitInput,
  UserNameInput,
} from "@/app/(auth)/_components/inputs";
import { AuthLayout } from "@/app/(auth)/_components/authLayout";
import axios from "axios";

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignupSchema>({ resolver: zodResolver(SignupValidator) });

  const onSubmit = async (data: TSignupSchema) => {
    try {
      const datas = await axios.post(`${BASE_URL}/${API.register}`, data); // mutation.mutateAsync({ url: API.register, body: data, method: MTD.POST })
      console.log("registration data==", datas);
      toast.success("Successfully Registered");
      reset();
      console.log("data====||", datas);
    } catch (e: any) {
      toast.error(e.message);
      console.log(e);
    }
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
                  register={register("fName")}
                  error={errors.fName}
                  placeholder={"First Name"}
                />
              </div>
              <div className="flex-1">
                <NameInput
                  register={register("lName")}
                  error={errors.lName}
                  placeholder={"Last Name"}
                />
              </div>
            </div>
          </div>
          <UserNameInput
            register={register("userName")}
            error={errors.userName}
            placeholder={"User Name"}
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
          <SubmitInput title={"Create account"} />

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
