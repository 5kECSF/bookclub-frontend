"use client";
import { Password } from "@/app/(auth)/_components/inputs";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { MTD } from "@/lib/constants";
import { API } from "@/lib/constants/routes";
import { DisplayErrors } from "@/lib/functions/object";
import { useAuth } from "@/lib/state/context/jotai-auth";
import { useMakeReqState } from "@/lib/state/hooks/useMutation";
import { passwordChangeType } from "@/lib/validator/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { changePwdValidator, TChangePwdSchema } from "./model";

const PasswordChange = ({ value }: { value: string }) => {
  const { makeReq, loading } = useMakeReqState();
  const { logout } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TChangePwdSchema>({ resolver: zodResolver(changePwdValidator) });

  const onSubmit = async (data: TChangePwdSchema) => {
    const body: passwordChangeType = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    const resp = await makeReq(API.changePwd, body, MTD.PATCH);
    if (!resp.ok) {

      toast.error(resp.message);
      return;
    }
    toast.success(`password update success`);
    logout();
    reset();
  };

  return (
    <TabsContent value={value} className="items-center justify-center p-6">
      <div className="mt-8 flex flex-col items-center  justify-center  gap-2 dark:bg-boxdark-2">
        <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
          <Password
            register={register("oldPassword")}
            error={errors.oldPassword}
            placeHolder={"6+ Characters, 1 Capital letter"}
            label={"Old Password"}
          />
          <Password
            register={register("newPassword")}
            error={errors.newPassword}
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
