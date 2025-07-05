"use client";
import { TopButtons } from "@/components/admin/crud/filter-drawer";
import { Pagination } from "@/components/admin/crud/pagination";
import QueryChips from "@/components/admin/crud/query-chips";
import { FetchError } from "@/components/admin/ui/state-components";
import { TableComponent } from "@/components/AgGrid";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb";
import { Spinner } from "@/components/spinner";
import { KY } from "@/lib/constants/routes";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";
import withAuthorization from "@/lib/functions/withAuthorization";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { useEffect, useState } from "react";
import AddEdit from "./add-edit";
import { FilterDrawer } from "./filter-drawer";
import { agColumns, tabs } from "./model-def";

const DonationPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const [query, setQuery] = useState<Record<string, any>>(getQueryFromUrl({}));

  useEffect(() => {
    setUrl(query);
  }, [query]);
  const setPage = (page: number) => {
    setQuery({ ...query, page });
  };

  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [KY.donation, JSON.stringify(query)],
    `${KY.donation}`,
    query,
  );

  return (
    <>
      <Breadcrumb pageName={"Donations"} />
      <div className="bg-blue h-full">
        <TopButtons openModal={setModalOpen} openDrawer={setFilterOpen} />
        <QueryChips query={query} setQuery={setQuery} />
        <div className="border-gray-200 flex space-x-2 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() =>
                setQuery({ ...query, status: tab.name, overDue: null })
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
      <AddEdit
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

// export default DonationPage;
export default withAuthorization(DonationPage, ["ADMIN"]);
