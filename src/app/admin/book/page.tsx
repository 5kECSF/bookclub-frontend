"use client";
import { KY } from "@/lib/constants";
import { useFetch } from "@/lib/state/hooks/useQuery";
import React, { useState } from "react";
import { agColumns } from "./column-def";
import AddEditBook from "./add-edit-modal";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb";
import { TableComponent } from "@/components/AgGrid";
import withAuthorization from "@/lib/functions/withAuthorization";
import { FetchError, Spinner } from "@/app/admin/_components/ui/components";
import { TopButtons } from "@/app/admin/_components/ui/FilterDrawer";
import QueryChips from "@/app/admin/_components/ui/chips";
import { Pagination } from "@/app/admin/_components/ui/pagination";
import { Filters } from "./filters";

const BookPage = () => {
  const [query, setQuery] = useState({ page: 1, limit: 10, tags: ["a", "b"] });
  const [filterOpen, setFilterOpen] = useState(false);
  const setPage = (page: number) => {
    setQuery({ ...query, page });
  };
  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [KY.book],
    `${KY.book}`,
    query,
  );
  console.log("errors", error);
  const [modalOpen, setModalOpen] = useState(false);
  const displayedData = data?.body || [];
  return (
    <>
      <Breadcrumb pageName="Book" />
      <div className="bg-blue h-full">
        <TopButtons openModal={setModalOpen} openDrawer={setFilterOpen} />
        <QueryChips query={query} setQuery={setQuery} />
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <FetchError message={error?.message} />
        ) : (
          <div className="pt-8">
            <TableComponent colDefs={agColumns} rowData={displayedData} />
            <Pagination
              isPlaceholderData={isPlaceholderData}
              page={query.page}
              hasNext={data?.hasNext || false}
              setPage={setPage}
            />
          </div>
        )}
        <AddEditBook
          isOpen={modalOpen}
          onClose={(e) => setModalOpen(false)}
          isUpdate={false}
        />
        <Filters
          setQuery={setQuery}
          filterOpen={filterOpen}
          setFilterOpen={(e: any) => setFilterOpen(false)}
        />
      </div>
    </>
  );
};

export default withAuthorization(BookPage, ["USER"]);
