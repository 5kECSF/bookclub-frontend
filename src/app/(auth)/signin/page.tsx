"use client"
import "@/css/style.css";
import React from "react"
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb"
import { AuthLayout, EmailInput, GoogleSignin, GoToLink, Password, SubmitInput } from "@/app/(auth)/_components/inputs"
import { useForm } from "react-hook-form"
import { LoginValidator, TLoginSchema } from "../models"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/lib/context/auth.context"


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
  const onSubmit = async (data: TLoginSchema) => {
    try {
      // console.log("---------}submitting", data)
      await login(data.email, data.password)
      // toa  st(response?.user_data?.email)

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
          <SubmitInput loading={loading}/>
          <GoogleSignin />
          <button onClick={refresh}>refresh</button>
          <GoToLink path={"/signup"} text={" Don’t have any account?"} />
        </form>
      </AuthLayout>
    </>
  )
}

export default SignIn
