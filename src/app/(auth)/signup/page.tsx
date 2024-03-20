"use client"
import React from "react"
import "@/css/style.css";
// import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb"
// import {Metadata} from "next";
import { useMutate } from "@/lib/hooks/useMutation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupValidator, TSignupSchema } from "../models"
import { toast } from "react-toastify"
import { MTD } from "@/lib/constants"
import { API } from "@/lib/constants/api-paths"
import {
  EmailInput,
  GoogleSignin,
  GoToLink,
  NameInput,
  Password,
  SubmitInput,
} from "@/app/(auth)/_components/inputs"
import {AuthLayout} from "@/app/(auth)/_components/authLayout";


const SignUp: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignupSchema>({ resolver: zodResolver(SignupValidator) })

  const mutation = useMutate()

  const onSubmit = async (data: TSignupSchema) => {
    try {
      const datas = await mutation.mutateAsync({ url: API.register, body: data, method: MTD.POST })
      toast.success("Successfully Registered")
      reset()
      console.log("data====||", datas)
    } catch (e) {
      toast.error(e.message)
      console.log(e)
    }
  }

  return (
    <>
      {/*<Breadcrumb pageName="Sign Up" />*/}
      <AuthLayout title={"Sign Up to KSA"}>
        <form onSubmit={handleSubmit(onSubmit)}>


          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Name
            </label>

            <div className="grid grid-cols-2 gap:4 md:gap-20">

              <NameInput register={register("fName")} error={errors.fName} placeholder={"First Name"} />
              <NameInput register={register("lName")} error={errors.lName} placeholder={"Last Name"} />
            </div>
          </div>
          <EmailInput register={register("email")} error={errors.email} />
          <Password register={register("password")} error={errors.password}
                    placeHolder={"6+ Characters, 1 Capital letter"} label={"Password"} />
          <Password register={register("confirmPassword")} error={errors.confirmPassword}
                    placeHolder={"Re-enter your password"} label={"Re-type Password"} />
          {console.log(errors)}
          {/*===========   Submit button*/}
          <SubmitInput title={"Create account"}/>
          {/*  ==============  Signup With Google    ========  */}
          <GoogleSignin />

          <GoToLink path={"/auth/signin"} text={"Already have an account?"} />
        </form>
      </AuthLayout>

    </>
  )
}

export default SignUp
