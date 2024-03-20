"use client";
import { message } from "antd";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { KY, MTD } from "@/lib/constants";
import { ISection } from "./model";
import { useMutate } from "@/lib/hooks/useMutation";
import { CellUi } from "@/app/admin/_components/cell-ui";
import AddEditSection from "./add-edit-modal";
import { updateAfterDelete } from "@/lib/functions/updateLocal";

const CellAction = ({ row }: { row: ISection }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const mutation = useMutate();
  const queryClient = useQueryClient();

  const onDelete = async () => {
    try {
      const data = await mutation.mutateAsync({
        url: `${KY.section}/${row.id}`,
        method: MTD.DELETE,
      });
      message.success(`delete ${KY.section} ${data?.body?.name} success`);
      updateAfterDelete(KY.section, queryClient, row.id);
    } catch (e: any) {
      console.log(e);
      message.error(`Error: ${e?.message}`);
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
      <AddEditSection
        section={row}
        isOpen={editOpen}
        onClose={(e) => setEditOpen(false)}
        isUpdate={true}
      />
    </CellUi>
  );
};

export default CellAction;
