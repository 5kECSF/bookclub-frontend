"use client";
import { EmailInput, SubmitInput } from "@/app/(auth)/_components/inputs";
import "@/assets/css/style.css";
import { BASE_URL, MTD } from "@/lib/constants";
import { API } from "@/lib/constants/routes";
import { DisplayErrors } from "@/lib/functions/object";
import { useMakeReqState } from "@/lib/state/hooks/useMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { NewEmailValidator, TNewEmailSchema } from "../model";

const ChangeEmail: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TNewEmailSchema>({ resolver: zodResolver(NewEmailValidator) });
  const { makeReq, loading } = useMakeReqState();

  const onSubmit = async (data: TNewEmailSchema) => {
    const datas = await makeReq(
      `${BASE_URL}/${API.requestEmailChange}`,
      data,
      MTD.POST,
    ); // mutation.mutateAsync({ url: API.register, body: data, method: MTD.POST })
    if (!datas.ok) {
      toast.error(datas.message);
      return;
    }
    reset();
    router.push(`/account/profile/changeEmail`);
  };

  return (
    <div className="mt-8 flex w-full  items-center justify-center p-4 dark:bg-boxdark-2">
      <form className="w-full max-w-lg p-8" onSubmit={handleSubmit(onSubmit)}>
        <EmailInput
          register={register("newEmail")}
          error={errors.newEmail}
          placeholder={"new email"}
        />
        <SubmitInput loading={loading} title={"Change Email"} />
        {DisplayErrors(errors)}
      </form>
      <div />
    </div>
  );
};

export default ChangeEmail;
