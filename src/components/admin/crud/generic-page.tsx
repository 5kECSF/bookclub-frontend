import { TopButtons } from "@/components/admin/crud/filter-drawer";
import { Pagination } from "@/components/admin/crud/pagination";
import QueryChips from "@/components/admin/crud/query-chips";
import { FetchError, Spinner } from "@/components/admin/ui/state-components";
import { TableComponent } from "@/components/AgGrid";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb";
import { KY } from "@/lib/constants/routes";
import { setUrl } from "@/lib/functions/url";
import { useFetch } from "@/lib/state/hooks/useQuery";
import React, { useEffect } from "react";

interface PageLayoutProps {
  setQuery: React.Dispatch<React.SetStateAction<Record<string, any>>>; // State updater function for query
  query: Record<string, any>; // Query object
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>; // State updater for modalOpen
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>; // State updater for filterOpen
  pageName: string;
  url: KY;
  agColumns: any;
  add?: boolean;
}

export function PageLayout({
  setQuery,
  query,
  setModalOpen,
  setFilterOpen,
  pageName,
  url,
  agColumns,
  add = true,
}: PageLayoutProps) {
  const setPage = (page: number) => {
    setQuery({ ...query, page });
  };
  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [url, JSON.stringify(query)],
    `${url}`,
    query,
  );

  useEffect(() => {
    setUrl(query);
  }, [query]);

  return (
    <>
      <Breadcrumb pageName={pageName} />
      <div className="bg-blue h-full">
        <TopButtons
          add={add}
          openModal={setModalOpen}
          openDrawer={setFilterOpen}
        />
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
      </div>
    </>
  );
}
