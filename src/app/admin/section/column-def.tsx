"use client";

import CellAction from "./cell-action";
import {
  MultiSubContent,
  MultiItem,
  MultiName,
} from "@/app/admin/_components/cell-ui";

export const agColumns = [
  // 1 - undefined - Grid renders the value as a string.
  {
    field: "name",
    filter: "agMultiColumnFilter",
  },
  {
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Contents",
    cellRenderer: (params: any) => (
      <MultiSubContent first={"content"} list={params.data?.contents} />
    ),
  },
  {
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Knowledge",
    cellRenderer: (params: any) => <MultiName list={params.data?.knowledge} />,
  },
  {
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Skills",
    cellRenderer: (params: any) => <MultiName list={params.data?.skills} />,
  },
  // 3 - Class - Provide your own cell renderer component directly without registering.
  {
    headerName: "Description",
    field: "desc",
    filter: "agMultiColumnFilter",
  },
  // 4 - Function - A function that returns a JSX element for display
  {
    cellRenderer: (params: any) => <CellAction row={params.data} />,
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Action",
  },
];
