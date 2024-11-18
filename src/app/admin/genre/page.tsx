"use client";
import { AddButton } from "@/app/admin/_components/cell-ui";
import { TableComponent } from "@/components/AgGrid";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb";
import { KY } from "@/lib/constants";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { Loader } from "lucide-react";
import { useState } from "react";
import AddEditGenre from "./add-edit-modal";
import { agColumns } from "./column-def";
import withAuthorization from "@/lib/functions/withAuthorization";

const GenrePage = () => {
  const { isLoading, data, isError, error } = useFetch(
    [KY.genre],
    `${KY.genre}`,
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
            {" "}
            Fetching Error:
            {error?.message}
          </div>
        ) : (
          <div className="pt-8">
            <TableComponent colDefs={agColumns} rowData={displayedData} />
            {/*<Table/>*/}
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
export default withAuthorization(GenrePage, ["ADMIN"]);
