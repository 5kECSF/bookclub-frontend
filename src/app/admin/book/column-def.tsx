"use client";

import CellAction from "./cell-action";
// import { FileList, MultiItem, Fileicon } from "@/app/admin/_components/cell-ui";
import { IBook } from "./model";
import { Avatar } from "antd";
import React from "react";
import { getImg } from "@/lib/constants";

export const agColumns = [
  // 1 - undefined - Grid renders the value as a string.
  {
    field: "title",
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
    cellRenderer: (params: { data: IBook }) => <CellAction row={params.data} />,
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Action",
  },
];
