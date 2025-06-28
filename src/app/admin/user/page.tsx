"use client";
import { TopButtons } from "@/components/admin/crud/filter-drawer";
import { Pagination } from "@/components/admin/crud/pagination";
import QueryChips from "@/components/admin/crud/query-chips";
import { FetchError, Spinner } from "@/components/admin/ui/state-components";
import { TableComponent } from "@/components/AgGrid";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb";
import { KY } from "@/lib/constants/routes";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { ACCOUNT_STATUS } from "@/types/user";
import { useEffect, useState } from "react";
import { FilterDrawer } from "./filter-drawer";
import { agColumns } from "./model-def";
const UserPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  const [query, setQuery] = useState<Record<string, any>>(
    getQueryFromUrl({
      accountStatus: ACCOUNT_STATUS.UN_APPROVED,
    }),
  );
  const setPage = (page: number) => {
    setQuery({ ...query, page });
  };
  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [KY.user, JSON.stringify(query)],
    `${KY.user}`,
    query,
  );
  useEffect(() => {
    setUrl(query);
  }, [query]);

  const tabs = [
    { id: ACCOUNT_STATUS.UN_APPROVED, label: "Un Approved Users" },
    { id: ACCOUNT_STATUS.ACTIVE, label: "Active Users" },
    { id: ACCOUNT_STATUS.BLOCKED, label: "Blocked Users" },

    { id: "", label: "All" },
  ];

  return (
    <>
      <Breadcrumb pageName={"Users"} />
      <div className="bg-blue h-full">
        <TopButtons
          add={false}
          openModal={() => {}}
          openDrawer={setFilterOpen}
        />
        <QueryChips query={query} setQuery={setQuery} />
        <div className="border-gray-200 flex space-x-2 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setQuery({ ...query, accountStatus: tab.id })}
              className={`rounded-t-md px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none ${
                query.accountStatus == tab.id ||
                (tab.id == "" && !query.accountStatus)
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

      <FilterDrawer
        setQuery={setQuery}
        filterOpen={filterOpen}
        setFilterOpen={(e: any) => setFilterOpen(false)}
      />
    </>
  );
};

// export default UserPage;
export default UserPage;
// export default withAuthorization(UserPage, [ RoleType.ADMIN, RoleType.USER]);
