"use client";
import { KY } from "@/lib/constants";
import { useFetch } from "@/lib/state/hooks/useQuery";
import React, { useEffect, useState } from "react";
import { agColumns } from "./model-def";
import AddEditBook from "./add-edit-modal";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb";
import { TableComponent } from "@/components/AgGrid";
import withAuthorization from "@/lib/functions/withAuthorization";
import { FetchError, Spinner } from "@/components/admin/ui/state-components";
import { TopButtons } from "@/components/admin/crud/filter-wrapper";
import QueryChips from "@/components/admin/crud/query-chips";
import { Pagination } from "@/components/admin/crud/pagination";
import { FilterDrawer } from "./filters";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";

const BookPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  //======================>  Query related
  const [query, setQuery] = useState<Record<string, any>>(
    getQueryFromUrl({ status: "active" }),
  );
  const setPage = (page: number) => {
    setQuery({ ...query, page });
  };
  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [KY.book, JSON.stringify(query)],
    `${KY.book}`,
    query,
  );
  useEffect(() => {
    setUrl(query);
  }, [query]);
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
            <TableComponent colDefs={agColumns} rowData={data?.body || []} />
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
        <FilterDrawer
          setQuery={setQuery}
          filterOpen={filterOpen}
          setFilterOpen={(e: any) => setFilterOpen(false)}
        />
      </div>
    </>
  );
};

export default withAuthorization(BookPage, ["ADMIN"]);
