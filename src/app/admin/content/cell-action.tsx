"use client";
import { message } from "antd";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { KY, MTD } from "@/lib/constants";
import { IContent } from "./model";
import { useMutate } from "@/lib/hooks/useMutation";
import { CellUi } from "@/app/admin/_components/cell-ui";
import AddEditContent from "./add-edit-modal";
import { updateAfterDelete } from "@/lib/functions/updateLocal";

const CellAction = ({ row }: { row: IContent }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const mutation = useMutate();
  const queryClient = useQueryClient();

  const onDelete = async () => {
    try {
      //@ts-ignore
      const data = await mutation.mutateAsync({
        url: `${KY.content}/${row.id}`,
        method: MTD.DELETE,
      });
      message.success(`delete ${KY.content}: ${data?.body?.name} success`);
      updateAfterDelete(KY.content, queryClient, row.id);
      setDeleteOpen(false);
    } catch (e: any) {
      console.log(e);
      message.error(`ERROR: ${e?.message}`);
    }
  };

  return (
    <CellUi
      name={row.name}
      isPending={mutation.isPending}
      open={deleteOpen}
      onDeleteModalClose={() => setDeleteOpen(false)}
      onConfirm={onDelete}
      onEditClick={() => setEditOpen(true)}
      onDeleteClick={() => setDeleteOpen(true)}
    >
      <AddEditContent
        content={row}
        isOpen={editOpen}
        onClose={(e) => setEditOpen(false)}
        isUpdate={true}
      />
    </CellUi>
  );
};

export default CellAction;
