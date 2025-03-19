"use client";

import {Avatar} from "antd";
import React, {useState} from "react";
import {getImg, KY} from "@/lib/constants";
import {EditDeleteButtons} from "@/components/admin/crud/edit-delete-buttons";
import AddEditBook from "@/app/admin/book/add-edit-modal";
import {z} from "zod";
import {IUpload} from "@/types/upload";

export interface IBook {
  _id?: string;
  title: string;
  desc: string;
  categoryName: string;
  authorName?: string;
  slug?: string;
  fileId?: string;
  body?: string;
  genres?: string[];
  upload?: IUpload;
}

export const BookValidator = z.object({
  title: z.string().min(2, {message: "min length is 2"}),
  desc: z.string().min(3, {message: "min length is 3"}),
  categoryName: z.string().min(3, {message: "category is required"}),
  authorName: z.string(),
  status: z.string(),
  genres: z.array(z.string()).min(1, {message: "select at least 1 genre"}),
});
export type TBookDto = z.infer<typeof BookValidator>;
/*
Books can be filtered via:
- language(select), category(select), genres(multi-select), author(select),
- queries: (instance count<gt,eq>), page<gt,eq>
* */
//============. Column Defs ==========

export const agColumns = [
  // 1 - undefined - Grid renders the value as a string.
  {
    field: "title",
    filter: "agMultiColumnFilter",
    suppressSizeToFit: false,
  },  {
    field: "instanceCnt",
    filter: "agMultiColumnFilter",
    suppressSizeToFit: false,
  },  {
    field: "availableCnt",
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
  { headerName: "Category", field: "categoryName", filter: "agMultiColumnFilter", minWidth: 100, },
  { headerName: "Author", field: "authorName", filter: "agMultiColumnFilter", minWidth: 100, },

  // 3 - Class - Provide your own cell renderer component directly without registering.
  {
    headerName: "Description",
    field: "desc",
    filter: "agMultiColumnFilter",
  },
  // 3

  // 4 - Function - A function that returns a JSX element for display
  {
    cellRenderer: (params: { data: IBook }) => <MiniAction row={params.data} />,
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Action",
    pinned: "right",
  },
];
const MiniAction = ({ row }: { row: IBook }) => {
  const [editOpen, setEditOpen] = useState(false);
  return (
      <EditDeleteButtons
          name={row.title}
          id={row._id}
          url={KY.book}
          onEditClick={() => setEditOpen(true)}
      >
        <AddEditBook
            book={row}
            isOpen={editOpen}
            onClose={(e) => setEditOpen(false)}
            isUpdate={true}
        />
      </EditDeleteButtons>
  );
};