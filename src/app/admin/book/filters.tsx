import { FilterLayout } from "@/components/admin/crud/filter-layout";
import { CleanSelectInput } from "@/components/forms/select";
import React from "react";
import { ItemStatus } from "@/types/commonTypes";
import {useFetch} from "@/lib/state/hooks/useQuery";
import {KY} from "@/lib/constants";
import {CleanMultiSelect} from "@/components/forms/multi-select";

interface IFilterProps {
  filterOpen: boolean;
  setFilterOpen: any;
  setQuery: any;
}
export function FilterDrawer({
                               filterOpen,
                               setFilterOpen,
                               setQuery,
                             }: IFilterProps) {

  const {  data: category } = useFetch(
      [KY.category],
      `${KY.category}`,
  );
    const {  data: genre } = useFetch(
        [KY.genre, "100"],
        `${KY.genre}`,{limit: 100}
    );
    const {  data: author } = useFetch(
        [KY.author],
        `${KY.author}`,
    );
  return (
      <FilterLayout
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
          setQuery={setQuery}
      >
        <CleanSelectInput
            data={category?.body}
            name={"categoryId"}
            idx={"_id"}
            dispIdx={"name"}
            label={"Category"}
            req={false}
        />
          <CleanSelectInput
            data={author?.body}
            name={"authorId"}
            idx={"_id"}
            dispIdx={"name"}
            label={"Author"}
            req={false}
        />
          <CleanMultiSelect
            data={genre?.body}
            name={"genres"}
            idx={"name"}
            dispIdx={"name"}
            label={"Genre"}
            req={false}
        />
        <CleanSelectInput
            data={ItemStatus}
            name={"status"}
            idx={"name"}
            dispIdx={"name"}
            label={"status"}
            req={false}
        />
      </FilterLayout>
  );
}
