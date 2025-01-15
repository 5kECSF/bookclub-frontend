"use client";
import { MultiFileUpload } from "@/components/admin/upload/upload_single";
import {
  InputField,
  Submit,
  TextAreaField,
} from "@/components/forms/useFormInputs";
import { KY, MTD } from "@/lib/constants";
import { updateLocalData } from "@/lib/functions/updateLocal";
import { useMakeReq } from "@/lib/state/hooks/useMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import { useRef, useState } from "react";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthorValidator, IAuthor, TAuthorDto } from "./model";
// import { HandleAxiosErr } from "@/lib/functions/axios.error";
import { Resp, ReturnType } from "@/lib/constants/return.const";
import { AddEditWrapper } from "@/components/admin/crud/add-edit-wrapper";
import { DisplayErrors } from "@/lib/functions/object";
import { ZodSchema } from "zod";

interface IAuthorProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  author?: IAuthor;
}

const AddEditAuthor = ({ isUpdate, isOpen, onClose, author }: IAuthorProps) => {
  const uploadRef = useRef();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAuthorDto>({
    resolver: zodResolver(AuthorValidator),
    defaultValues: isUpdate ? { ...author } : {},
  });

  const [modifiedData, setModifiedData] = useState<Partial<IAuthor>>({});
  // Function to handle field changes
  const handleChange = (fieldName: keyof TAuthorDto, value: string) => {
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

  const onSubmit = async (data: IAuthor) => {
    setLoading(true);
    let resp: Resp<any>;
    //===============  Step 1: Create the draft item ===========
    //==========================================================
    if (isUpdate) {
      if (!author || !("_id" in author)) return handleErr("malformed update");
      resp = { ok: false, body: author, message: "" };
    } else {
      resp = await makeReq(`${KY.author}/draft`, data, MTD.POST);
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
        data.fileId = uploadResp.body._id;
      }
    }
    //===============  Step 3: Activate the Draft item ===========
    //==========================================================
    if (isUpdate && author && "_id" in author) {
      if (Object.keys(modifiedData).length === 0)
        handleErr(`No data is modified`);
      resp = await makeReq(`${KY.author}/${author._id}`, data, MTD.PATCH);
      if (!resp.ok) return handleErr(resp.message);
    } else if (!isUpdate) {
      resp = await makeReq(`${KY.author}/${resp.body._id}`, data, MTD.POST);
      if (!resp.ok) return handleErr(resp.message);
      if (uploadRef.current) {
        //@ts-ignore
        uploadRef.current.resetData();
      }
    }
    updateLocalData(
      isUpdate ? MTD.PATCH : MTD.POST,
      KY.author,
      queryClient,
      reset,
      resp.body,
      author?._id as string,
    );
    toast.success(
      `successfully ${isUpdate ? "updated" : "created"} a author with name  ${resp.body?.name} `,
    );
    setLoading(false);
  };

  return (
    <>
      <Modal
        title={isUpdate ? `Update ${KY.author}` : `Create ${KY.author}`}
        open={isOpen}
        onCancel={onClose}
        footer={[]}
      >
        <AddEditWrapper title={"Author"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <InputField
                label={"Author Name"}
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
              <MultiFileUpload
                oldData={[author?.upload]}
                imgOnly={false}
                maxFileNo={1}
                ref={uploadRef}
                isUpdate={isUpdate}
                isLoading={loading}
                fileId={author?.upload?._id}
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

export default AddEditAuthor;
