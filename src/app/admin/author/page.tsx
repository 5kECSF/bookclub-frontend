"use client";
import { TableComponent } from "@/components/AgGrid";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb";
import { KY } from "@/lib/constants";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { useEffect, useState } from "react";
import AddEditAuthor from "./add-edit-modal";
import { agColumns } from "./column-def";
import withAuthorization from "@/lib/functions/withAuthorization";
import { Pagination } from "@/app/admin/_components/elements/pagination";
import { TopButtons } from "@/app/admin/_components/elements/FilterDrawer";
import { FetchError, Spinner } from "@/app/admin/_components/ui/components";
import { Filters } from "./filters";
import QueryChips from "@/app/admin/_components/elements/query-chips";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";
import { AddEditWrapper } from "@/app/admin/generic/generic";
import { IAuthor, TAuthorDto } from "@/app/admin/author/model";

const AuthorPage = () => {
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
    [KY.author, JSON.stringify(query)],
    `${KY.author}`,
    query,
  );

  useEffect(() => {
    setUrl(query);
  }, [query]);

  return (
    <>
      <Breadcrumb pageName="Author" />
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
        {/*<AddEditWrapper<IAuthor, TAuthorDto> url={KY.author} isOpen={modalOpen} isUpdate={false}  onClose={(e: any) => setModalOpen(false)}>*/}
        {/*  */}
        {/*</AddEditWrapper>*/}
        <AddEditAuthor
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

// export default AuthorPage;
export default withAuthorization(AuthorPage, ["USER"]);
