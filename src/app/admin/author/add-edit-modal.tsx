import {
  AuthorValidator,
  IAuthor,
  TAuthorDto,
} from "@/app/admin/author/model-def";
import { AddEditWithFileLayout } from "@/components/admin/crud/generic-add-edit-withFile";
import { InputField, TextAreaField } from "@/components/forms/useFormInputs";
import { KY } from "@/lib/constants/routes";

interface IAuthorProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  author?: IAuthor;
}
export function AddEditModal({
  isOpen,
  onClose,
  isUpdate,
  author,
}: IAuthorProps) {
  return (
    <AddEditWithFileLayout<IAuthor, TAuthorDto>
      isOpen={isOpen}
      url={KY.author}
      onClose={() => onClose(false)}
      schema={AuthorValidator}
      isUpdate={isUpdate}
      data={author}
    >
      <InputField
        label={"Author Name"}
        name={"name"}
        placeholder={"write name"}
      />

      <TextAreaField
        label={"Authors Bio"}
        name={"bio"}
        req={false}
        placeholder={"Add the Bio"}
      />
    </AddEditWithFileLayout>
  );
}
