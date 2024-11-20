"use client";
import { MultiFileUpload } from "@/app/admin/_components/upload/upload_single";
import {
  AddEditLayout,
  InputField,
  Submit,
  TextField,
} from "@/components/forms/inputs";
import { KY, MTD } from "@/lib/constants";
import { updateLocalData } from "@/lib/functions/updateLocal";
import { useMutate } from "@/lib/state/hooks/useMutation";
import { IUpload } from "@/types/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { message, Modal } from "antd";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { GenreValidator, IGenre, TGenreDto } from "./model";
import { HandleAxiosErr } from "@/lib/functions/axios.error";

interface IGenreProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  genre?: IGenre;
}

const AddEditGenre = ({ isUpdate, isOpen, onClose, genre }: IGenreProps) => {
  const uploadRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TGenreDto>({
    resolver: zodResolver(GenreValidator),
    defaultValues: isUpdate ? { ...genre } : {},
  });

  const [modifiedData, setModifiedData] = useState<Partial<TGenreDto>>({});
  const [uploading, setUploading] = useState<boolean>(false);
  // Function to handle field changes
  const handleChange = (fieldName: keyof TGenreDto, value: string) => {
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
      const response: IGenre = await mutation.mutateAsync({
        url,
        method: method,
        body: data,
      });
      console.log("the resp-->>", response);
      updateLocalData(
        method,
        KY.genre,
        queryClient,
        reset,
        response,
        genre?._id as string,
      );
      toast.success(`successfully ${msgStr} with id ${response?._id}`);
    } catch (e: any) {
      let resp = HandleAxiosErr(e);
      console.log(" `````````` `````````` error data", e.message);
      toast.error(`Server error: ${resp.Message}`);
    }
  };

  const onSubmit = async (data: IGenre) => {
    if (uploadRef.current) {
      setUploading(true);
      //@ts-ignore
      const fileNames: IUpload = await uploadRef.current.uploadSingle();
      console.log("=>>>>>>UPLOAD RESULTS", fileNames); // Logs the array of file names
      if (!fileNames) {
        setUploading(false);
        return;
      }
      setUploading(false);
      data.fileId = fileNames._id;
    }
    if (isUpdate && genre && "_id" in genre) {
      if (Object.keys(modifiedData).length === 0) {
        message.warning(`No data is modified`);
        // toast.error(`Nothing modified`);
        return;
      }
      await operate(`${KY.genre}/${genre._id}`, data, MTD.PATCH, "update");
    } else if (!isUpdate) {
      await operate(`${KY.genre}`, data, MTD.POST, "create");
    }
  };

  return (
    <>
      <Modal
        title={isUpdate ? `Update ${KY.genre}` : `Create ${KY.genre}`}
        open={isOpen}
        onOk={handleSubmit(onSubmit)}
        onCancel={onClose}
        footer={[]}
      >
        <AddEditLayout title={"Genre"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <InputField
                label={"Genre Name"}
                name={"name"}
                errors={errors}
                register={register}
                changeFunc={handleChange}
                placeholder={"write name"}
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
              <MultiFileUpload
                oldData={[genre?.upload]}
                imgOnly={false}
                maxFileNo={1}
                ref={uploadRef}
                isUpdate={isUpdate}
                isLoading={mutation.isPending}
                fileId={genre?.upload?._id}
              />
              <Submit
                isLoading={mutation.isPending || uploading}
                update={isUpdate}
              />
            </div>
          </form>
        </AddEditLayout>
      </Modal>
    </>
  );
};

export default AddEditGenre;
