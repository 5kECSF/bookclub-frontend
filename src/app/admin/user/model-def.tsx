"use client";


import React, { useState } from "react";
import { getImg, KY } from "@/lib/constants";
import { EditDeleteButtons } from "@/components/admin/crud/edit-delete-buttons";
import { AddEditModal } from "@/app/admin/user/add-edit-modal";
import { z } from "zod";
import { IUpload } from "@/types/upload";
export enum RoleType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export interface IUser {
  _id?: string;
  email: string;
  password?: string;
  firstName: string;
  lastName?: string;
  fullName?: string;
  role: RoleType;
  active?: boolean;

}

export const UserValidator = z.object({
  email: z.string().min(2, { message: "min length is 2" }),
  password: z.string().optional(),
  firstName: z.string().min(2, { message: "min length is 2" }),
  lastName: z.string().optional(),
  role: z.enum([RoleType.USER, RoleType.ADMIN]),

});
export type TUserDto = z.infer<typeof UserValidator>;

// ====== =================  Column Defs for the table ==================
// =====================================================================

export const agColumns = [
  // 1 - undefined - Grid renders the value as a string.
  { field: "email",  filter: "agMultiColumnFilter", maxWidth: 200},
  { field: "fullName",  filter: "agMultiColumnFilter", maxWidth: 200},
  { field: "firstName",  filter: "agMultiColumnFilter", maxWidth: 200},
  { field: "lastName",  filter: "agMultiColumnFilter", maxWidth: 200},
  { field: "donatedCount",  filter: "agMultiColumnFilter", maxWidth: 200},
  {
    field: "role",
    suppressSizeToFit: false, // Allows column to shrink to content size
    filter: "agMultiColumnFilter",
    minWidth: 70, // Adjust based on typical status text length
    maxWidth: 100,
  },


  // 3

  // 4 - Function - A function that returns a JSX element for display
  {
    cellRenderer: (params: { data: IUser }) => (
      <MiniAction row={params.data} />
    ),
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Action",
  },
];

const MiniAction = ({ row }: { row: IUser }) => {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <EditDeleteButtons
      name={row.email}
      id={row._id}
      url={KY.user}
      onEditClick={() => setEditOpen(true)}
    >
      <AddEditModal
        isOpen={editOpen}
        onClose={setEditOpen}
        isUpdate={true}
        user={row}
      />
    </EditDeleteButtons>
  );
};
