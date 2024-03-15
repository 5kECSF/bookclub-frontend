"use client";

import CellAction from "./cell-action";
import { FileList, MultiItem } from "@/app/admin/_components/cell-ui";
import { IContent } from "./model";

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
    cellRenderer: (params: any) => <FileList files={params.data?.uploads} />,
  },

  // 3 - Class - Provide your own cell renderer component directly without registering.
  {
    headerName: "Description",
    field: "desc",
    filter: "agMultiColumnFilter",
  },
  // 4 - Function - A function that returns a JSX element for display
  {
    cellRenderer: (params: { data: IContent }) => (
      <CellAction row={params.data} />
    ),
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Action",
  },
];
