import { FilterLayout } from "@/components/admin/crud/filter-layout";
import { CleanSelectInput } from "@/components/forms/select";
import React, {useState} from "react";
import { ItemStatus } from "@/types/commonTypes";
import {useFetch} from "@/lib/state/hooks/useQuery";
import {KY} from "@/lib/constants";

import {CleanMultiSearch, CleanMultiSelect, CleanSearch} from "@/components/forms/cleanInputs";

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

    const [ctgQ, setCtgQ] = useState("")
    const {  data: category } = useFetch(
      [KY.category, ctgQ],
      `${KY.category}`, {limit: 100, q: ctgQ}
  );
    const [genQ, setGenQ] = useState("")
    const {  data: genre } = useFetch(
        [KY.genre, "100", genQ],
        `${KY.genre}`, {limit: 100, q: genQ}
    );
    const [authorQ, setAuthorQ] = useState("")
    const {  data: author } = useFetch(
        [KY.author, authorQ],
        `${KY.author}`,{limit: 100, q: authorQ}
    );
  return (
      <FilterLayout
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
          setQuery={setQuery}
      >
          <CleanSearch
              handleSearch={(e: string)=>{setCtgQ(e)}}
              data={category?.body || []}
              name={"categoryName"}
              idx={"name"}
              dispIdx={"name"}
              label={"Category"}
              req={false}
          />
          <CleanMultiSearch
              handleSearch={(e: string)=>{setGenQ(e)}}
              data={genre?.body || []}
              name={"genres"}
              idx={"name"}
              dispIdx={"name"}
              label={"Genre"}
              req={false}
          />
          <CleanSearch
              handleSearch={(e: string)=>{setAuthorQ(e)}}
              data={author?.body || []}
              name={"authorName"}
              idx={"name"}
              dispIdx={"name"}
              label={"Author"}
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
