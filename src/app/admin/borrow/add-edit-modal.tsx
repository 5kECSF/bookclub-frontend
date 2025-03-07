import { AddEditWithFileLayout } from "@/components/admin/crud/add-edit-withFile-layout";
import { TextAreaField } from "@/components/forms/useFormInputs";
import { KY } from "@/lib/constants";
import { InputField } from "@/components/forms/useFormInputs";
import { BorrowValidator, IBorrow, TBorrowDto } from "@/app/admin/borrow/model-def";
import {AddEditLayout} from "@/components/admin/crud/add-edit-layout";

interface IBorrowProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  borrow?: IBorrow;
}
export function AddEditModal({
  isOpen,
  onClose,
  isUpdate,
  borrow,
}: IBorrowProps) {
  return (
    <AddEditLayout<IBorrow, TBorrowDto>
      isOpen={isOpen}
      url={KY.borrow}
      onClose={() => onClose(false)}
      schema={BorrowValidator}
      isUpdate={isUpdate}
      data={borrow}
    >
      <InputField
        label={"Borrow Name"}
        name={"name"}
        // errors={errors}
        // register={register}
        // handleChange={handleChange}
        placeholder={"write name"}
      />

      <TextAreaField
        label={"Description"}
        name={"desc"}
        // errors={errors}
        // register={register}
        req={false}
        // handleChange={handleChange}
        placeholder={"Add the Description"}
      />
    </AddEditLayout>
  );
}
