import { FilterLayout } from "@/components/admin/crud/generic-filter";
import { CleanSelectInput } from "@/components/forms/select";
import { ACCOUNT_STATUS, deptData, RoleType, teamData } from "@/types/user";

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
        data={[{ role: RoleType.ADMIN }, { role: RoleType.USER }]}
        name={"role"}
        idx={"role"}
        dispIdx={"role"}
        label={"role"}
        req={false}
      />
      <CleanSelectInput
        data={teamData}
        name={"team"}
        idx={"name"}
        dispIdx={"name"}
        label={"Team"}
        req={false}
      />
      <CleanSelectInput
        data={deptData}
        name={"department"}
        idx={"name"}
        dispIdx={"name"}
        label={"Department"}
        req={false}
      />
      <CleanSelectInput
        data={[
          { status: ACCOUNT_STATUS.ACTIVE },
          { status: ACCOUNT_STATUS.BLOCKED },
        ]}
        name={"accountStatus"}
        idx={"status"}
        dispIdx={"status"}
        label={"Account Status"}
        req={false}
      />
    </FilterLayout>
  );
}
