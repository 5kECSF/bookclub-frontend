"use client";
import { AuthLayout } from "@/app/(auth)/_components/authLayout";
import { Password, SubmitInput } from "@/app/(auth)/_components/inputs";
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
import { BASE_URL, MTD } from "@/lib/constants";
import { API } from "@/lib/constants/routes";
import { useMakeReqState } from "@/lib/state/hooks/useMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ChangeEmailValidator, TChangeEmailSchema } from "../model";
interface Params {
  url: string;
}
const otpStyle = {
  box: "h-12 w-12   text-lg  sm:text-xl",
};

const VerifyCodeComponent = ({ url }: Params) => {
  // const params = use(props.params);
  const router = useRouter();

  const { makeReq, loading } = useMakeReqState();

  const form = useForm<TChangeEmailSchema>({
    resolver: zodResolver(ChangeEmailValidator),
    defaultValues: {},
  });

  const onSubmit = async (data: TChangeEmailSchema) => {
    console.log("before Reg data==", data);
    const datas = await makeReq(
      `${BASE_URL}/${API.verifyUpdateEmail}`,
      data,
      MTD.POST,
    );
    if (!datas.ok) {
      toast.error(datas.message);
      return;
    }
    //   console.log("registration data==", datas);
    toast.success(" Verification Successful");
    form.reset();
    router.push(`/signin`);
    // console.log("data====||", datas);
  };

  return (
    <>
      <AuthLayout title={"Change Your Email"}>
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
            <Password
              register={form.register("password")}
              error={form.formState.errors.password}
              placeHolder={"6+ Characters, 1 Capital letter"}
              label={"Password"}
            />

            <SubmitInput loading={loading} title={"Reset Email"} />
          </form>
        </Form>
      </AuthLayout>
    </>
  );
};

export default VerifyCodeComponent;
