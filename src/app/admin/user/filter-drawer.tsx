import { FilterLayout } from "@/components/admin/crud/filter-layout";
import { CleanSelectInput } from "@/components/forms/select";
import React from "react";
import { ItemStatus } from "@/types/commonTypes";

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
  return (
    <FilterLayout
      filterOpen={filterOpen}
      setFilterOpen={setFilterOpen}
      setQuery={setQuery}
    >
      <CleanSelectInput
        data={[{role: "ADMIN"},{role: "USER"}]}
        name={"role"}
        idx={"role"}
        dispIdx={"role"}
        label={"role"}
        req={false}
      />
    </FilterLayout>
  );
}
