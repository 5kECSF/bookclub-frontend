"use client";

import CellAction from "./cell-action";
// import { FileList, MultiItem, Fileicon } from "@/components/admin/cell-svgs";
import { IBook } from "./model";
import { Avatar } from "antd";
import React from "react";
import { getImg } from "@/lib/constants";

export const agColumns = [
  // 1 - undefined - Grid renders the value as a string.
  {
    field: "title",
    filter: "agMultiColumnFilter",
    suppressSizeToFit: false,
  },
  // 2 - String - The name of a cell renderer registered with the grid.
  {
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Files",
    cellRenderer: (params: any) => <Avatar src={getImg(params.data?.upload)} />,
  },
  {
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Genres",
    cellRenderer: (params: any) => (
        <div className="flex flex-wrap gap-2">
          {params.data?.genres?.length > 0 ? (
              params.data.genres.map((genre: string, index: number) => (
                  <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
            {genre}
          </span>
              ))
          ) : (
              <span className="text-gray-500">No genres</span>
          )}
        </div>
    )
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
    cellRenderer: (params: { data: IBook }) => <CellAction row={params.data} />,
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Action",
  },
];
