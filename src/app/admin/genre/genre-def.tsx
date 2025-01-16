"use client";

import { Avatar } from "antd";
import React, { useState } from "react";
import { getImg, KY } from "@/lib/constants";
import { EditDeleteButtons } from "@/components/admin/crud/edit-delete-buttons";
import { AddEditModal } from "@/app/admin/genre/add-edit-modal";
import { z } from "zod";
import { IUpload } from "@/types/upload";

export interface IGenre {
  _id?: string;
  name: string;
  slug?: string;
  desc?: string;
  fileId?: string;
  body?: string;
  upload?: IUpload;
}

export const GenreValidator = z.object({
  name: z.string().min(2, { message: "min length is 2" }),
  desc: z.string().min(3, { message: "min length is 2" }),
});
export type TGenreDto = z.infer<typeof GenreValidator>;

// ====== =================  Column Defs for the table ==================
// =====================================================================

export const agColumns = [
  // 1 - undefined - Grid renders the value as a string.
  {
    field: "name",
    filter: "agMultiColumnFilter",
  },
  // 2 - String - The name of a cell renderer registered with the grid.
  {
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Files",
    cellRenderer: (params: any) => <Avatar src={getImg(params.data?.upload)} />,
  },
  {
    headerName: "Status",
    field: "status",
    filter: "agMultiColumnFilter",
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
    cellRenderer: (params: { data: IGenre }) => (
      <MiniAction row={params.data} />
    ),
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Action",
  },
];

const MiniAction = ({ row }: { row: IGenre }) => {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <EditDeleteButtons
      name={row.name}
      id={row._id}
      url={KY.genre}
      onEditClick={() => setEditOpen(true)}
    >
      <AddEditModal
        isOpen={editOpen}
        onClose={setEditOpen}
        isUpdate={true}
        genre={row}
      />
    </EditDeleteButtons>
  );
};
