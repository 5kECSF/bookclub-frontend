import { bookStatusList } from "@/app/admin/donation/model-def";
import { FilterLayout } from "@/components/admin/crud/generic-filter";
import { CleanSearch } from "@/components/forms/cleanInputs";
import { CleanSelectInput } from "@/components/forms/select";
import { KY } from "@/lib/constants/routes";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { useState } from "react";
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
  const [bookQ, setBookQ] = useState("");
  const { data: book } = useFetch([KY.book, bookQ], `${KY.book}`, { q: bookQ });
  const [userQ, setUserQ] = useState("");
  const { data: user } = useFetch([KY.user, userQ], `${KY.user}`, { q: userQ });

  return (
    <FilterLayout
      filterOpen={filterOpen}
      setFilterOpen={setFilterOpen}
      setQuery={setQuery}
    >
      <CleanSearch
        handleSearch={(e: string) => {
          setBookQ(e);
        }}
        data={book?.body || []}
        name={"bookId"}
        idx={"_id"}
        dispIdx={"title"}
        label={"Book"}
        req={false}
      />
      <CleanSearch
        handleSearch={(e: string) => {
          setUserQ(e);
        }}
        data={user?.body || []}
        name={"donorId"}
        idx={"_id"}
        dispIdx={"email"}
        label={"Donor"}
        req={false}
      />

      <CleanSelectInput
        data={bookStatusList}
        name={"status"}
        idx={"name"}
        dispIdx={"name"}
        label={"status"}
        req={false}
      />
    </FilterLayout>
  );
}
