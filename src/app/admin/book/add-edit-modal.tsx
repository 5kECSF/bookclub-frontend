"use client";
import { FileWithCover } from "@/components/admin/upload/upload_with_cover";
import {
  InputField,
  IntInputField,
  Submit,
  TextAreaField,
} from "@/components/forms/useFormInputs";
import { MTD } from "@/lib/constants";
import { KY } from "@/lib/constants/routes";
import { useMakeReqState } from "@/lib/state/hooks/useMutation";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { BookValidator, TBookDto } from "@/app/admin/book/model-def";
import { AddEditWrapper } from "@/components/admin/crud/add-edit-modal";
import { ReactMultiSelect } from "@/components/forms/react-select-multi";
import { SelectInput } from "@/components/forms/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Resp, ReturnType } from "@/lib/constants/return.const";
import { DisplayErrors } from "@/lib/functions/object";
import { ItemStatus } from "@/types/commonTypes";
import { IBook } from "@/types/libraryTypes";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IBookProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  book?: IBook;
}
export enum Metas {
  Featured = "featured",
  Banner = "banner",
  Recommended = "recommended",
  Trending = "trending",
}
export const MetaDatas = [
  { name: "none", label: "none" },
  { name: Metas.Featured, label: "Featured" },
  { name: Metas.Banner, label: "Banner" },
  // { name: "trending", label: "trending" },
];
const AddEditBook = ({ isUpdate, isOpen, onClose, book }: IBookProps) => {
  const uploadRef = useRef(undefined);

  // const [loading, setLoading] = useState(false);
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

  const { data: genre } = useFetch([KY.genre], `${KY.genre}`,{status:"active", limit: 50});
  const { data: author } = useFetch([KY.author], `${KY.author}`,{status:"active", limit: 50});
  const { data: category } = useFetch([KY.category], `${KY.category}`, {status:"active", limit: 50});

  const [modifiedData, setModifiedData] = useState<Partial<IBook>>({});
  // Function to handle field changes
  const handleChange = (fieldName: keyof IBook, value: string | string[]) => {
    console.log(",,,", fieldName, value);
    setModifiedData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const queryClient = useQueryClient();
  const { makeReq, loading } = useMakeReqState();

  const handleErr = (message: string, duration: number = 2500) => {
    toast.error(`${message}: `, { duration });
  };

  const onSubmit = async (data: IBook) => {
    console.log("the creating ", data);
    if (!uploadRef.current) return handleErr("no upload ref");
    let resp: Resp<any>;
    let id: string;
    if (isUpdate) {
      if (!book || !("_id" in book)) return handleErr("malformed update");
      id = book?._id as string;
      resp = { ok: false, body: book, message: "" };
    } else {
      //
      resp = await makeReq(`${KY.book}`, data, MTD.POST);
      if (!resp.ok) return handleErr(resp.message);
      id = resp.body._id;
    }
    //===============================> Updating the File
    //===============================================================

    if (uploadRef.current) {
      //@ts-ignore
      const uploadDto: Resp<any> = await uploadRef.current.uploadFiles(
        resp.body ? resp.body?.fileId : book?.fileId,
      );
      if (!uploadDto.ok) return handleErr(`upload Error: ${uploadDto.message}`);

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
    //=================   End of file Related ================
    //===============================================================
    if (isUpdate && book && "_id" in book) {
      if (Object.keys(modifiedData).length === 0)
        return handleErr(`No data is modified`);
      resp = await makeReq(`${KY.book}/${book._id}`, data, MTD.PATCH);
      if (!resp.ok) return handleErr(resp.message);
      console.log("succesfully updated", resp.message);
    } else {
      let body = { fileId: resp.body.fileId };
      resp = await makeReq(`${KY.book}/${id}`, body, MTD.POST);
      if (!resp.ok) return handleErr(resp.message);
      if (uploadRef.current) {
        //@ts-ignore
        uploadRef.current.resetData();
      }
    }
    console.log("here");
    reset();
    await queryClient.invalidateQueries({ queryKey: [KY.book] });

    toast.success(
      `successfully ${isUpdate ? "updated" : "created"} a book with title  ${resp.body?.title} `,
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="mt-8 max-h-[80vh] min-w-[50%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isUpdate ? `Update ${KY.book}` : `Create ${KY.book}`}
            </DialogTitle>
          </DialogHeader>
          <AddEditWrapper title={"Book"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <InputField
                  label={"Book Title"}
                  name={"title"}
                  errors={errors}
                  register={register}
                  handleChange={handleChange}
                  placeholder={"write name"}
                />
                {/* ===========  Gneres & category  ====== */}
                <div className=" mb-8 mt-8 flex justify-around gap-2 ">
                  <SelectInput
                    data={category?.body}
                    register={register}
                    errors={errors}
                    handleChange={handleChange}
                    idx={"name"}
                    label={"Category"}
                    name={"categoryName"}
                    placeholder={"select categories"}
                    cssCls="w-1/2"
                  />
                  <ReactMultiSelect
                    handleChange={(e: any) => handleChange("genres", e)}
                    data={genre?.body || []}
                    label={"genre"}
                    name={"genres"}
                    errors={errors}
                    idx={"name"}
                    control={control}
                    placeholder={"select genres"}
                    cssCls="w-1/2"
                  />
                </div>

                <div className="mb-8 flex justify-around gap-2 ">
                  <IntInputField
                    label={"Page Numbers"}
                    name={"page"}
                    errors={errors}
                    register={register}
                    handleChange={handleChange}
                    placeholder={"books page number"}
                    cssCls="w-[1/2]"
                  />
                  <IntInputField
                    label={"Published Year"}
                    name={"publishDate"}
                    errors={errors}
                    register={register}
                    handleChange={handleChange}
                    placeholder={"Published Year"}
                    cssCls="w-[1/2]"
                    req={false}
                  />
                </div>
                {/* ============  Meta & status ========== */}
                <div className="mb-8 flex justify-around gap-2">
                  <SelectInput
                    register={register}
                    errors={errors}
                    handleChange={handleChange}
                    data={ItemStatus}
                    idx={"name"}
                    name={"status"}
                    dispIdx={"name"}
                    label={"status"}
                    placeholder={"status"}
                    req={false}
                    cssCls="w-1/2"
                  />
                  <ReactMultiSelect
                    handleChange={(e: any) => handleChange("meta", e)}
                    data={MetaDatas}
                    label={"Meta"}
                    name={"meta"}
                    errors={errors}
                    idx={"name"}
                    control={control}
                    req={false}
                    placeholder={"select Metadata"}
                    cssCls="w-1/2"
                  />
                </div>

                <SelectInput
                  register={register}
                  errors={errors}
                  handleChange={handleChange}
                  data={author?.body}
                  idx={"name"}
                  label={"Author"}
                  name={"authorName"}
                  placeholder={"select Author"}
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

                <FileWithCover
                  oldImg={book?.upload}
                  maxFileNo={3}
                  ref={uploadRef}
                  isUpdate={isUpdate}
                  isLoading={loading}
                />

                <Submit isLoading={loading} update={isUpdate} />
              </div>
              {DisplayErrors(errors)}
            </form>
          </AddEditWrapper>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditBook;
