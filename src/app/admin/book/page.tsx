"use client";
import { TopButtons } from "@/components/admin/crud/filter-drawer";
import { Pagination } from "@/components/admin/crud/pagination";
import QueryChips from "@/components/admin/crud/query-chips";
import { FetchError, Spinner } from "@/components/admin/ui/state-components";
import { TableComponent } from "@/components/AgGrid";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb";
import { KY } from "@/lib/constants/routes";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";
import withAuthorization from "@/lib/functions/withAuthorization";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { useEffect, useState } from "react";
import AddEditBook from "./add-edit-modal";
import { FilterDrawer } from "./filters";
import { agColumns } from "./model-def";

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
              total={data?.count}
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
