import {GoogleSvg, PassowrdSvg, EmailSvg} from "@/app/(auth)/_components/svgs"
import React from "react"
import Link from "next/link"

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
                      <EmailSvg />
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
                      <PassowrdSvg />
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

export function SubmitInput({loading= false, title}) {
  return <div className="mb-5">
    <input disabled={loading}
      type="submit"
      value={title}
      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
    />
  </div>
}


