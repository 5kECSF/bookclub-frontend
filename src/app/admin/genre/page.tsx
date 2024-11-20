"use client";
import { TableComponent } from "@/components/AgGrid";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb";
import { KY } from "@/lib/constants";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { Loader } from "lucide-react";
import { useState } from "react";
import AddEditGenre from "./add-edit-modal";
import { agColumns } from "./column-def";
import withAuthorization from "@/lib/functions/withAuthorization";
import { Pagination } from "@/app/admin/_components/ui/pagination";
import { Drawer, TopButtons } from "@/app/admin/_components/ui/Drawer";

const GenrePage = () => {
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const [isOpen, setIsOpen] = useState(true);
  const setPage = (page: number) => {
    setQuery({ ...query, page });
  };
  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [KY.genre, JSON.stringify(query)],
    `${KY.genre}`,
    query,
  );
  const [open, setOpen] = useState(false);
  const displayedData = data?.body || [];
  return (
    <>
      <Breadcrumb pageName="Genre" />
      <div className="bg-blue h-full">
        <TopButtons openModal={setOpen} openDrawer={setIsOpen} />

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
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
          <div></div>
        </Drawer>
      </div>
    </>
  );
};

// export default GenrePage;
export default withAuthorization(GenrePage, ["USER"]);
