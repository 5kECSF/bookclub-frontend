"use client";
import { message } from "antd";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { KY, MTD } from "@/lib/constants";
import { IBook } from "./model";
import { useMutate } from "@/lib/hooks/useMutation";
import { CellUi } from "@/app/admin/_components/cell-ui";
import AddEditBook from "./add-edit-modal";
import { updateAfterDelete } from "@/lib/functions/updateLocal";

const CellAction = ({ row }: { row: IBook }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const mutation = useMutate();
  const queryClient = useQueryClient();

  const onDelete = async () => {
    try {
      //@ts-ignore
      const data = await mutation.mutateAsync({
        url: `${KY.book}/${row._id}`,
        method: MTD.DELETE,
      });
      message.success(`delete ${KY.book}: ${data?.body?.name} success`);
      updateAfterDelete(KY.book, queryClient, row?._id as string);
      setDeleteOpen(false);
    } catch (e: any) {
      console.log(e);
      message.error(`ERROR: ${e?.message}`);
    }
  };

  return (
    <CellUi
      name={row?.title}
      isPending={mutation.isPending}
      open={deleteOpen}
      onDeleteModalClose={() => setDeleteOpen(false)}
      onConfirm={onDelete}
      onEditClick={() => setEditOpen(true)}
      onDeleteClick={() => setDeleteOpen(true)}
    >
      <AddEditBook
        book={row}
        isOpen={editOpen}
        onClose={(e) => setEditOpen(false)}
        isUpdate={true}
      />
    </CellUi>
  );
};

export default CellAction;
