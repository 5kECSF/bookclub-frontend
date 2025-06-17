"use client";
import { Password } from "@/app/(auth)/_components/inputs";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { MTD } from "@/lib/constants";
import { DisplayErrors } from "@/lib/functions/object";
import { useMakeReqState } from "@/lib/state/hooks/useMutation";
import { passwordChangeType } from "@/lib/validator/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { changePwdValidator, TChangePwdSchema } from "../models";

const PasswordChange = ({ value }: { value: string }) => {
  const { makeReq, loading } = useMakeReqState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TChangePwdSchema>({ resolver: zodResolver(changePwdValidator) });

  const onSubmit = async (data: TChangePwdSchema) => {
    const body: passwordChangeType = {
      oldPassword: data.oldPassword,
      newPassword: data.password,
    };

    const resp = await makeReq("auth/changePassword", body, MTD.PATCH);
    if (!resp.ok) {
      console.log("````````````````````error data", resp.body);
      toast.error(resp.message);
    }
    toast.success(`password update success`);
    reset();
  };

  return (
    <TabsContent value={value} className="mt-6">
      <div className="mt-8 flex max-w-lg flex-col gap-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Password
            register={register("oldPassword")}
            error={errors.oldPassword}
            placeHolder={"6+ Characters, 1 Capital letter"}
            label={"Old Password"}
          />
          <Password
            register={register("password")}
            error={errors.password}
            placeHolder={"6+ Characters, 1 Capital letter"}
            label={"New Password"}
          />
          <Password
            register={register("confirmPassword")}
            error={errors.confirmPassword}
            placeHolder={"Re-enter your password"}
            label={"Re-type Password"}
          />

          <div className="  my-4 flex gap-4 ">
            <Button
              disabled={loading}
              onClick={() => reset()}
              type="button"
              variant={"outline"}
            >
              Cancle
            </Button>
            {/* <SubmitInput title={"Create account"} /> */}
            <Button
              disabled={loading}
              type="submit"
              className="bg-black text-white"
            >
              Change
            </Button>
            {DisplayErrors(errors)}
          </div>
        </form>
      </div>
    </TabsContent>
  );
};

export default PasswordChange;
