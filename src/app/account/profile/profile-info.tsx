"use client";
import { SelectInput } from "@/components/forms/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { MTD } from "@/lib/constants";
import { KY } from "@/lib/constants/routes";
import { useMakeReqState } from "@/lib/state/hooks/useMutation";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { deptData, IUser, teamData } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PencilIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { IdImgSection } from "./id-update";
import { ProfileValidator, TProfile } from "./model";

export const ProfileUpdateSection = ({
  value,
  user,
}: {
  value: string;
  user: IUser;
}) => {
  // const { user } = useAuth();
  const { data } = useFetch<IUser>([KY.profile], `${KY.profile}`, {});
  const [editing, setEditing] = useState(false);
  // const [curUser, setCurUser] = useState(user);
  const { loading, makeReq } = useMakeReqState();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TProfile>({
    resolver: zodResolver(ProfileValidator),
    defaultValues: { ...data },
  });
  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);
  const onSubmit = async (data: TProfile) => {
    const resp = await makeReq(`${KY.profile}`, data, MTD.PATCH);
    if (!resp.ok) {
      toast.error(resp.message);
      return;
    }
    setEditing(false);
    await queryClient.invalidateQueries({ queryKey: [KY.book] });
    toast.success("Succesfully updated profile");
  };
  return (
    <TabsContent value={value} className="mt-6">
      <IdImgSection />
      <div className="right-[25px] top-[287px] z-10 ml-auto flex">
        {/* =============     penciel  button ==============*/}
        <div className="ml-auto">
          <Button
            onClick={() => {
              reset();
              setEditing(!editing);
            }}
            variant="outline"
            size="icon"
            className={`ml-auto h-12 w-12 rounded-[20px] shadow-[0px_0px_10px_#e1e1e1a3] ${
              editing ? "bg-orange-600 text-white hover:bg-orange-600" : ""
            }`}
          >
            {editing ? (
              <X className="h-[22px] w-[22px]" />
            ) : (
              <PencilIcon className="h-[22px] w-[22px]" />
            )}
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-4 px-4">
        {/* =============     Form fields ==============*/}
        <div className="mb-8 grid grid-cols-2 gap-6">
          <ProfileInput<TProfile>
            name="firstName"
            lable="first name"
            register={register}
            editing={editing}
            errors={errors}
          />
          <ProfileInput<TProfile>
            name="lastName"
            lable="last name"
            register={register}
            editing={editing}
            errors={errors}
          />
          <SelectInput
            data={teamData}
            register={register}
            errors={errors}
            disabled={!editing}
            handleChange={() => {}}
            idx={"name"}
            label={"Team Name"}
            name={"team"}
            placeholder={"select categories"}
          />
          <SelectInput
            data={deptData}
            register={register}
            errors={errors}
            disabled={!editing}
            handleChange={() => {}}
            idx={"name"}
            label={"Department Name"}
            name={"department"}
            placeholder={"select Your Department"}
          />

          <div className="flex flex-col gap-2">
            <label
              className={`text-base font-medium [font-family:'Inter-Medium',Helvetica] ${
                !editing
                  ? "text-gray-400 cursor-not-allowed opacity-50"
                  : "text-[#4c535f]"
              }`}
            >
              phone number
            </label>
            <div className="flex h-[52px] overflow-hidden rounded-lg border border-solid border-[#e0e4ec]">
              <div className="flex items-center px-3.5 text-sm font-medium text-[#8d98aa] [font-family:'Manrope-Medium',Helvetica]">
                +251
              </div>
              <div className="my-2.5 h-[30px] w-px bg-[#e0e4ec]"></div>
              <Input
                {...register("phoneInfo")}
                disabled={!editing}
                // defaultValue={userData.phoneNumber}
                className="h-full border-none text-sm font-medium text-[#8d98aa] [font-family:'Inter-Medium',Helvetica]"
              />
            </div>
            {errors["phoneInfo"] && (
              <p className="text-red">{errors["phoneInfo"].message}</p>
            )}
          </div>
          <ProfileInput<IUser>
            name="idNumber"
            lable="Id Number"
            register={register}
            editing={false}
            errors={errors}
          />
          <ProfileInput<IUser>
            name="email"
            lable="email"
            register={register}
            editing={false}
            errors={errors}
          />
        </div>

        {/* Bio section */}
        <div className="mb-8 flex flex-col gap-2">
          <label
            className={`text-base font-medium [font-family:'Inter-Medium',Helvetica] ${
              !editing
                ? "text-gray-400 cursor-not-allowed opacity-50"
                : "text-[#4c535f]"
            }`}
          >
            Bio
          </label>
          <Textarea
            {...register("bio")}
            disabled={!editing}
            className="h-[158px] rounded-lg border border-solid border-[#e0e4ec] bg-[#fafbfc] p-3.5 text-sm font-medium text-[#8d98aa] [font-family:'Inter-Medium',Helvetica]"
          />
        </div>
        <div className="flex items-center gap-8">
          <Button
            disabled={!editing || loading}
            type="submit"
            className="h-[49px] rounded-lg bg-[#f4683c] px-[35px] py-3 text-lg font-bold text-white [font-family:'Inter-Bold',Helvetica] hover:bg-[#f4683c]/90"
          >
            {loading ? "...loading" : "Update Profile"}
          </Button>
          {editing && (
            <Button
              onClick={() => {
                reset();
                setEditing(false);
              }}
              variant="outline"
              className="h-auto p-2 text-lg font-medium text-[#4c535f] [font-family:'Inter-Medium',Helvetica]"
            >
              Reset
            </Button>
          )}
        </div>
      </form>

      {/* Action buttons */}
    </TabsContent>
  );
};

interface PInputProps<T extends FieldValues> {
  lable: string;
  defaultVal?: string;
  name: keyof T;
  register?: any;
  req?: boolean;
  editing: boolean;
  errors?: any;
}
export function ProfileInput<T extends FieldValues>({
  lable,
  defaultVal,
  register,
  name,
  req = true,
  editing,
  errors,
}: PInputProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className={`text-base font-medium [font-family:'Inter-Medium',Helvetica] ${
          !editing
            ? "text-gray-400 cursor-not-allowed opacity-50"
            : "text-[#4c535f]"
        }`}
      >
        {lable} {req && <span className="text-meta-1">*</span>}
      </label>
      <Input
        disabled={!editing}
        {...register(name)}
        // defaultValue={defaultVal}
        className="h-[52px] rounded-lg border border-solid border-[#e0e4ec] text-sm font-medium text-[#3c4451] [font-family:'Inter-Medium',Helvetica]"
      />
      {errors[name] && <p className="text-red">{errors[name].message}</p>}
    </div>
  );
}
