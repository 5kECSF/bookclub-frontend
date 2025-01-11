import { ZodSchema } from "zod";
import { KY, MTD } from "@/lib/constants";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useMakeReq } from "@/lib/state/hooks/useMutation";
import { toast } from "react-toastify";
import { Resp, ReturnType } from "@/lib/constants/return.const";
import { updateLocalData } from "@/lib/functions/updateLocal";
import { Modal } from "antd";
import { AddEditLayout } from "@/app/admin/_components/elements/add-edit-layout";
import {
  InputField,
  Submit,
  TextField,
} from "@/components/forms/useFormInputs";
import { MultiFileUpload } from "@/app/admin/_components/upload/upload_single";
import { DisplayErrors } from "@/lib/functions/object";

type Obj = {
  _id?: string;
  fileId?: string;
  upload?: any;
};
type ShimProps<T extends Obj, TDto> = {
  isUpdate: boolean;
  data: Partial<T>;
  schema: ZodSchema<TDto>;
  url: KY;
  isOpen: boolean;
  onClose: (e?: any) => void;
  children: any;
};
export function AddEditWrapper<T extends Obj, TDto extends FieldValues>({
  isUpdate,
  data,
  schema,
  url,
  isOpen,
  onClose,
  children,
}: ShimProps<T, TDto>) {
  const uploadRef = useRef();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TDto>({
    resolver: zodResolver(schema),
    defaultValues: isUpdate ? (data as DefaultValues<TDto>) : undefined,
  });
  const [modifiedData, setModifiedData] = useState<Partial<T>>({});
  const handleChange = (fieldName: keyof TDto, value: string) => {
    setModifiedData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const queryClient = useQueryClient();
  const makeReq = useMakeReq();

  const handleErr = (message: string, autoClose: number = 2500) => {
    toast.error(`${message}`, { autoClose });
    setLoading(false);
  };

  const onSubmit = async (data: TDto) => {
    setLoading(true);
    let resp: Resp<any>;
    //===============  Step 1: Create the draft item ===========
    //==========================================================
    if (isUpdate) {
      if (!data || !("_id" in data)) return handleErr("malformed update");
      resp = { ok: false, body: data, message: "" };
    } else {
      resp = await makeReq(`${url}/draft`, data, MTD.POST);
      if (!resp.ok) return handleErr(resp.message);
    }
    //===============  Step 2: Upload the images ===========
    //==========================================================
    if (uploadRef.current) {
      //@ts-ignore
      const uploadResp: Resp<any> = await uploadRef.current.uploadSingle(
        resp.body.fileId,
      );
      if (!uploadResp.ok)
        return handleErr(`upload Error: ${uploadResp.message}`);
      //TODO: do this if it is Update, check if this is correct
      if (uploadResp.respCode != ReturnType.NotModified) {
        setModifiedData((prevState) => ({
          ...prevState,
          fileId: uploadResp.body._id,
        }));
        //@ts-ignore
        data.fileId = uploadResp.body._id;
      }
    }
    //===============  Step 3: Activate the Draft item ===========
    //==========================================================
    if (isUpdate && data && "_id" in data) {
      if (Object.keys(modifiedData).length === 0)
        handleErr(`No data is modified`);
      resp = await makeReq(`${url}/${data._id}`, data, MTD.PATCH);
      if (!resp.ok) return handleErr(resp.message);
    } else if (!isUpdate) {
      resp = await makeReq(`${url}/${resp.body._id}`, data, MTD.POST);
      if (!resp.ok) return handleErr(resp.message);
      if (uploadRef.current) {
        //@ts-ignore
        uploadRef.current.resetData();
      }
    }
    updateLocalData(
      isUpdate ? MTD.PATCH : MTD.POST,
      url,
      queryClient,
      reset,
      resp.body,
      data?._id as string,
    );
    toast.success(
      `successfully ${isUpdate ? "updated" : "created"} ${url} with name  ${resp.body?.name} `,
    );
    setLoading(false);
  };

  return (
    <>
      <Modal
        title={isUpdate ? `Update ${url}` : `Create ${url}`}
        open={isOpen}
        onCancel={onClose}
        footer={[]}
      >
        <AddEditLayout title={"Author"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              {React.Children.map(children, (child) => {
                // Ensure the child is a valid React element
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, {
                    //@ts-ignore
                    errors,
                    register,
                    handleChange,
                  });
                }
                return child;
              })}
              <InputField
                label={"Author Name"}
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
                oldData={[data?.upload]}
                imgOnly={false}
                maxFileNo={1}
                ref={uploadRef}
                isUpdate={isUpdate}
                isLoading={loading}
                fileId={data?.upload?._id}
              />
              <Submit isLoading={loading} update={isUpdate} />
            </div>
            {DisplayErrors(errors)}
          </form>
        </AddEditLayout>
      </Modal>
    </>
  );
}
