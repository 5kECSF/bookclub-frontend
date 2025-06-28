import { TUserDto, UserValidator } from "@/app/admin/user/model-def";
import { AddEditLayout } from "@/components/admin/crud/generic-add-edit";
import { SelectInput } from "@/components/forms/select";
import { KY } from "@/lib/constants/routes";
import { ACCOUNT_STATUS, IUser } from "@/types/user";

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
      <SelectInput
        data={[{ role: "ADMIN" }, { role: "USER" }]}
        idx={"role"}
        dispIdx={"role"}
        label={"Role"}
        name={"role"}
        placeholder={"select Author"}
      />
      <SelectInput
        data={[
          { status: ACCOUNT_STATUS.ACTIVE },
          { status: ACCOUNT_STATUS.BLOCKED },
        ]}
        idx={"status"}
        dispIdx={"status"}
        label={"Account Status"}
        name={"accountStatus"}
        placeholder={"select Account Status"}
      />
    </AddEditLayout>
  );
}
