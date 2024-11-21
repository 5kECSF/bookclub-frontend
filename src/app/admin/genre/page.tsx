"use client";
import { TableComponent } from "@/components/AgGrid";
import Breadcrumb from "@/components/common/Breadcrumbs/Breadcrumb";
import { KY } from "@/lib/constants";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { useState } from "react";
import AddEditGenre from "./add-edit-modal";
import { agColumns } from "./column-def";
import withAuthorization from "@/lib/functions/withAuthorization";
import { Pagination } from "@/app/admin/_components/ui/pagination";
import {
  FilterDrawer,
  TopButtons,
} from "@/app/admin/_components/ui/FilterDrawer";
import { InputField, SelectInput } from "@/components/forms/cleanInputs";
import { TGenreDto } from "@/app/admin/genre/model";
import { FetchError, Spinner } from "@/app/admin/_components/ui/components";

const GenrePage = () => {
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const [filterOpen, setFilterOpen] = useState(true);
  const setPage = (page: number) => {
    setQuery({ ...query, page });
  };
  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [KY.genre, JSON.stringify(query)],
    `${KY.genre}`,
    query,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const displayedData = data?.body || [];
  return (
    <>
      <Breadcrumb pageName="Genre" />
      <div className="bg-blue h-full">
        <TopButtons openModal={setModalOpen} openDrawer={setFilterOpen} />

        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <FetchError message={error?.message} />
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
interface Ifilter {
  filterOpen: boolean;
  setFilterOpen: any;
  setQuery: any;
}
const Filters = ({ filterOpen, setFilterOpen, setQuery }: Ifilter) => {
  const [modifiedData, setModifiedData] = useState<Partial<TGenreDto>>({});
  // Function to handle field changes
  const handleChange = (fieldName: string, value: any) => {
    setQuery((prevData: any) => ({
      ...prevData,
      [fieldName]: value,
    }));
    console.log("modifiedData", modifiedData);
  };
  // console.log("modifiedData", modifiedData);
  return (
    <div>
      <FilterDrawer isOpen={filterOpen} setIsOpen={setFilterOpen}>
        <div>
          <SelectInput
            changeFunc={handleChange}
            data={[{ name: "a" }, { name: "b" }]}
            name={"name"}
            idx={"name"}
            dispIdx={"name"}
            label={"items"}
            req={false}
          />
          <InputField
            label={"Book Title"}
            name={"q"}
            // errors={errors}
            // register={register}
            changeFunc={handleChange}
            placeholder={"write name"}
          />
        </div>
      </FilterDrawer>
    </div>
  );
};
