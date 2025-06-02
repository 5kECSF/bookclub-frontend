import {
  borrowStatusList,
  BorrowValidator,
  IBorrow,
  TBorrowDto,
} from "@/app/admin/borrow/model-def";
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
import { toast } from "sonner";

interface IBorrowProps {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: (e?: any) => void;
  borrow?: IBorrow;
}

const AddEdit = ({ isUpdate, isOpen, onClose, borrow }: IBorrowProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TBorrowDto>({
    resolver: zodResolver(BorrowValidator),
    defaultValues: isUpdate ? { ...borrow } : {},
  });
  const [bookQ, setBookQ] = useState("");
  const [bookId, setBookId] = useState("");

  const { data: book } = useFetch([KY.book, bookQ], `${KY.book}`, { q: bookQ });

  const [userQ, setUserQ] = useState("");
  const { data: user } = useFetch([KY.user, userQ], `${KY.user}`, { q: userQ });
  const [donationQ, setDonationQ] = useState("");
  const { data: donation } = useFetch(
    [KY.donation, donationQ, bookId],
    `${KY.donation}`,
    { q: donationQ, bookId },
  );

  const [modifiedData, setModifiedData] = useState<Partial<IBorrow>>({});
  // Function to handle field changes
  const handleChange = (fieldName: keyof IBorrow, value: string) => {
    setModifiedData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const handleBookChange = (fieldName: keyof IBorrow, value: string) => {
    setModifiedData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    setBookId(value);
  };

  const queryClient = useQueryClient();
  const { makeReq, loading } = useMakeReqState();

  const handleErr = (message: string, duration: number = 2500) => {
    toast.error(`${message}: `,{duration});
  };

  const onSubmit = async (data: IBorrow) => {
    let resp: Resp<any>;
    if (isUpdate) {
      if (!borrow || !("_id" in borrow)) return handleErr("malformed update");
      resp = await makeReq(
        `${KY.borrow}/${borrow._id}`,
        modifiedData,
        MTD.PATCH,
      );
      if (!resp.ok) return handleErr(resp.message);
    } else {
      resp = await makeReq(`${KY.borrow}`, data, MTD.POST);
      if (!resp.ok) return handleErr(resp.message);
    }
    await queryClient.invalidateQueries({ queryKey: [KY.borrow] });
    reset();
    toast.success(
      `successfully ${isUpdate ? "updated" : "created"} a Borrow of user ${resp.body.fullName} `,
    );
  };

  return (
    <>
      <AddEditModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        isUpdate={isUpdate}
        title={"Borrow History"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <SingleSelectWithSearch
              control={control}
              errors={errors}
              handleChange={handleBookChange}
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
              control={control}
              errors={errors}
              handleChange={handleChange}
              handleSearch={(e: string) => {
                setDonationQ(e);
              }}
              data={donation?.body || []}
              idx={"_id"}
              dispIdx={"uid"}
              label={"Book Instances"}
              name={"instanceId"}
              placeholder={"Select the specific book instance"}
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
              label={"User"}
              name={"userId"}
              placeholder={"type name of  User"}
            />

            <TextAreaField
              register={register}
              errors={errors}
              handleChange={handleChange}
              label={"note"}
              name={"note"}
              req={false}
              placeholder={"Add the Description"}
            />
            <InputField
              register={register}
              errors={errors}
              handleChange={handleChange}
              label={"Taken Date"}
              name={"date"}
              req={false}
              inputType={"date"}
              placeholder={"Add the Description"}
            />

            <SelectInput
              register={register}
              errors={errors}
              handleChange={handleChange}
              data={borrowStatusList}
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
