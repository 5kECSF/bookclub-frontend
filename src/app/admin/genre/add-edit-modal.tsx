import { AddEditWithFileLayout } from "@/components/admin/crud/add-edit-withFile-layout";
import { TextAreaField } from "@/components/forms/useFormInputs";
import { KY } from "@/lib/constants";
import { InputField } from "@/components/forms/useFormInputs";
import { GenreValidator, IGenre, TGenreDto } from "@/app/admin/genre/model-def";

interface IGenreProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  genre?: IGenre;
}
export function AddEditModal({
  isOpen,
  onClose,
  isUpdate,
  genre,
}: IGenreProps) {
  return (
    <AddEditWithFileLayout<IGenre, TGenreDto>
      isOpen={isOpen}
      url={KY.genre}
      onClose={() => onClose(false)}
      schema={GenreValidator}
      isUpdate={isUpdate}
      data={genre}
    >
      <InputField
        label={"Genre Name"}
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
