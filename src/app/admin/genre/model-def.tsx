"use client";

import { AddEditModal } from "@/app/admin/genre/add-edit-modal";
import { EditDeleteButtons } from "@/components/admin/crud/edit-delete-buttons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImg } from "@/lib/constants";
import { KY } from "@/lib/constants/routes";
import { IUpload } from "@/types/upload";
import { useState } from "react";
import { z } from "zod";

export interface IGenre {
  _id?: string;
  name: string;
  category?: string;
  slug?: string;
  desc?: string;
  fileId?: string;
  body?: string;
  upload?: IUpload;
}

export const GenreValidator = z.object({
  name: z.string().min(2, { message: "min length is 2" }),
  category: z.string().min(2, { message: "min length is 2" }),
  desc: z.string().min(3, { message: "min length is 2" }),
  status: z.string().optional(),
});
export type TGenreDto = z.infer<typeof GenreValidator>;

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
    cellStyle: { padding: "2em" },
    // autoHeight: true,
    headerName: "Image",
    maxWidth: 120,
    cellRenderer: (params: any) => (
      <Avatar className="h-10 w-10">
        <AvatarImage src={`${getImg(params.data?.upload)}`} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
  },
    {
    field: "category",
    filter: "agMultiColumnFilter",
    maxWidth: 200,
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
