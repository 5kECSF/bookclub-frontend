"use client";
import { AuthLayout } from "@/app/(auth)/_components/authLayout";
import {
  GoToLink,
  SubmitInput,
  UserNameInput,
} from "@/app/(auth)/_components/inputs";
import "@/assets/css/style.css";
import { BASE_URL } from "@/lib/constants";
import { API } from "@/lib/constants/api-paths";
import { HandleAxiosErr } from "@/lib/functions/axios.error";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CodeValidator, TCodeSchema } from "../../models";
// import { usePathname } from "next/navigation";
interface Params {
  code: string;
}

const VerifyCode=(params:any) => {
  // const params = use(props.params);
  const router = useRouter();
  // const pathname = usePathname();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCodeSchema>({
    resolver: zodResolver(CodeValidator),
    defaultValues: { phoneOrEmail: decodeURIComponent(params.code) },
  });

  const onSubmit = async (data: TCodeSchema) => {
    try {
      // console.log("before Reg data==", data, params.code, "pathName", pathname);
      const datas = await axios.post(`${BASE_URL}/${API.activate}`, data); // mutation.mutateAsync({ url: API.register, body: data, method: MTD.POST })
      console.log("registration data==", datas);
      toast.success("Account Successfully Verified");
      reset();
      router.push(`/signin`);
      console.log("data====||", datas);
    } catch (e: any) {
      const resp = HandleAxiosErr(e);
      toast.error(resp.Message);
    }
  };

  return (
    <>
      <AuthLayout title={"Sign Up"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UserNameInput
            register={register("code")}
            error={errors.code}
            placeholder={"verification code"}
          />
          {/*<NameInput*/}
          {/*  register={register("code")}*/}
          {/*  error={errors.code}*/}
          {/*  placeholder={"Code"}*/}
          {/*/>*/}

          <SubmitInput title={"Verify Code"} />
          {/*{!isEmptyObject(errors) ? `${JSON.stringify(errors)}` : ""}*/}
          <GoToLink
            path={"/signup"}
            text1={"Didnt Get Code?"}
            text2="Register"
          />
        </form>
      </AuthLayout>
    </>
  );
};

export default VerifyCode;
