"use client";

import AddEditBook from "@/app/admin/book/add-edit-modal";
import { EditDeleteButtons } from "@/components/admin/crud/edit-delete-buttons";
import { MultiItem } from "@/components/admin/ui/cell-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImg, KY } from "@/lib/constants";
import { IUpload } from "@/types/upload";
import { useState } from "react";
import { z } from "zod";

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
    minWidth: 150,

    cellStyle: { padding: "0.4em" },
    flex: 2,
  },  
  // 2 - String - The name of a cell renderer registered with the grid.
  {
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Image",
    minWidth: 150,
    cellRenderer: (params: any) => (
      <Avatar  className="w-10 h-10">
             <AvatarImage src={`${getImg(params.data?.upload)}`} />
             <AvatarFallback>CN</AvatarFallback>
           </Avatar>
    ),
  },
  {
    cellStyle: { padding: "0.4em" },
    autoHeight: true,
    headerName: "Genres",
    minWidth: 200,
    cellRenderer: (params: any) => (
      <MultiItem list={params.data?.genres} />
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
  {
    field: "instanceCnt",
    filter: "agMultiColumnFilter",
    suppressSizeToFit: false,
    minWidth: 100,
    flex: 1,
  },  {
    field: "availableCnt",
    filter: "agMultiColumnFilter",
    suppressSizeToFit: false,
    minWidth: 100,
    flex: 1,
  },
  { headerName: "Category", field: "categoryName", filter: "agMultiColumnFilter", minWidth: 100, },
  { headerName: "Author", field: "authorName", filter: "agMultiColumnFilter", minWidth: 100, },

  // 3 - Class - Provide your own cell renderer component directly without registering.
  {
    headerName: "Description",
    field: "desc",
    filter: "agMultiColumnFilter",
    minWidth: 200,
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