"use client";
import { AuthLayout } from "@/app/(auth)/_components/authLayout";
import { GoToLink, SubmitInput } from "@/app/(auth)/_components/inputs";
import "@/assets/css/style.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { BASE_URL } from "@/lib/constants";
import { API } from "@/lib/constants/api-paths";
import { HandleAxiosErr } from "@/lib/functions/axios.error";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CodeValidator, TCodeSchema } from "../../models";
interface Params {
  code: string;
}
const otpStyle = {
  box: "h-12 w-12   text-lg  sm:text-xl",
};
const VerifyCode = (props: any) => {
  // const params = use(props.params);
  const router = useRouter();
  const params = useParams();

  const form = useForm<TCodeSchema>({
    resolver: zodResolver(CodeValidator),
    defaultValues: { phoneOrEmail: decodeURIComponent(params?.code as string) },
  });

  const onSubmit = async (data: TCodeSchema) => {
    try {
      if (!data.phoneOrEmail || data.phoneOrEmail == "undefined") {
        toast.warning("The Email is not populated");
        return;
      }
      console.log("before Reg data==", data);
      const datas = await axios.post(`${BASE_URL}/${API.activate}`, data); // mutation.mutateAsync({ url: API.register, body: data, method: MTD.POST })
      console.log("registration data==", datas);
      toast.success("Account Successfully Verified");
      form.reset();
      router.push(`/signin`);
      console.log("data====||", datas);
    } catch (e: any) {
      const resp = HandleAxiosErr(e);
      toast.error(resp.Message);
    }
  };

  return (
    <>
      <AuthLayout title={"Verfiy Code"}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex-col items-center justify-center space-y-6"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="w-full flex-col items-center justify-center align-middle">
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={4} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot className={otpStyle.box} index={0} />
                        <InputOTPSlot className={otpStyle.box} index={1} />
                        <InputOTPSlot className={otpStyle.box} index={2} />
                        <InputOTPSlot className={otpStyle.box} index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the code sent via email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState?.errors?.code && (
              <p className="text-red">{form.formState?.errors?.code.message}</p>
            )}

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
        </Form>
      </AuthLayout>
    </>
  );
};

export default VerifyCode;
