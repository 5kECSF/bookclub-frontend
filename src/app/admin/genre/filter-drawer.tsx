import { FilterLayout } from "@/components/admin/crud/filter-layout";
import { CleanSelectInput } from "@/components/forms/select";
import React from "react";

interface IFilterProps {
  filterOpen: boolean;
  setFilterOpen: any;
  setQuery: any;
}
const ItemStatus = [
  { name: "active" },
  { name: "draft" },
  { name: "deactivated" },
];
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
