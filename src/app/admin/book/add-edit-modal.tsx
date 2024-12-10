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
import { useMakeReq } from "@/lib/state/hooks/useMutation";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BookValidator, IBook, TBookDto } from "./model";
import { Resp, ReturnType } from "@/lib/constants/return.const";

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
  const makeReq = useMakeReq();

  const handleErr = (message: string, autoClose: number = 2500) => {
    toast.error(`${message}: `, { autoClose });
    setLoading(false);
  };

  const onSubmit = async (data: IBook) => {
    setLoading(true);
    let resp: Resp<any>;
    let id: string;
    if (isUpdate) {
      if (!book || !("_id" in book)) return handleErr("malformed update");
      id = book?._id as string;
      resp = { ok: false, body: book, message: "" };
    } else {
      resp = await makeReq(`${KY.book}`, data, MTD.POST);
      if (!resp.ok) return handleErr(resp.message);
      id = resp.body._id;
    }
    //===============================> Updating the File
    if (uploadRef.current) {
      // console.log("book", book, resp.body);
      //@ts-ignore
      const uploadDto: Resp<any> = await uploadRef.current.uploadFiles(
        resp.body ? resp.body?.fileId : book?.fileId,
      );
      if (!uploadDto.ok) return handleErr(`upload Error: ${uploadDto.message}`);
      // console.log("the uploadDto====", uploadDto);
      if (uploadDto.respCode != ReturnType.NotModified) {
        setModifiedData((prevState) => ({
          ...prevState,
          fileId: uploadDto.body._id,
        }));
        data.fileId = uploadDto.body._id;
      }
    } else {
      return handleErr("NO uploadRef");
    }
    if (isUpdate && book && "_id" in book) {
      if (Object.keys(modifiedData).length === 0)
        return handleErr(`No data is modified`);
      resp = await makeReq(`${KY.book}/${book._id}`, data, MTD.PATCH);
      if (!resp.ok) return handleErr(resp.message);
    } else {
      let body = { fileId: resp.body.fileId };
      resp = await makeReq(`${KY.book}/${id}`, body, MTD.POST);
      if (!resp.ok) return handleErr(resp.message);
      if (uploadRef.current) {
        //@ts-ignore
        uploadRef.current.resetData();
      }
    }
    updateLocalData(
      isUpdate ? MTD.PATCH : MTD.POST,
      KY.book,
      queryClient,
      reset,
      resp.body,
      book?._id as string,
    );
    toast.success(
      `successfully ${isUpdate ? "updated" : "created"} a book with title  ${resp.body?.title} `,
    );
    setLoading(false);
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
                isLoading={loading}
              />
              {/*<GenericButton*/}
              {/*  type="button"*/}
              {/*  className=" text-sm"*/}
              {/*  onClick={() => handleSecondaryButtonAction()}*/}
              {/*>*/}
              {/*  {secondaryButton}*/}
              {/*</GenericButton>*/}
              <Submit isLoading={loading} update={isUpdate} />
            </div>
          </form>
        </AddEditLayout>
      </Modal>
    </>
  );
};

export default AddEditBook;
