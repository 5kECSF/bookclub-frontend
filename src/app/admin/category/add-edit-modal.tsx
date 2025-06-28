import {
  CategoryValidator,
  ICategory,
  TCategoryDto,
} from "@/app/admin/category/model-def";
import { AddEditWithFileLayout } from "@/components/admin/crud/generic-add-edit-withFile";
import { InputField, TextAreaField } from "@/components/forms/useFormInputs";
import { KY } from "@/lib/constants/routes";

interface ICategoryProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  category?: ICategory;
}
export function AddEditModal({
  isOpen,
  onClose,
  isUpdate,
  category,
}: ICategoryProps) {
  return (
    <AddEditWithFileLayout<ICategory, TCategoryDto>
      isOpen={isOpen}
      url={KY.category}
      onClose={() => onClose(false)}
      schema={CategoryValidator}
      isUpdate={isUpdate}
      data={category}
    >
      <InputField
        label={"Category Name"}
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
    </AddEditWithFileLayout>
  );
}
