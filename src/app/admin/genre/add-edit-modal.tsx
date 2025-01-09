"use client";
import { MultiFileUpload } from "@/app/admin/_components/upload/upload_single";
import {
  InputField,
  Submit,
  TextField,
} from "@/components/forms/useFormInputs";
import { KY, MTD } from "@/lib/constants";
import { updateLocalData } from "@/lib/functions/updateLocal";
import { useMakeReq } from "@/lib/state/hooks/useMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { GenreValidator, IGenre, TGenreDto } from "./model";
// import { HandleAxiosErr } from "@/lib/functions/axios.error";
import { Resp, ReturnType } from "@/lib/constants/return.const";
import { AddEditLayout } from "@/app/admin/_components/elements/add-edit-layout";
import { DisplayErrors } from "@/lib/functions/object";

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
  const makeReq = useMakeReq();

  const handleErr = (message: string, autoClose: number = 2500) => {
    toast.error(`${message}`, { autoClose });
    setLoading(false);
  };

  const onSubmit = async (data: IGenre) => {
    setLoading(true);
    let resp: Resp<any>;
    //===============  Step 1: Create the draft item ===========
    //==========================================================
    if (isUpdate) {
      if (!genre || !("_id" in genre)) return handleErr("malformed update");
      resp = { ok: false, body: genre, message: "" };
    } else {
      resp = await makeReq(`${KY.genre}/draft`, data, MTD.POST);
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
    if (isUpdate && genre && "_id" in genre) {
      if (Object.keys(modifiedData).length === 0)
        handleErr(`No data is modified`);
      resp = await makeReq(`${KY.genre}/${genre._id}`, data, MTD.PATCH);
      if (!resp.ok) return handleErr(resp.message);
    } else if (!isUpdate) {
      resp = await makeReq(`${KY.genre}/${resp.body._id}`, data, MTD.POST);
      if (!resp.ok) return handleErr(resp.message);
      if (uploadRef.current) {
        //@ts-ignore
        uploadRef.current.resetData();
      }
    }
    updateLocalData(
      isUpdate ? MTD.PATCH : MTD.POST,
      KY.genre,
      queryClient,
      reset,
      resp.body,
      genre?._id as string,
    );
    toast.success(
      `successfully ${isUpdate ? "updated" : "created"} a genre with name  ${resp.body?.name} `,
    );
    setLoading(false);
  };

  return (
    <>
      <Modal
        title={isUpdate ? `Update ${KY.genre}` : `Create ${KY.genre}`}
        open={isOpen}
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
                isLoading={loading}
                fileId={genre?.upload?._id}
              />
              <Submit isLoading={loading} update={isUpdate} />
            </div>
            {DisplayErrors(errors)}
          </form>
        </AddEditLayout>
      </Modal>
    </>
  );
};

export default AddEditGenre;
