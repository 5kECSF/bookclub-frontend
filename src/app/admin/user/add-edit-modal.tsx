import { IUser, TUserDto, UserValidator } from "@/app/admin/user/model-def";
import { AddEditLayout } from "@/components/admin/crud/generic-add-edit";
import { SelectInput } from "@/components/forms/select";
import {
  EmailField,
  InputField,
  PasswordField,
} from "@/components/forms/useFormInputs";
import { KY } from "@/lib/constants";

interface IUserProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  user?: IUser;
}
export function AddEditModal({ isOpen, onClose, isUpdate, user }: IUserProps) {
  return (
    <AddEditLayout<IUser, TUserDto>
      isOpen={isOpen}
      url={KY.user}
      onClose={() => onClose(false)}
      schema={UserValidator}
      isUpdate={isUpdate}
      data={user}
    >
      <EmailField name={"email"} placeholder={"email"} />
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
        data={[{ role: "ADMIN" }, { role: "USER" }]}
        idx={"role"}
        dispIdx={"role"}
        label={"Role"}
        name={"role"}
        placeholder={"select Author"}
      />
    </AddEditLayout>
  );
}
