"use client";

import AddEditModal from "@/app/admin/borrow/add-edit-modal";
import { BorrowAction } from "@/app/admin/borrow/borrow-action";
import { EditDeleteButtons } from "@/components/admin/crud/edit-delete-buttons";
import { getImg, KY } from "@/lib/constants";
import { useState } from "react";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export interface IBorrow {
  _id?: string;
  bookId: string;
  bookName?: string;
  userId?: string;
  userName?: string;
  instanceId?: string;
  instanceUid?: string;

  note?: string;
  status?: borrowStatus;
  imgUrl?: string;
  //dates
  acceptedDate?: Date;
  takenDate?: Date;
  dueDate?: Date;
  returnedDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
export enum borrowStatus {
  Taken = "BORROWED",
  WaitList = "WAITLIST",
  Accepted = "ACCEPTED",
  Returned = "RETURNED",
  Donation = "donation",
}
export const borrowStatusList = [
  { name: borrowStatus.Taken },
  { name: borrowStatus.WaitList },
  { name: borrowStatus.Accepted },
  { name: borrowStatus.Returned },
];
export const BorrowValidator = z.object({
  bookId: z.string().min(2, { message: "min length is 2" }),
  userId: z.string().min(2, { message: "min length is 2" }),
  instanceId: z.string().min(2, { message: "min length is 2" }),
  takenDate: z.date().optional(),
  dueDate: z.date().optional(),
  returnedDate: z.date().optional(),
  note: z.string().min(3, { message: "min length is 2" }),
  status: z
    .enum([
      borrowStatus.Taken,
      borrowStatus.Returned,
      borrowStatus.WaitList,
      borrowStatus.Accepted,
    ])
    .optional(),
});

export type TBorrowDto = z.infer<typeof BorrowValidator>;

// ====== =================  Column Defs for the table ==================
// =====================================================================

export const agColumns = [
  // 1 - undefined - Grid renders the value as a string.
  { field: "bookName", filter: "agMultiColumnFilter", maxWidth: 200 },
  // 2 - String - The name of a cell renderer registered with the grid.
  {
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Image",
    maxWidth: 120,
    cellRenderer: (params: any) => (
      <Avatar className="h-10 w-10">
        <AvatarImage src={`${getImg(params.data?.upload)}`} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
  },
  { field: "instanceUid", filter: "agMultiColumnFilter", maxWidth: 200 },
  { field: "userName", filter: "agMultiColumnFilter", maxWidth: 200 },
  {
    headerName: "Status",
    field: "status",
    suppressSizeToFit: false, // Allows column to shrink to content size
    filter: "agMultiColumnFilter",
    minWidth: 70, // Adjust based on typical status text length
    maxWidth: 200,
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
    cellRenderer: (params: { data: IBorrow }) => (
      <BorrowAction row={params.data} />
    ),
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Borrow Actions",
    pinned: "right",
  },
  {
    cellRenderer: (params: { data: IBorrow }) => (
      <MiniAction row={params.data} />
    ),
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Action",
    pinned: "right",
  },
];

const MiniAction = ({ row }: { row: IBorrow }) => {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <EditDeleteButtons
      name={row?.bookName as string}
      id={row._id}
      url={KY.borrow}
      onEditClick={() => setEditOpen(true)}
    >
      <AddEditModal
        isOpen={editOpen}
        onClose={(e) => setEditOpen(false)}
        isUpdate={true}
        borrow={row}
      />
    </EditDeleteButtons>
  );
};
