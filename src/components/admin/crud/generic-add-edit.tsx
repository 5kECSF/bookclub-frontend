import { MTD } from "@/lib/constants";
import { Resp } from "@/lib/constants/return.const";
import { useMakeReqState } from "@/lib/state/hooks/useMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

import { AddEditModalWrapper } from "@/components/admin/crud/add-edit-modal";
import { ShimProps } from "@/components/admin/crud/generic-add-edit-withFile";
import { Submit } from "@/components/forms/useFormInputs";
import { DisplayErrors } from "@/lib/functions/object";

type Obj = {
  _id?: string;
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
  const queryClient = useQueryClient();
  const { makeReq, loading } = useMakeReqState();

  const handleErr = (message: string, duration: number = 2500) => {
    toast.error(`${message}`, { duration });
  };

  const onSubmit = async (submitData: TDto) => {
    let resp: Resp<any>;

    if (isUpdate && data && "_id" in data) {
      if (!data || !("_id" in data)) {
        return handleErr("malformed update");
      }
      if (Object.keys(modifiedData).length === 0)
        return handleErr(`No data is modified`);
      resp = await makeReq(`${url}/${data._id}`, modifiedData, MTD.PATCH);
      if (!resp.ok) return handleErr(resp.message);
    } else {
      resp = await makeReq(`${url}`, submitData, MTD.POST);
      if (!resp.ok) return handleErr(resp.message);
    }
    reset();
    onClose();
    await queryClient.invalidateQueries({ queryKey: [url] });
    toast.success(`successfully ${isUpdate ? "updated" : "created"} ${url}  `);
  };

  return (
    <>
      <AddEditModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        isUpdate={isUpdate}
        title={url}
      >
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

            <Submit isLoading={loading} update={isUpdate} />
          </div>
          {DisplayErrors(errors)}
        </form>
      </AddEditModalWrapper>
    </>
  );
}
