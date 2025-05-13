import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, List } from "lucide-react";
import { BiFilter } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeaderFilterProps {
  isGrid: boolean;
  setIsGrid: (isGrid: boolean) => void;
  setDrawerOpen: (isGrid: boolean) => void;
  count: number;
  setQuery: any;
  page: number;
  limit: number;
  query: any;
}

export const HeaderFilter = ({
  isGrid,
  setIsGrid,
  setDrawerOpen,
  count,
  page,
  limit,
  setQuery,
  query,
}: HeaderFilterProps) => {
  // const [limit, setLimit] = useState<string>(limit.toString());
  const handleLimitChange = (value: string) => {
    setQuery((prev: any) => ({
      ...prev,
      limit: Number(value),
    }));
  };
  const handleSortChange = (value: string) => {
    const sortStrs = value.split("-");
    if (sortStrs.length != 2) {
      return;
    }

    setQuery((prev: any) => ({
      ...prev,
      _sortDir: sortStrs[1],
      sort: sortStrs[0],
    }));
  };
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 align-middle">
      <Button
        className=" text-white [background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)] lg:hidden "
        data-test="filter-button"
        onClick={() => setDrawerOpen(true)}
      >
        <BiFilter className="mr-2 text-[20px] " />
        Filter
      </Button>
      {/*==================.  Sorting ====================*/}
      <div className=" hidden items-center gap-2.5 lg:flex">
        <Select
          defaultValue={`${query?.sort || "_id"}-${query?._sortDir || "desc"}`}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="border-none text-base font-bold text-[#393280] shadow-none">
            <span className="mr-1">Sort by :</span>
            <SelectValue placeholder="Date, latest to oldest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title-asc">Alphabetically, A-Z</SelectItem>
            <SelectItem value="title-desc">Alphabetically, Z-A</SelectItem>
            <SelectItem value="_id-desc">Date, latest to oldest</SelectItem>
            <SelectItem value="_id-asc">Date, oldest to latest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="text-base font-bold leading-8 text-[#393280]">
        Showing {(page - 1) * limit + 1} - {Math.min(page * limit, count)} of{" "}
        {count}
      </div>

      {/*=================. Limit =============*/}
      <div className="flex items-center gap-[11px]">
        <Select defaultValue={`${limit}`} onValueChange={handleLimitChange}>
          <SelectTrigger className="border-none text-base font-bold text-[#393280] shadow-none">
            <span className="mr-1">Show :</span>
            <SelectValue placeholder={`${limit}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <LayoutGrid
          className={isGrid ? "text-red shadow-4" : ""}
          onClick={() => setIsGrid(true)}
        />
        <List
          className={!isGrid ? " text-red shadow-4" : ""}
          onClick={() => setIsGrid(false)}
        />
      </div>
    </div>
  );
};
