"use client";

import { IGenre } from "./model";
import { Avatar } from "antd";
import React, { useState } from "react";
import { getImg, KY, MTD } from "@/lib/constants";
import { CellUiFull } from "@/app/admin/_components/ui/cell-ui";
import AddEditGenre from "@/app/admin/genre/add-edit-modal";

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
    <CellUiFull
      name={row.name}
      id={row._id}
      url={KY.genre}
      onEditClick={() => setEditOpen(true)}
    >
      <AddEditGenre
        genre={row}
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        isUpdate={true}
      />
    </CellUiFull>
  );
};
