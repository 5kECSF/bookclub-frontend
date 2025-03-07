import React, { ReactNode, useState } from "react";
import { useMutate } from "@/lib/state/hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { KY, MTD } from "@/lib/constants";
import { message } from "antd";
import { updateAfterDelete } from "@/lib/functions/updateLocal";
import { GenericButton } from "@/components/admin/ui/genericButton";
import { AlertDeleteModal } from "@/components/admin/crud/AlertDeleteModal";

/**
 -------------   -------------   Action Columns
 */
interface CellUiProps {
  onEditClick: any;
  name: string;
  children: ReactNode;
  id?: string;
  url: KY;
}

export function EditDeleteButtons({
  onEditClick,
  name,
  children,
  id,
  url,
}: CellUiProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { mutateAsync, isPending } = useMutate();
  const queryClient = useQueryClient();
  const onDelete = async () => {
    try {
      //@ts-ignore
      const data = await mutateAsync({
        url: `${url}/${id}`,
        method: MTD.DELETE,
      });
      message.success(`delete ${url}: ${data?.name} success`);
      updateAfterDelete(url, queryClient, id as string);
      setDeleteOpen(false);
    } catch (e: any) {
      console.log(e);
      message.error(`ERROR: ${e?.message}`);
    }
  };
  return (
    <div>
      {/* ----------   edit Delete buttons*/}
      <div className="flex gap-2">
        <GenericButton
          onClick={onEditClick}
          className="text-white [background:linear-gradient(161.68deg,_#3498db,_#2980b9)] "
        >
          Edit
        </GenericButton>
        <GenericButton
          intent={"outline"}
          data-type="delete-knowledge-btn"
          onClick={() => setDeleteOpen(true)}
          className=" text-white [background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)]"
        >
          Delete
        </GenericButton>
      </div>

      {children}
      {/*-----------  delete modal*/}
      <AlertDeleteModal
        name={name}
        dataTest="delete-knowledge-modal"
        loading={isPending}
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={onDelete}
      />
    </div>
  );
}
