import {
  GoogleSvg,
  PassowrdSvg,
  EmailSvg,
} from "@/app/(auth)/_components/svgs";
import React from "react";
import Link from "next/link";
import { LucideMail, LucideUser } from "lucide-react";

export function GoogleSignin() {
  return (
    <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
      <span>
        <GoogleSvg />
      </span>
      Sign up with Google
    </button>
  );
}
interface GoToLinkProps {
  path: string;
  text1: string;
  text2: string;
}

export function GoToLink({ path, text1, text2 }: GoToLinkProps) {
  return (
    <div className="mt-6 text-center">
      <p>
        {text1}{" "}
        <Link href={path} className="text-primary">
          {text2}
        </Link>
      </p>
    </div>
  );
}
export function EmailInputs({ register, error, placeholder }: any) {
  return (
    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Email
      </label>
      <div className="relative">
        <input
          {...register}
          type="email"
          placeholder={placeholder}
          required
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />

        <span className="absolute right-4 top-4">
          <LucideMail className="text-current" />
        </span>
        {error && <p className="text-red">{error.message}</p>}
      </div>
    </div>
  );
}
export function EmailInput({ register, error }: any) {
  return (
    <div className="mb-4">
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
        {error && <p className="text-red">{error.message}</p>}
      </div>
    </div>
  );
}

export function Password({ register, error, placeHolder, label }: any) {
  return (
    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        {label}
      </label>
      <div className="relative">
        <input
          {...register}
          type="password"
          required
          placeholder={placeHolder}
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />

        <span className="absolute right-4 top-4">
          <PassowrdSvg />
        </span>
        {error && <p className="text-red">{error.message}</p>}
      </div>
    </div>
  );
}

export function NameInput({ register, error, placeholder }: any) {
  return (
    <div>
      <input
        {...register}
        type="text"
        required
        placeholder={placeholder}
        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      />
      {/*<span className="absolute right-4 top-4"><SvgSignup2/></span>*/}
      {error && <p className="text-red">{error.message}</p>}
    </div>
  );
}

export function UserNameInput({ register, error, placeholder, lable }: any) {
  return (
    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        {lable}
      </label>
      <div className="relative">
        <input
          {...register}
          type="text"
          placeholder={placeholder}
          required
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />

        <span className="absolute right-4 top-4">
          <LucideUser className="text-current" />
        </span>
        {error && <p className="text-red">{error.message}</p>}
      </div>
    </div>
  );
}

export function SubmitInput({ loading = false, title }: any) {
  return (
    <div className="mb-5">
      <input
        disabled={loading}
        type="submit"
        value={title}
        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
      />
    </div>
  );
}
