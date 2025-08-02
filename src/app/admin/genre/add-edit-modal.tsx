import { GenreValidator, IGenre, TGenreDto } from "@/app/admin/genre/model-def";
import { AddEditWithFileLayout } from "@/components/admin/crud/generic-add-edit-withFile";
import { SelectInput } from "@/components/forms/select";
import { InputField, TextAreaField } from "@/components/forms/useFormInputs";
import { KY } from "@/lib/constants/routes";
import { useFetch } from "@/lib/state/hooks/useQuery";

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
  const { data: category } = useFetch([KY.category], `${KY.category}`);
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
      <SelectInput
        // register={register}
        // errors={errors}
        // handleChange={handleChange}
        data={category?.body}
        idx={"name"}
        label={"Category"}
        name={"category"}
        placeholder={"select category"}
        cssCls="w-1/2"
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
