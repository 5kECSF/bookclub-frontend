"use client";

import { IAuthor } from "./model";
import { Avatar } from "antd";
import React, { useState } from "react";
import { getImg, KY, MTD } from "@/lib/constants";
import AddEditAuthor from "@/app/admin/author/add-edit-modal";
import { EditDeleteButtons } from "@/app/admin/_components/elements/edit-delete-buttons";

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

  // 3 - Class - Provide your own cell renderer component directly without registering.
  {
    headerName: "Description",
    field: "desc",
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
      <AddEditAuthor
        author={row}
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        isUpdate={true}
      />
    </EditDeleteButtons>
  );
};
