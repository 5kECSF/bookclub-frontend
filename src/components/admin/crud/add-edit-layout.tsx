import { ZodSchema } from "zod";
import { ItemStatus, KY, MTD } from "@/lib/constants";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useMakeReqState} from "@/lib/state/hooks/useMutation";
import { toast } from "react-toastify";
import { Resp } from "@/lib/constants/return.const";
import { Modal } from "antd";
import { AddEditWrapper } from "@/components/admin/crud/add-edit-wrapper";
import { Submit } from "@/components/forms/useFormInputs";
import { DisplayErrors } from "@/lib/functions/object";
import {ShimProps} from "@/components/admin/crud/add-edit-withFile-layout";

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
    const {makeReq, loading} = useMakeReqState();

    const handleErr = (message: string, autoClose: number = 2500) => {
        toast.error(`${message}`, { autoClose });
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
            <Modal
                title={isUpdate ? `Update ${url}` : `Create ${url}`}
                open={isOpen}
                onCancel={onClose}
                footer={[]}
            >
                <AddEditWrapper title={url}>
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
                </AddEditWrapper>
            </Modal>
        </>
    );
}
