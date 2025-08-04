"use client";
import { FileWithCover } from "@/components/admin/upload/upload_with_cover";
import {
    InputField,
    Submit,
    TextAreaField
} from "@/components/forms/useFormInputs";
import { MTD } from "@/lib/constants";
import { KY } from "@/lib/constants/routes";
import { useMakeReqState } from "@/lib/state/hooks/useMutation";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";


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
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { GenreValidator, IGenre, TGenreDto } from "./model-def";

interface IGenreProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  genre?: IGenre;
}

const AddEditModal = ({ isUpdate, isOpen, onClose, genre }: IGenreProps) => {
  const uploadRef = useRef(undefined);

  const [loadingState, setLoading] = useState(false);
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



  const { data: category } = useFetch([KY.category], `${KY.category}`, {status:"active", limit: 50});

  const [modifiedData, setModifiedData] = useState<Partial<IGenre>>({});
  // Function to handle field changes
  const handleChange = (fieldName: keyof IGenre, value: string | string[]) => {
    console.log(",,,", fieldName, value);
    setModifiedData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const updatedData: any = {};
  const queryClient = useQueryClient();
  const { makeReq, loading } = useMakeReqState();

  const handleErr = (message: string, duration: number = 2500) => {
    toast.error(`${message}: `, { duration });
    setLoading(false)
  };

  const onSubmit = async (data: IGenre) => {
    // console.log("the creating ", data);
    setLoading(true)
    if (!uploadRef.current) return handleErr("no upload ref");
    let resp: Resp<any>;
    let id: string;
    if (isUpdate) {
      if (!genre || !("_id" in genre)) return handleErr("malformed update");
      id = genre?._id as string;
      resp = { ok: false, body: genre, message: "" };
    } else {
      //
      resp = await makeReq(`${KY.genre}`, data, MTD.POST);
      if (!resp.ok) return handleErr(resp.message);
      id = resp.body._id;
    }
    //===============================> Updating the File
    //===============================================================

    if (uploadRef.current) {
      //@ts-ignore
      const uploadDto: Resp<any> = await uploadRef.current.uploadFiles(
        resp.body ? resp.body?.fileId : genre?.fileId,
      );
      if (!uploadDto.ok) return handleErr(`upload Error: ${uploadDto.message}`);

      if (uploadDto.respCode != ReturnType.NotModified) {
        setModifiedData((prevState) => ({
          ...prevState,
          fileId: uploadDto.body._id,
        }));
        updatedData["fileId"] = uploadDto.body._id;
        data.fileId = uploadDto.body._id;
      }
    } else {
      return handleErr("NO uploadRef");
    }
    //=================   End of file Related ================
    //===============================================================
    if (isUpdate && genre && "_id" in genre) {
      if (Object.keys(modifiedData).length === 0 && 
      Object.keys(updatedData).length === 0
    )
        return handleErr(`No data is modified`);
         //this is because the modified data is not updated if the update is only for the file
         let updateData = { ...modifiedData, ...updatedData };
      resp = await makeReq(`${KY.genre}/${genre._id}`, updateData, MTD.PATCH);
      if (!resp.ok) return handleErr(resp.message);

    } else if(!isUpdate)  {
      let body = { fileId: resp.body.fileId };
       //we are activating the draft, with id: we don't need body
      resp = await makeReq(`${KY.genre}/${id}`, body, MTD.POST);
      if (!resp.ok) return handleErr(resp.message);
      if (uploadRef.current) {
        //@ts-ignore
        uploadRef.current.resetData();
      }
    }
    console.log("here");
    reset();
    setLoading(false)
    await queryClient.invalidateQueries({ queryKey: [KY.genre] });

    toast.success(
      `successfully ${isUpdate ? "updated" : "created"} a genre with title  ${resp.body?.title} `,
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="mt-8 max-h-[80vh] min-w-[50%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isUpdate ? `Update ${KY.genre}` : `Create ${KY.genre}`}
            </DialogTitle>
          </DialogHeader>
          <AddEditWrapper title={"Genre"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <InputField
                   label={"Genre Name"}
                    name={"name"}
                  errors={errors}
                  register={register}
                  handleChange={handleChange}
                  placeholder={"write name"}
                />
                {/* ===========   category  ====== */}

                  <ReactMultiSelect
                    handleChange={(e: any) => handleChange("categories", e)}
                    data={category?.body || []}
                    label={"categories"}
                    name={"categories"}
                    errors={errors}
                    idx={"name"}
                    control={control}
                    placeholder={"select categories"}
                    cssCls="w-1/2"
                  />


                {/* ============   status ========== */}

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
                  oldImg={genre?.upload}
                  maxFileNo={3}
                  ref={uploadRef}
                  isUpdate={isUpdate}
                  isLoading={loading}
                />

                <Submit isLoading={loading || loadingState} update={isUpdate} />
              </div>
              {DisplayErrors(errors)}
            </form>
          </AddEditWrapper>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditModal;
