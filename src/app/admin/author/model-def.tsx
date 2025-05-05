"use client";

import { AddEditModal } from "@/app/admin/author/add-edit-modal";
import { EditDeleteButtons } from "@/components/admin/crud/edit-delete-buttons";
import { getImg, KY } from "@/lib/constants";
import { IUpload } from "@/types/upload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { z } from "zod";

export interface IAuthor {
  _id?: string;
  name: string;
  slug?: string;
  bio?: string;
  fileId?: string;
  body?: string;
  upload?: IUpload;
}

export const AuthorValidator = z.object({
  name: z.string().min(2, { message: "min length is 2" }),
  bio: z.string().min(3, { message: "min length is 2" }),
  status: z.string().optional(),
});
export type TAuthorDto = z.infer<typeof AuthorValidator>;

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
    cellStyle: { padding: "10px" },
    autoHeight: true,
    headerName: "Image",
    maxWidth: 120,
    cellRenderer: (params: any) => (
      <Avatar className="w-10 h-10">
             <AvatarImage src={`${getImg(params.data?.upload)}`} />
             <AvatarFallback>CN</AvatarFallback>
           </Avatar>
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
    headerName: "Bio",
    field: "bio",
    filter: "agMultiColumnFilter",
  },
  // 3

  // 4 - Function - A function that returns a JSX element for display
  {
    cellRenderer: (params: { data: IAuthor }) => (
      <MiniAction row={params.data} />
    ),
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Action",
    pinned: "right",
  },
];

const MiniAction = ({ row }: { row: IAuthor }) => {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <EditDeleteButtons
      name={row.name}
      id={row._id}
      url={KY.author}
      onEditClick={() => setEditOpen(true)}
    >
      <AddEditModal
        isOpen={editOpen}
        onClose={(e) => setEditOpen(false)}
        isUpdate={true}
        author={row}
      />
    </EditDeleteButtons>
  );
};
