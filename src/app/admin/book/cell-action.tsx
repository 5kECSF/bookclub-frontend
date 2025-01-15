"use client";
import { CellUi } from "@/components/admin/ui/cell-ui";
import { KY, MTD } from "@/lib/constants";
import { updateAfterDelete } from "@/lib/functions/updateLocal";
import { useMutate } from "@/lib/state/hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useState } from "react";
import AddEditBook from "./add-edit-modal";
import { IBook } from "./model";

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
      console.log(e.message);
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
