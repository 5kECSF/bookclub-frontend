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
import AddEditModal from "./add-edit-modal";
import { FilterDrawer } from "./filter-drawer";
import { agColumns, tabs } from "./model-def";

const BorrowPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const [query, setQuery] = useState<Record<string, any>>(
    getQueryFromUrl({ status: "WAITLIST" }),
  );
  const setPage = (page: number) => {
    setQuery({ ...query, page });
  };
  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [KY.borrow, JSON.stringify(query)],
    `${KY.borrow}`,
    query,
  );
  useEffect(() => {
    setUrl(query);
  }, [query]);

  return (
    <>
      <Breadcrumb pageName={"Borrow"} />
      <div className="bg-blue h-full">
        <TopButtons openModal={setModalOpen} openDrawer={setFilterOpen} />
        <QueryChips query={query} setQuery={setQuery} />
        <div className="border-gray-200 flex space-x-2 border-b">
          <button
            onClick={() =>
              setQuery({ ...query, status: "BORROWED", overDue: true })
            }
            className={`rounded-t-md px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none ${
              query.overDue == true
                ? "border-b-2 border-red bg-white text-red"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Over Due
          </button>
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() =>
                setQuery({ ...query, status: tab.name, overDue: false })
              }
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
      </div>

      <AddEditModal
        isOpen={modalOpen}
        onClose={(e) => setModalOpen(false)}
        isUpdate={false}
      />
      <FilterDrawer
        setQuery={setQuery}
        filterOpen={filterOpen}
        setFilterOpen={(e: any) => setFilterOpen(false)}
      />
    </>
  );
};

// export default BorrowPage;
export default withAuthorization(BorrowPage, ["ADMIN"]);
