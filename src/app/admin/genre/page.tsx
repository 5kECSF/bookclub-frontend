"use client";
import { AddButton } from "@/app/admin/_components/ui/cell-ui";
import { TableComponent } from "@/components/AgGrid";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb";
import { KY } from "@/lib/constants";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { Loader, LucideArrowLeft, LucideArrowRight } from "lucide-react";
import { useState } from "react";
import AddEditGenre from "./add-edit-modal";
import { agColumns } from "./column-def";
import withAuthorization from "@/lib/functions/withAuthorization";
import { GenericButton } from "@/app/admin/_components/ui/genericButton";

const GenrePage = () => {
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const setPage = (page: number) => {
    setQuery({ ...query, page });
  };
  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [KY.genre, JSON.stringify(query)],
    `${KY.genre}`,
    query,
  );
  const [open, setOpen] = useState(false);
  console.log("data is", data);
  const displayedData = data?.body || [];
  return (
    <>
      <Breadcrumb pageName="Genre" />
      <div className="bg-blue h-full">
        <AddButton
          onClick={() => {
            setOpen(true);
          }}
        />
        {isLoading ? (
          <div className="flex min-h-[80vh] items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : isError ? (
          <div>
            Fetching Error:
            {error?.message}
          </div>
        ) : (
          <div className="pt-8">
            <TableComponent colDefs={agColumns} rowData={displayedData} />
            <Pagination
              isPlaceholderData={isPlaceholderData}
              page={query.page}
              hasNext={data.hasNext}
              setPage={setPage}
            />
          </div>
        )}
        <AddEditGenre
          isOpen={open}
          onClose={(e: any) => setOpen(false)}
          isUpdate={false}
        />
      </div>
    </>
  );
};

// export default GenrePage;
export default withAuthorization(GenrePage, ["USER"]);

interface IPagination {
  isPlaceholderData: boolean;
  page: number;
  hasNext: boolean;
  setPage: any;
}
const Pagination = ({
  isPlaceholderData,
  page,
  hasNext,
  setPage,
}: IPagination) => {
  console.log("placeHolder", isPlaceholderData, hasNext);
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <GenericButton
        onClick={() => setPage(Math.max(page - 1, 1))}
        className="flex gap-2 text-white [background:linear-gradient(161.68deg,_#001f3f,_#003366)]"
        disabled={page === 1}
      >
        <LucideArrowLeft /> Prev
      </GenericButton>
      <p className="text-bold text-xl">{page}</p>
      <GenericButton
        onClick={() => {
          if (!isPlaceholderData && hasNext) {
            setPage(page + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPlaceholderData || !hasNext}
        className="flex gap-2 text-white [background:linear-gradient(161.68deg,_#001f3f,_#003366)]"
      >
        Next <LucideArrowRight />
      </GenericButton>
    </div>
  );
};
