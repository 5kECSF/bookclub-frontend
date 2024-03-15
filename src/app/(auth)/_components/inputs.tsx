import { GoogleSvg, Svg5, Svg6 } from "@/app/(auth)/_components/svgs"
import React from "react"
import Link from "next/link"
import { SidebarImage } from "@/app/(auth)/_components/sidebarImage"

export function GoogleSignin() {
  return <button
    className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                  <span>
                    <GoogleSvg />
                  </span>
    Sign up with Google
  </button>
}

export function GoToLink({ path, text }) {
  return <div className="mt-6 text-center">
    <p>
      {text}{" "}
      <Link href={path} className="text-primary">
        Sign in
      </Link>
    </p>
  </div>
}

export function EmailInput({ register, error }) {
  return <div className="mb-4">
    <label className="mb-2.5 block font-medium text-black dark:text-white">
      Email
    </label>
    <div className="relative">
      <input
        {...register}
        type="email"
        placeholder="Enter your email"
        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      />

      <span className="absolute right-4 top-4">
                      <Svg6 />
                    </span>
      {error && <p className="text-red-500">{error.message}</p>}

    </div>
  </div>
}

export function Password({ register, error, placeHolder, label }) {
  return <div className="mb-4">
    <label className="mb-2.5 block font-medium text-black dark:text-white">
      {label}
    </label>
    <div className="relative">
      <input
        {...register}
        type="password"
        placeholder={placeHolder}
        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      />

      <span className="absolute right-4 top-4">
                      <Svg5 />
                    </span>
      {error && <p className="text-red-500">{error.message}</p>}

    </div>
  </div>
}

export function NameInput({ register, error, placeholder }) {
  return <div style={{ width: "30%" }} className="">
    <input
      {...register}
      type="text"
      placeholder={placeholder}
      className="rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
    />
    {/*<span className="absolute right-4 top-4"><SvgSignup2/></span>*/}
    {error && <p className="text-red-500">{error.message}</p>}

  </div>
}

export function SubmitInput({loading= false}) {
  return <div className="mb-5">
    <input disabled={loading}
      type="submit"
      value="Create account"
      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
    />
  </div>
}


export function AuthLayout({ children, title }) {
  return (
      <div className='flex  justify-center  items-center h-screen'>
        <div
            className="w-1/2  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap  items-center self-center">
            {/*<SidebarImage />*/}

            {/*<div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">*/}
            <div className="w-full border-stroke dark:border-strokedark ">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">

                <span className="mb-1.5 block font-medium">Start your Journey</span>
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  {title}
                </h2>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
  )


}
