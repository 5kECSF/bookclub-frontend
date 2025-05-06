"use client";
import {
  DonationValidator,
  IDonation,
  TDonationDto,
  bookStatusList,
} from "@/app/admin/donation/model-def";
import { AddEditModalWrapper } from "@/components/admin/crud/add-edit-modal";
import { SingleSelectWithSearch } from "@/components/forms/react-select-single";
import { SelectInput } from "@/components/forms/select";
import {
  InputField,
  Submit,
  TextAreaField,
} from "@/components/forms/useFormInputs";
import { KY, MTD } from "@/lib/constants";
import { Resp } from "@/lib/constants/return.const";
import { DisplayErrors } from "@/lib/functions/object";
import { useMakeReqState } from "@/lib/state/hooks/useMutation";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IBookProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  donation?: IDonation;
}

const AddEdit = ({ isUpdate, isOpen, onClose, donation }: IBookProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TDonationDto>({
    resolver: zodResolver(DonationValidator),
    defaultValues: isUpdate ? { ...donation } : {},
  });
  const [bookQ, setBookQ] = useState("");
  const [userQ, setUserQ] = useState("");
  const { data: book } = useFetch([KY.book, bookQ], `${KY.book}`, { q: bookQ });
  const { data: user } = useFetch([KY.user, userQ], `${KY.user}`, { q: userQ });

  const [modifiedData, setModifiedData] = useState<Partial<IDonation>>({});
  // Function to handle field changes
  const handleChange = (fieldName: keyof IDonation, value: string) => {
    setModifiedData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const queryClient = useQueryClient();
  const { makeReq, loading } = useMakeReqState();

  const handleErr = (message: string, autoClose: number = 2500) => {
    toast.error(`${message}: `, { autoClose });
  };

  const onSubmit = async (data: IDonation) => {
    let resp: Resp<any>;
    if (isUpdate) {
      if (!donation || !("_id" in donation))
        return handleErr("malformed update");
      resp = await makeReq(
        `${KY.donation}/${donation._id}`,
        modifiedData,
        MTD.PATCH,
      );
      if (!resp.ok) return handleErr(resp.message);
    } else {
      resp = await makeReq(`${KY.donation}`, data, MTD.POST);
      if (!resp.ok) return handleErr(resp.message);
    }
    await queryClient.invalidateQueries({ queryKey: [KY.donation] });
    reset();
    toast.success(
      `successfully ${isUpdate ? "updated" : "created"} a donation of user ${resp.body.fullName} `,
    );
  };

  return (
    <>
      <AddEditModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        isUpdate={isUpdate}
        title={"Donation"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <SingleSelectWithSearch
              control={control}
              errors={errors}
              handleChange={handleChange}
              handleSearch={(e: string) => {
                setBookQ(e);
              }}
              data={book?.body || []}
              idx={"_id"}
              dispIdx={"title"}
              label={"Book"}
              name={"bookId"}
              placeholder={"type title of Book"}
            />
            <SingleSelectWithSearch
              errors={errors}
              control={control}
              data={user?.body || []}
              handleChange={handleChange}
              handleSearch={(e: string) => {
                setUserQ(e);
              }}
              idx={"_id"}
              dispIdx={"email"}
              label={"Donor"}
              name={"donorId"}
              placeholder={"type name of  User"}
            />

            <TextAreaField
              register={register}
              errors={errors}
              handleChange={handleChange}
              label={"note"}
              name={"note"}
              req={false}
              // handleChange={handleChange}
              placeholder={"Add the Description"}
            />
            <InputField
              register={register}
              errors={errors}
              handleChange={handleChange}
              label={"date"}
              name={"date"}
              req={false}
              inputType={"date"}
              // handleChange={handleChange}
              placeholder={"Add the Description"}
            />

            <SelectInput
              register={register}
              errors={errors}
              handleChange={handleChange}
              data={bookStatusList}
              idx={"name"}
              name={"status"}
              dispIdx={"name"}
              label={"status"}
              placeholder={"status"}
              req={false}
            />

            <Submit isLoading={loading} update={isUpdate} />
          </div>
          {DisplayErrors(errors)}
        </form>
      </AddEditModalWrapper>
    </>
  );
};

export default AddEdit;
