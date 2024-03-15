"use client";
import { message, Modal } from "antd";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KY, MTD } from "@/lib/constants";
import { useQueryClient } from "@tanstack/react-query";
import { IContent, ContentValidator, TContentDto } from "./model";
import { useMutate } from "@/lib/hooks/useMutation";
import { toast } from "react-toastify";
import { updateLocalData } from "@/lib/functions/updateLocal";
import {
  AddEditLayout,
  InputField,
  MultiSelectWithName,
  Submit,
  TextField,
} from "@/components/forms/inputs";
import { MultiFileUpload } from "@/app/admin/_components/upload/file_upload_component";

interface IContentProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  content?: IContent;
}

const AddEditContent = ({
  isUpdate,
  isOpen,
  onClose,
  content,
}: IContentProps) => {
  const uploadRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TContentDto>({
    resolver: zodResolver(ContentValidator),
    defaultValues: isUpdate ? { ...content } : {},
  });

  const [modifiedData, setModifiedData] = useState<Partial<TContentDto>>({});
  // Function to handle field changes
  const handleChange = (fieldName: keyof TContentDto, value: string) => {
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
        KY.content,
        queryClient,
        reset,
        response.body,
        content?.id,
      );
      toast.success(`successfully ${msgStr} with id ${response.body.id}`);
    } catch (e: any) {
      console.log(" `````````` `````````` error data", e);
      toast.error(`Server error: ${e?.message}`);
    }
  };

  const onSubmit = async (data: IContent) => {
    if (uploadRef.current) {
      //@ts-ignore
      const fileNames = await uploadRef.current.uploadAndReturnFileNames();
      console.log("=>>>>>>", fileNames); // Logs the array of file names
      data.upload_names = fileNames;
    }
    if (isUpdate && content && "id" in content) {
      if (Object.keys(modifiedData).length === 0) {
        message.warning(`No data is modified`);
        // toast.error(`Nothing modified`);
        return;
      }
      await operate(`${KY.content}/${content.id}`, data, MTD.PATCH, "update");
    } else if (!isUpdate) {
      await operate(`${KY.content}`, data, MTD.POST, "create");
    }
  };

  return (
    <>
      <Modal
        title={isUpdate ? `Update ${KY.content}` : `Create ${KY.content}`}
        open={isOpen}
        onOk={handleSubmit(onSubmit)}
        onCancel={onClose}
        footer={[]}
      >
        <AddEditLayout title={"Content"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <InputField
                label={"Content Name"}
                name={"name"}
                errors={errors}
                register={register}
                changeFunc={handleChange}
                placeholder={"write name"}
              />
              {/*<InputField label={"Code"} name={"code"} errors={errors}*/}
              {/*            register={register}*/}
              {/*            changeFunc={handleChange} placeholder={"write code"} />*/}

              {/*<MultiSelect data={data} label={"Uploads"} name={"upload_names"} errors={errors}*/}
              {/*             control={control} placeholder={"select Uploads"} />*/}

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
                oldData={content?.uploads}
                imgOnly={false}
                fileNo={3}
                ref={uploadRef}
                isUpdate={isUpdate}
                isLoading={mutation.isPending}
              />
              <Submit isLoading={mutation.isPending} update={isUpdate} />
            </div>
          </form>
        </AddEditLayout>
      </Modal>
    </>
  );
};

export default AddEditContent;
