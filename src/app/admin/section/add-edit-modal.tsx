"use client";
import { message, Modal } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KY, MTD } from "@/lib/constants";
import { useQueryClient } from "@tanstack/react-query";
import { ISection, SectionValidator, TSectionDto } from "./model";
import { useMutate } from "@/lib/hooks/useMutation";
import { toast } from "react-toastify";
import { useFetch } from "@/lib/hooks/useQuery";
import { updateLocalData } from "@/lib/functions/updateLocal";
import {
  AddEditLayout,
  InputField,
  MultiSelectWithName,
  MultiSelectWithSlug,
  SelectInput,
  Submit,
  TextField,
} from "@/components/forms/inputs";

// import Select from "react-select"

interface ISectionProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  section?: ISection;
}

const AddEditSection = ({
  isUpdate,
  isOpen,
  onClose,
  section,
}: ISectionProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TSectionDto>({
    resolver: zodResolver(SectionValidator),
    defaultValues: isUpdate ? { ...section } : {},
  });
  const { isLoading: contentLoading, data: content } = useFetch(
    [KY.content],
    `${KY.content}`,
  );
  const { isLoading: knowledgeLoading, data: knowledge } = useFetch(
    [KY.knowledge],
    `${KY.knowledge}`,
  );
  const { isLoading: skillLoading, data: skills } = useFetch(
    [KY.skill],
    `${KY.skill}`,
  );

  const [modifiedData, setModifiedData] = useState<Partial<TSectionDto>>({});
  const handleChange = (fieldName: keyof TSectionDto, value: string) => {
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
      const response = await mutation.mutateAsync({
        url,
        method: method,
        body: data,
      });
      updateLocalData(
        method,
        KY.section,
        queryClient,
        reset,
        response,
        section?.id,
      );
      toast.success(`successfully ${msgStr} : ${response?.body.name}`, {
        autoClose: 2000,
      });
    } catch (e: any) {
      console.log("````````````````````error data", e);
      toast.error(`error: ${e?.message}`, { autoClose: 2000 });
    }
  };

  const onSubmit = async (data: TSectionDto) => {
    console.log("data========>>>", data);
    // return;
    if (isUpdate && section && "id" in section) {
      if (Object.keys(modifiedData).length === 0) {
        message.warning(`No data is modified`);
        return;
      }

      await operate(
        `${KY.section}/${section.id}`,
        modifiedData,
        MTD.PATCH,
        "update",
      );
    } else if (!isUpdate) {
      await operate(`${KY.section}`, data, MTD.POST, "create");
    }
  };

  return (
    <>
      <Modal
        title={isUpdate ? `Update ${KY.section}` : `Create ${KY.section}`}
        open={isOpen}
        onOk={handleSubmit(onSubmit)}
        onCancel={onClose}
        footer={[]}
      >
        <AddEditLayout title={"Section"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <InputField
                label={"Section Name"}
                name={"name"}
                errors={errors}
                register={register}
                changeFunc={handleChange}
                placeholder={"write name"}
              />

              <MultiSelectWithSlug
                changeFunc={handleChange}
                data={content?.body || []}
                label={"Content"}
                name={"content_slugs"}
                errors={errors}
                control={control}
                placeholder={"select knowledge"}
              />
              <MultiSelectWithName
                changeFunc={handleChange}
                data={knowledge?.body || []}
                label={"Knowledge"}
                name={"knowledge_names"}
                errors={errors}
                control={control}
                placeholder={"select knowledge"}
              />

              <MultiSelectWithName
                changeFunc={handleChange}
                data={skills?.body || []}
                label={"Skills"}
                name={"skill_names"}
                errors={errors}
                control={control}
                placeholder={"select skills"}
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

              <Submit isLoading={mutation.isPending} update={isUpdate} />
            </div>
          </form>
        </AddEditLayout>
      </Modal>
    </>
  );
};

export default AddEditSection;
