"use client";
import { KY } from "@/lib/constants";
import { useFetch } from "@/lib/hooks/useQuery";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { agColumns } from "./column-def";
import AddEditBook from "./add-edit-modal";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb";
import { TableComponent } from "@/components/AgGrid";
import { AddButton } from "@/app/admin/_components/cell-ui";

const BookPage = () => {
  const { isLoading, data, isError, error } = useFetch([KY.book], `${KY.book}`);
  const [open, setOpen] = useState(false);
  // console.log("data is", data);
  const displayedData = data?.body || [];
  // const Table = useReactTable({columns, data: displayedData})
  return (
    <>
      <Breadcrumb pageName="Book" />
      <div className="bg-blue h-full">
        <AddButton
          onClick={() => {
            setOpen(true);
          }}
        />
        {isLoading ? (
          <div className="flex min-h-[80vh] items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : isError ? (
          <div>
            {" "}
            Fetching Error: 
            {error?.message}
          </div>
        ) : (
          <div className="pt-8">
            <TableComponent colDefs={agColumns} rowData={displayedData} />
            {/*<Table/>*/}
          </div>
        )}
        <AddEditBook
          isOpen={open}
          onClose={(e) => setOpen(false)}
          isUpdate={false}
        />
      </div>
    </>
  );
};

export default BookPage;
