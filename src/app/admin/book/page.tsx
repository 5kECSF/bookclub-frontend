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
import { ItemStatus } from "@/types/commonTypes";
import { useEffect, useState } from "react";
import AddEditBook from "./add-edit-modal";
import { FilterDrawer } from "./filters";
import { agColumns } from "./model-def";

const tabs = [...ItemStatus, { name: "", label: "All" }];
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
        <div className="border-gray-200 flex space-x-2 border-b">
          <button
            onClick={() =>
              setQuery({ ...query, status: "", meta: ["featured"] })
            }
            className={`rounded-t-md px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none ${
              query?.meta && query.meta.length > 0
                ? "border-b-2 border-red bg-white text-red"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Featured
          </button>
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setQuery({ ...query, status: tab.name, meta: [] })}
              className={`rounded-t-md px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none ${
                query.status == tab.name || (tab.name == "" && !query.status)
                  ? "border-b-2 border-blue-600 bg-white text-blue-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
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
