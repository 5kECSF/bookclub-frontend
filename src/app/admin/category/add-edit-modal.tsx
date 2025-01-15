"use client";
import { MultiFileUpload } from "@/components/admin/upload/upload_single";
import {
  InputField,
  Submit,
  TextAreaField,
} from "@/components/forms/useFormInputs";
import { ItemStatus, KY, MTD } from "@/lib/constants";
import { updateLocalData } from "@/lib/functions/updateLocal";
import { useMakeReq } from "@/lib/state/hooks/useMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CategoryValidator, ICategory, TCategoryDto } from "./model";
// import { HandleAxiosErr } from "@/lib/functions/axios.error";
import { Resp, ReturnType } from "@/lib/constants/return.const";
import { AddEditWrapper } from "@/components/admin/crud/add-edit-wrapper";
import { DisplayErrors } from "@/lib/functions/object";

import { SelectInput } from "@/components/forms/select";

interface ICategoryProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  category?: ICategory;
}

const AddEditCategory = ({
  isUpdate,
  isOpen,
  onClose,
  category,
}: ICategoryProps) => {
  const uploadRef = useRef();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCategoryDto>({
    resolver: zodResolver(CategoryValidator),
    defaultValues: isUpdate ? { ...category } : {},
  });

  const [modifiedData, setModifiedData] = useState<Partial<ICategory>>({});
  // Function to handle field changes
  const handleChange = (fieldName: keyof TCategoryDto, value: string) => {
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

  const onSubmit = async (data: ICategory) => {
    setLoading(true);
    let resp: Resp<any>;
    //===============  Step 1: Create the draft item ===========
    //==========================================================
    if (isUpdate) {
      if (!category || !("_id" in category))
        return handleErr("malformed update");
      resp = { ok: false, body: category, message: "" };
    } else {
      resp = await makeReq(`${KY.category}/draft`, data, MTD.POST);
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
      console.log("uploadResp--", uploadResp);
      //the ReturnType.NotModified is when the file is not modified
      if (uploadResp.respCode != ReturnType.NotModified) {
        console.log("uploadResp MOdified", uploadResp);
        console.log("modified, data: 1", modifiedData);
        setModifiedData({
          ...modifiedData,
          fileId: uploadResp.body._id,
        });
        updatedData["fileId"] = uploadResp.body._id;

        data.fileId = uploadResp.body._id;
      }
    }
    //===============  Step 3: Activate the Draft item ===========
    //==========================================================
    if (isUpdate && category && "_id" in category) {
      console.log("modified, data2", modifiedData);

      if (
        Object.keys(modifiedData).length === 0 &&
        Object.keys(updatedData).length === 0
      )
        return handleErr(`No data is modified`);
      resp = await makeReq(`${KY.category}/${category._id}`, data, MTD.PATCH);
      if (!resp.ok) return handleErr(resp.message);
    } else if (!isUpdate) {
      resp = await makeReq(`${KY.category}/${resp.body._id}`, data, MTD.POST);
      if (!resp.ok) return handleErr(resp.message);
      if (uploadRef.current) {
        //@ts-ignore
        uploadRef.current.resetData();
      }
    }
    updateLocalData(
      isUpdate ? MTD.PATCH : MTD.POST,
      KY.category,
      queryClient,
      reset,
      resp.body,
      category?._id as string,
    );
    toast.success(
      `successfully ${isUpdate ? "updated" : "created"} a category with name  ${resp.body?.name} `,
    );
    setLoading(false);
  };

  return (
    <>
      <Modal
        title={isUpdate ? `Update ${KY.category}` : `Create ${KY.category}`}
        open={isOpen}
        onCancel={onClose}
        footer={[]}
      >
        <AddEditWrapper title={"Category"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <InputField
                label={"Category Name"}
                name={"name"}
                errors={errors}
                register={register}
                handleChange={handleChange}
                placeholder={"write name"}
              />

              <TextAreaField
                label={"Description"}
                name={"desc"}
                errors={errors}
                register={register}
                req={false}
                handleChange={handleChange}
                placeholder={"Add the Description"}
              />
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

              <MultiFileUpload
                oldData={[category?.upload]}
                imgOnly={false}
                maxFileNo={1}
                ref={uploadRef}
                isUpdate={isUpdate}
                isLoading={loading}
                fileId={category?.upload?._id}
              />
              <Submit isLoading={loading} update={isUpdate} />
            </div>
            {DisplayErrors(errors)}
          </form>
        </AddEditWrapper>
      </Modal>
    </>
  );
};

export default AddEditCategory;
