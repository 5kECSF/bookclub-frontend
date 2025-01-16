import { ZodSchema } from "zod";
import { ItemStatus, KY, MTD } from "@/lib/constants";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useMakeReq } from "@/lib/state/hooks/useMutation";
import { toast } from "react-toastify";
import { Resp, ReturnType } from "@/lib/constants/return.const";
import { Modal, message } from "antd";
import { AddEditWrapper } from "@/components/admin/crud/add-edit-wrapper";
import { Submit } from "@/components/forms/useFormInputs";
import { MultiFileUpload } from "@/components/admin/upload/upload_single";
import { DisplayErrors } from "@/lib/functions/object";
import { SelectInput } from "@/components/forms/select";

type Obj = {
  _id?: string;
  fileId?: string;
  upload?: any;
};
type ShimProps<T extends Obj, TDto> = {
  isUpdate: boolean;
  data?: Partial<T>;
  schema: ZodSchema<TDto>;
  url: KY;
  isOpen: boolean;
  onClose: (e?: any) => void;
  children: any;
};
export function AddEditLayout<T extends Obj, TDto extends FieldValues>({
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
  const updatedData: any = {};
  const queryClient = useQueryClient();
  const makeReq = useMakeReq();

  const handleErr = (message: string, autoClose: number = 2500) => {
    toast.error(`${message}`, { autoClose });
    setLoading(false);
  };

  const onSubmit = async (submitData: TDto) => {
    setLoading(true);
    let resp: Resp<any>;
    //===============  Step 1: Create the draft item ===========
    //==========================================================
    if (isUpdate) {
      if (!data || !("_id" in data)) {
        return handleErr("malformed update");
      }
      resp = { ok: false, body: data, message: "" };
    } else {
      resp = await makeReq(`${url}/draft`, submitData, MTD.POST);
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
        //FIXME this is not modifying the data, in time for the update
        setModifiedData((prevState) => ({
          ...prevState,
          fileId: uploadResp.body._id,
        }));
        updatedData["fileId"] = uploadResp.body._id;
        //@ts-ignore
        submitData.fileId = uploadResp.body._id;
      }
    }
    //===============  Step 3: Activate the Draft item ===========
    //==========================================================
    if (isUpdate && data && "_id" in data) {
      if (
        Object.keys(modifiedData).length === 0 &&
        Object.keys(updatedData).length === 0
      )
        return handleErr(`No data is modified`);
      //this is because the modified data is not updated if the update is only for the file
      let updateData = { ...modifiedData, ...updatedData };
      console.log("-updateData", updatedData);
      resp = await makeReq(`${url}/${data._id}`, updateData, MTD.PATCH);
      if (!resp.ok) return handleErr(resp.message);
    } else if (!isUpdate) {
      //we are activating the draft, with id: we don't need body
      resp = await makeReq(`${url}/${resp.body._id}`, {}, MTD.POST);
      if (!resp.ok) return handleErr(resp.message);
    }
    reset();
    if (uploadRef.current) {
      //@ts-ignore
      uploadRef.current.resetData();
    }
    onClose();
    await queryClient.invalidateQueries({ queryKey: [url] });

    message.success(
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
        <AddEditWrapper title={url}>
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

              {isUpdate && (
                <SelectInput
                  data={ItemStatus}
                  register={register}
                  errors={errors}
                  handleChange={handleChange}
                  idx={"name"}
                  name={"status"}
                  dispIdx={"name"}
                  label={"status"}
                  placeholder={"select status"}
                  req={false}
                />
              )}
              {/*/>*/}
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
        </AddEditWrapper>
      </Modal>
    </>
  );
}
