import { FilterLayout } from "@/components/admin/crud/generic-filter";
import { CleanSelectInput } from "@/components/forms/select";
import { KY } from "@/lib/constants/routes";
import { useFetch } from "@/lib/state/hooks/useQuery";
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
  const { data: category } = useFetch([KY.category], `${KY.category}`);
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
      <CleanSelectInput
       data={category?.body}
        idx={"name"}
        label={"Category"}
        name={"categories"}
        dispIdx={"name"}
        req={false}
      />
    </FilterLayout>
  );
}
