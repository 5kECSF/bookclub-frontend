"use client";
import { FileWithCover } from "@/app/admin/_components/upload/upload_with_cover";
import {
  AddEditLayout,
  InputField,
  MultiSelectWithName,
  SelectInput,
  Submit,
  TextField,
} from "@/components/forms/useFormInputs";
import { KY, MTD } from "@/lib/constants";
import { updateLocalData } from "@/lib/functions/updateLocal";
import { useMutate } from "@/lib/state/hooks/useMutation";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { message, Modal } from "antd";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BookValidator, IBook, TBookDto } from "./model";

interface IBookProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  book?: IBook;
}

const AddEditBook = ({ isUpdate, isOpen, onClose, book }: IBookProps) => {
  const uploadRef = useRef();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TBookDto>({
    resolver: zodResolver(BookValidator),
    defaultValues: isUpdate ? { ...book } : {},
  });

  const { isLoading: genreLoading, data: genre } = useFetch(
    [KY.genre],
    `${KY.genre}`,
  );
  const { isLoading: categoryLoading, data: category } = useFetch(
    [KY.category],
    `${KY.category}`,
  );

  const [modifiedData, setModifiedData] = useState<Partial<IBook>>({});
  // Function to handle field changes
  const handleChange = (fieldName: keyof IBook, value: string) => {
    setModifiedData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const queryClient = useQueryClient();
  const mutation = useMutate();

  const operate = async (
    url: string,
    data: any,
    method: MTD,
    msgStr: string,
  ) => {
    try {
      //@ts-ignore
      const response = await mutation.mutateAsync({
        url,
        method: method,
        body: data,
      });
      console.log("the resp-->>", response);
      updateLocalData(
        method,
        KY.book,
        queryClient,
        reset,
        response,
        book?._id as string,
      );

      toast.success(`successfully ${msgStr} with name ${response?.title}`);
    } catch (e: any) {
      console.log(" `````````` `````````` error data", e.message);
      toast.error(`Server error: ${e?.message}`);
    }
  };

  const onSubmit = async (data: IBook) => {
    if (uploadRef.current) {
      setLoading(true);
      //@ts-ignore
      const uploadDto = await uploadRef.current.uploadAndReturnFileNames();
      console.log("=>>>>>>UPLOAD DTO=", uploadDto); // Logs the array of file names
      if (!uploadDto || !uploadDto?._id) {
        toast.error("uploading failed");
        setLoading(false);
        return;
      }
      data.fileId = uploadDto._id;
      modifiedData.fileId = uploadDto._id;
    }
    if (isUpdate && book && "_id" in book) {
      if (Object.keys(modifiedData).length === 0) {
        message.warning(`No data is modified`);
        // toast.error(`Nothing modified`);
        return;
      }
      await operate(`${KY.book}/${book._id}`, data, MTD.PATCH, "update");
      setLoading(false);
    } else if (!isUpdate) {
      await operate(`${KY.book}`, data, MTD.POST, "create");
      setLoading(false);
      if (uploadRef.current) {
        //@ts-ignore
        uploadRef.current.resetData();
      }
    }
  };

  return (
    <>
      <Modal
        title={isUpdate ? `Update ${KY.book}` : `Create ${KY.book}`}
        open={isOpen}
        onOk={handleSubmit(onSubmit)}
        onCancel={onClose}
        footer={[]}
      >
        <AddEditLayout title={"Book"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <InputField
                label={"Book Title"}
                name={"title"}
                errors={errors}
                register={register}
                changeFunc={handleChange}
                placeholder={"write name"}
              />

              <SelectInput
                data={category?.body}
                register={register}
                control={control}
                idx={"_id"}
                label={"Category"}
                name={"categoryId"}
                changeFunc={handleChange}
                placeholder={"select categories"}
                errors={errors}
              />

              <MultiSelectWithName
                changeFunc={handleChange}
                data={genre?.body || []}
                label={"Genre"}
                name={"genres"}
                errors={errors}
                idx={"name"}
                control={control}
                placeholder={"select genres"}
              />

              <TextField
                label={"Description"}
                name={"desc"}
                errors={errors}
                register={register}
                req={false}
                changeFunc={handleChange}
                placeholder={"Add the Description"}
              />
              <FileWithCover
                oldImg={book?.upload}
                maxFileNo={3}
                ref={uploadRef}
                isUpdate={isUpdate}
                isLoading={mutation.isPending}
              />
              <Submit
                isLoading={mutation.isPending || loading}
                update={isUpdate}
              />
            </div>
          </form>
        </AddEditLayout>
      </Modal>
    </>
  );
};

export default AddEditBook;
