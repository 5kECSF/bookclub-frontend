import { FilterLayout } from "@/components/admin/crud/generic-filter";
import { CleanSelectInput } from "@/components/forms/select";
import { borrowStatusList } from "./model-def";

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
        data={borrowStatusList}
        name={"status"}
        idx={"name"}
        dispIdx={"name"}
        label={"status"}
        req={false}
      />
    </FilterLayout>
  );
}
