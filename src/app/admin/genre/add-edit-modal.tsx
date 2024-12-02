"use client";
import { MultiFileUpload } from "@/app/admin/_components/upload/upload_single";
import {
  AddEditLayout,
  InputField,
  Submit,
  TextField,
} from "@/components/forms/useFormInputs";
import { KY, MTD } from "@/lib/constants";
import { updateLocalData } from "@/lib/functions/updateLocal";
import { useMakeReq, useMutate } from "@/lib/state/hooks/useMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { message, Modal } from "antd";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { GenreValidator, IGenre, TGenreDto } from "./model";
import { HandleAxiosErr } from "@/lib/functions/axios.error";
import { Resp } from "@/lib/constants/return.const";

interface IGenreProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  genre?: IGenre;
}

const AddEditGenre = ({ isUpdate, isOpen, onClose, genre }: IGenreProps) => {
  const uploadRef = useRef();
  const [loading, setLoading] = useState<boolean>(false);

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

  const [modifiedData, setModifiedData] = useState<Partial<IGenre>>({});
  // Function to handle field changes
  const handleChange = (fieldName: keyof TGenreDto, value: string) => {
    setModifiedData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const queryClient = useQueryClient();
  const mutation = useMutate();
  const makeReq = useMakeReq();

  const operate = async (
    url: string,
    data: any,
    method: MTD,
    msgStr: string,
  ) => {
    const resp = await makeReq(url, data, MTD.POST);
    if (!resp.ok) {
      setLoading(false);
      toast.error(`${resp.message}`);
      return;
    }
    updateLocalData(
      method,
      KY.genre,
      queryClient,
      reset,
      resp.body,
      genre?._id as string,
    );
    toast.success(`successfully ${msgStr} with name ${resp.body?.name}`);
    setLoading(false);
  };
  const handleErr = (message: string, autoClose: number = 2500) => {
    toast.error(`${message}`, { autoClose });
    setLoading(false);
  };

  const onSubmit = async (data: IGenre) => {
    setLoading(true);
    if (uploadRef.current) {
      //@ts-ignore
      const uploadResp: Resp<any> = await uploadRef.current.uploadSingle();
      if (!uploadResp.ok) return handleErr(`upload Error${uploadResp.message}`);

      data.fileId = uploadResp.body._id;
      modifiedData.fileId = uploadResp.body._id;
    }
    if (isUpdate && genre && "_id" in genre) {
      if (Object.keys(modifiedData).length === 0)
        handleErr(`No data is modified`);
      await operate(`${KY.genre}/${genre._id}`, data, MTD.PATCH, "update");
    } else if (!isUpdate) {
      await operate(`${KY.genre}`, data, MTD.POST, "create");
      if (uploadRef.current) {
        //@ts-ignore
        uploadRef.current.resetData();
      }
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

export default AddEditGenre;
