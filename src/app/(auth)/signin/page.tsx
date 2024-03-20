"use client"
import React from "react"
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb"
import { EmailInput, GoogleSignin, GoToLink, Password, SubmitInput } from "@/app/(auth)/_components/inputs"
import { useForm } from "react-hook-form"
import { LoginValidator, TLoginSchema } from "../models"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/lib/context/auth.context"
import {AuthLayout} from "@/app/(auth)/_components/authLayout";
import {toast} from "react-toastify";


const SignIn: React.FC = () => {

  const { loading, login, refreshToken } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginSchema>({ resolver: zodResolver(LoginValidator) })
  const refresh = async (e) => {
    e.preventDefault()
    const data = await refreshToken()
    console.log("the refreshed data is===", data)
  }
  const onSubmit = async (input: TLoginSchema) => {
    try {
      // console.log("---------}submitting", data)
    const data = await login(input?.email, input.password)
      toast.success(`Successfully logged In as ${data?.user_data.email}`)
    } catch (e) {
      console.log("login error is ==", e.message)
    }
  }
  return (
    <>
      {/*<Breadcrumb pageName="Sign In" />*/}
      <AuthLayout title={" Login"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <EmailInput register={register("email")} error={errors.email} />
          <Password register={register("password")} error={errors.password}
                    placeHolder={"Enter Password"} label={"Password"} />
          <SubmitInput title={"Login"} loading={loading}/>
          <GoogleSignin />
          <button onClick={refresh}>refresh</button>
          <GoToLink path={"/signup"} text={" Don’t have any account?"} />
        </form>
      </AuthLayout>
    </>
  )
}

export default SignIn
