import { AddEditWithFileLayout } from "@/components/admin/crud/add-edit-withFile-layout";
import {EmailField, PasswordField, TextAreaField} from "@/components/forms/useFormInputs";
import { KY } from "@/lib/constants";
import { InputField } from "@/components/forms/useFormInputs";
import {UserValidator, IUser, TUserDto, RoleType} from "@/app/admin/user/model-def";
import {AddEditLayout} from "@/components/admin/crud/add-edit-layout";
import {EmailInput, Password} from "@/app/(auth)/_components/inputs";
import React from "react";
import {SelectInput} from "@/components/forms/select";

interface IUserProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  user?: IUser;
}
export function AddEditModal({
  isOpen,
  onClose,
  isUpdate,
  user,
}: IUserProps) {
  return (
    <AddEditLayout<IUser, TUserDto>
      isOpen={isOpen}
      url={KY.user}
      onClose={() => onClose(false)}
      schema={UserValidator}
      isUpdate={isUpdate}
      data={user}
    >
      <EmailField
          name={"email"}
          placeholder={"email"}
      />
      <PasswordField
          placeHolder={"Enter Password"}
          label={"Password"}
          name={"password"}
      />
      <InputField
        label={"firstName"}
        name={"firstName"}
        placeholder={"write firstName"}
      />
      <InputField
        label={"lastName"}
        name={"lastName"}
        placeholder={"write lastName"}
      />
      <SelectInput
          // register={register}
          // errors={errors}
          // handleChange={handleChange}
          data={[{role: "ADMIN"},{role: "USER"}]}
          idx={"role"}
          dispIdx={"role"}
          label={"Role"}
          name={"role"}
          placeholder={"select Author"}
      />


    </AddEditLayout>
  );
}
