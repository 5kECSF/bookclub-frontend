"use client";
import { TableComponent } from "@/components/AgGrid";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb";
import { KY } from "@/lib/constants";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { useEffect, useState } from "react";
import AddEditGenre from "./add-edit-modal";
import { agColumns } from "./column-def";
import withAuthorization from "@/lib/functions/withAuthorization";
import { Pagination } from "@/app/admin/_components/ui/pagination";
import { TopButtons } from "@/app/admin/_components/ui/FilterDrawer";
import { FetchError, Spinner } from "@/app/admin/_components/ui/components";
import { Filters } from "./filters";
import QueryChips from "@/app/admin/_components/ui/chips";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";

const GenrePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  //======================>  Url Related

  const [query, setQuery] = useState<Record<string, any>>(getQueryFromUrl);
  console.log("===+++++++++++quwey222", query);
  const [filterOpen, setFilterOpen] = useState(false);
  const setPage = (page: number) => {
    setQuery({ ...query, page });
  };
  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [KY.genre, JSON.stringify(query)],
    `${KY.genre}`,
    query,
  );

  useEffect(() => {
    setUrl(query);
  }, [query]);

  return (
    <>
      <Breadcrumb pageName="Genre" />
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

        <AddEditGenre
          isOpen={modalOpen}
          onClose={(e: any) => setModalOpen(false)}
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

// export default GenrePage;
export default withAuthorization(GenrePage, ["USER"]);
