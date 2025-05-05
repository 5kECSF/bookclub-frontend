import { borrowStatus, IBorrow } from "@/app/admin/borrow/model-def";
import { SingleSelectWithSearch } from "@/components/forms/react-select-single";
import { InputField, Submit } from "@/components/forms/useFormInputs";
import { Button } from "@/components/ui/button";
import { KY, MTD } from "@/lib/constants";
import { DisplayErrors } from "@/lib/functions/object";
import { useMakeReqState } from "@/lib/state/hooks/useMutation";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
//=========. Borrow accept validators
export const acceptValidator = z.object({
  instanceId: z.string().optional(),
  note: z.string().optional(),
  takenDate: z.string().optional(),
  dueDate: z.string().optional(),
  returnedDate: z.string().optional(),
});

export type TAcceptDto = z.infer<typeof acceptValidator>;

export function BorrowAction({ row }: { row: IBorrow }) {
  const queryClient = useQueryClient();
  const { makeReq, loading } = useMakeReqState();
  //==============.   Select for accept borrow =========
  const [modalOpen, setModalOpen] = useState(false);
  const [donationQ, setDonationQ] = useState("");
  const { data: donation } = useFetch(
    [KY.donation, donationQ, row.bookId],
    `${KY.donation}`,
    { q: donationQ, bookId: row.bookId },
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<TAcceptDto>({
    resolver: zodResolver(acceptValidator),
    defaultValues: {},
  });
  const [modifiedData, setModifiedData] = useState<Partial<IBorrow>>({});
  const handleChange = (fieldName: keyof IBorrow, value: string) => {
    setModifiedData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const handleErr = (message: string, autoClose: number = 2500) => {
    toast.error(`${message}: `, { autoClose });
  };

  const onSubmit = async (data: TAcceptDto) => {
    let message = "";
    let url = `${KY.borrow}/acceptBorrow/${row._id}`;
    if (row.status === borrowStatus.WaitList) {
      message =
        "successfully accepted the borrowing request, now the book is reserved";
    } else if (row.status === borrowStatus.Accepted) {
      url = `${KY.borrow}/markTaken/${row._id}`;
      message = "the book has been marked as taken by the user";
    } else if (row.status === borrowStatus.Taken) {
      url = `${KY.borrow}/markReturned/${row._id}`;
      message = "the book has been marked as Returned by the user";
    }
    const resp = await makeReq(url, data, MTD.POST);
    if (!resp.ok) return handleErr(resp.message);
    await queryClient.invalidateQueries({ queryKey: [KY.borrow] });
    reset();
    toast.success(message);
  };
  const handleBorrowed = async () => {
    const resp = await makeReq(
      `${KY.borrow}/markTaken/${row._id}`,
      {},
      MTD.POST,
    );
    if (!resp.ok) return handleErr(resp.message);
    await queryClient.invalidateQueries({ queryKey: [KY.borrow] });
    reset();
    toast.success(
      `successfully accepted the borrowing request, now the book is reserved`,
    );
  };

  //==============

  return (
    <div>
      <div className="flex gap-2">
        {row.status === borrowStatus.Accepted && (
          <Button
            onClick={() => setModalOpen(true)}
            className="text-white [background:linear-gradient(161.68deg,_#3498db,_#2980b9)] "
          >
            Mark as Taken
          </Button>
        )}
        {row.status === borrowStatus.Taken && (
          <Button
            onClick={() => setModalOpen(true)}
            className="text-white [background:linear-gradient(161.68deg,_#3498db,_#2980b9)] "
          >
            Mark as Returned
          </Button>
        )}
        {row.status === borrowStatus.WaitList && (
          <Button
            variant={"outline"}
            data-type="accept-book-btn"
            onClick={() => setModalOpen(true)}
            className=" text-white [background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)]"
          >
            Accept Book
          </Button>
        )}
      </div>

      <Modal
        title={`Please Select The Specific instance of the book ${row.bookName} to be reserved`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[]}
      >
        <div className="w-inherit flex flex-col gap-9">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              {row.status === borrowStatus.WaitList && (
                <SingleSelectWithSearch
                  control={control}
                  errors={errors}
                  handleChange={() => {}}
                  handleSearch={(e: string) => {
                    setDonationQ(e);
                  }}
                  data={donation?.body || []}
                  idx={"_id"}
                  dispIdx={"uid"}
                  label={"Instance number"}
                  name={"instanceId"}
                  placeholder={"type unique id of the instance"}
                />
              )}

              {/*-- For marking Book as taken. ---*/}

              {row.status === borrowStatus.Accepted && (
                <InputField
                  register={register}
                  errors={errors}
                  handleChange={handleChange}
                  label={"Taken Date"}
                  name={"takenDate"}
                  req={false}
                  inputType={"date"}
                  placeholder={"When Did the person take the book"}
                />
              )}
              {row.status === borrowStatus.Accepted && (
                <InputField
                  register={register}
                  errors={errors}
                  handleChange={handleChange}
                  label={"Due Date"}
                  name={"dueDate"}
                  req={false}
                  inputType={"date"}
                  placeholder={"When IS the Due date to return the book"}
                />
              )}
              {row.status === borrowStatus.Taken && (
                <InputField
                  register={register}
                  errors={errors}
                  handleChange={handleChange}
                  label={"Returned Date"}
                  name={"returnedDate"}
                  req={false}
                  inputType={"date"}
                  placeholder={"When when was the book returned"}
                />
              )}
              {/*============. notes for status changes ======= */}
              <InputField
                register={register}
                errors={errors}
                handleChange={handleChange}
                label={"Note"}
                name={"note"}
                req={false}
                placeholder={"Write some notes"}
              />
              <Submit isLoading={loading} text={"submit"} />
            </div>

            {DisplayErrors(errors)}
          </form>
        </div>
      </Modal>
    </div>
  );
}
