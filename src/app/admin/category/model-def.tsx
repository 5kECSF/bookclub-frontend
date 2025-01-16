"use client";

import { Avatar } from "antd";
import React, { useState } from "react";
import { getImg, KY } from "@/lib/constants";
import { EditDeleteButtons } from "@/components/admin/crud/edit-delete-buttons";
import { AddEditModal } from "@/app/admin/category/add-edit-modal";
import { z } from "zod";
import { IUpload } from "@/types/upload";

export interface ICategory {
  _id?: string;
  name: string;
  slug?: string;
  desc?: string;
  fileId?: string;
  body?: string;
  upload?: IUpload;
}

export const CategoryValidator = z.object({
  name: z.string().min(2, { message: "min length is 2" }),
  desc: z.string().min(3, { message: "min length is 2" }),
  status: z.string().optional(),
});
export type TCategoryDto = z.infer<typeof CategoryValidator>;

// ====== =================  Column Defs for the table ==================
// =====================================================================

export const agColumns = [
  // 1 - undefined - Grid renders the value as a string.
  {
    field: "name",
    filter: "agMultiColumnFilter",
    maxWidth: 200,
  },
  // 2 - String - The name of a cell renderer registered with the grid.
  {
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Image",
    maxWidth: 120,
    cellRenderer: (params: any) => (
      <Avatar size={60} src={getImg(params.data?.upload)} />
    ),
  },
  {
    headerName: "Status",
    field: "status",
    suppressSizeToFit: false, // Allows column to shrink to content size
    filter: "agMultiColumnFilter",
    minWidth: 70, // Adjust based on typical status text length
    maxWidth: 100,
  },

  // 3 - Class - Provide your own cell renderer component directly without registering.
  {
    headerName: "Description",
    field: "desc",
    filter: "agMultiColumnFilter",
  },
  // 3

  // 4 - Function - A function that returns a JSX element for display
  {
    cellRenderer: (params: { data: ICategory }) => (
      <MiniAction row={params.data} />
    ),
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Action",
  },
];

const MiniAction = ({ row }: { row: ICategory }) => {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <EditDeleteButtons
      name={row.name}
      id={row._id}
      url={KY.category}
      onEditClick={() => setEditOpen(true)}
    >
      <AddEditModal
        isOpen={editOpen}
        onClose={setEditOpen}
        isUpdate={true}
        category={row}
      />
    </EditDeleteButtons>
  );
};
