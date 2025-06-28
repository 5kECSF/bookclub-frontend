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
import { BASE_URL, MTD } from "@/lib/constants";
import { useCleanReqState } from "@/lib/state/hooks/useMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CodeValidator, TCodeSchema } from "../models";
interface CodeParam {
  url: string;
}
const otpStyle = {
  box: "h-12 w-12   text-lg  sm:text-xl",
};

const VerifyCodeComponent = ({ url }: CodeParam) => {
  // const params = use(props.params);
  const router = useRouter();
  const params = useParams();
  const { makeReq, loading } = useCleanReqState();

  const form = useForm<TCodeSchema>({
    resolver: zodResolver(CodeValidator),
    defaultValues: { phoneOrEmail: decodeURIComponent(params?.code as string) },
  });

  const onSubmit = async (data: TCodeSchema) => {
    if (!data.phoneOrEmail || data.phoneOrEmail == "undefined") {
      toast.warning("The Email is not populated");
      return;
    }

    const datas = await makeReq(`${BASE_URL}/${url}`, data, MTD.POST); // mutation.mutateAsync({ url: API.register, body: data, method: MTD.POST })
    if (!datas.ok) {
      toast.error(datas.message);
      return;
    }
    toast.success(" Verification Successful");
    form.reset();
    router.push(`/signin`);
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

            <SubmitInput loading={loading} title={"Verify Code"} />
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

export default VerifyCodeComponent;
