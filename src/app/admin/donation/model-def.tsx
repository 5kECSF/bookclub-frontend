"use client";

import AddEdit from "@/app/admin/donation/add-edit";
import { EditDeleteButtons } from "@/components/admin/crud/edit-delete-buttons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImg } from "@/lib/constants";
import { KY } from "@/lib/constants/routes";
import { IUpload } from "@/types/upload";
import { useState } from "react";
import { z } from "zod";

export interface IDonation {
  _id?: string;
  desc?: string;
  bookId: string;
  donorId: string;
  uid?: string;
  donorName?: string;
  bookName?: string;
  donatedDate?: Date;
  status?: bookStatus;
  note?: string;
  upload?: IUpload;
  createdAt?: Date;
  updatedAt?: Date;
}
export enum bookStatus {
  Available = "AVAILABLE",
  NotAvailable = "NOT_AVAILABLE", // if it is not borrowed but un available for another reason
  Taken = "TAKEN",
  Reserved = "RESERVED", // if it has been accepted to be borrowed
}
export const bookStatusList = [
  { name: bookStatus.Available, label: "Available" },
  { name: bookStatus.NotAvailable, label: "Not Available" },
  { name: bookStatus.Taken, label: "Borrowed" },
  { name: bookStatus.Reserved, label: "Reserved" },
];
export const tabs = [...bookStatusList, { name: "", label: "All" }];
export const DonationValidator = z.object({
  note: z.string().min(3, { message: "min length is 2" }),
  donorId: z.string().min(1, { message: "min length is 2" }),
  bookId: z.string().min(2, { message: "min length is 2" }),
  donatedDate: z.date().optional(),
  status: z
    .enum([
      bookStatus.Available,
      bookStatus.NotAvailable,
      bookStatus.Taken,
      bookStatus.Reserved,
    ])
    .optional(),
});
export type TDonationDto = z.infer<typeof DonationValidator>;

// ====== =================  Column Defs for the table ==================
// =====================================================================

export const agColumns = [
  {
    field: "bookName",
    filter: "agMultiColumnFilter",
    minWidth: 150,
  },
  {
    field: "uid",
    filter: "agMultiColumnFilter",
    maxWidth: 150,
  },
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
  {
    field: "donorName",
    filter: "agMultiColumnFilter",
    minWidth: 150,
  },
  {
    field: "donatedDate",
    filter: "agMultiColumnFilter",
    minWidth: 150,
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
    headerName: "Note",
    field: "note",
    filter: "agMultiColumnFilter",
  },
  // 3

  // 4 - Function - A function that returns a JSX element for display
  {
    cellRenderer: (params: { data: IDonation }) => (
      <MiniAction row={params.data} />
    ),
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Action",
    pinned: "right",
  },
];

const MiniAction = ({ row }: { row: IDonation }) => {
  const [editOpen, setEditOpen] = useState(false);
  return (
    <EditDeleteButtons
      name={row?.bookName as string}
      id={row._id}
      url={KY.donation}
      onEditClick={() => setEditOpen(true)}
    >
      <AddEdit
        isOpen={editOpen}
        onClose={(e) => setEditOpen(false)}
        isUpdate={true}
        donation={row}
      />
    </EditDeleteButtons>
  );
};
