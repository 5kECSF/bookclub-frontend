import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IPaginationProps {
  count: number;
  limit: number;
  setPage: (page: number) => void;
  page: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export const PaginationComponent = ({
  count,
  limit,
  setPage,
  page,
  hasNext,
  hasPrev,
}: IPaginationProps) => {
  const totalPages = Math.ceil(count / limit);
  console.log("totalP", totalPages, count, "limit", limit);
  const handlePageClick = (page: number) => {
    setPage(page); // Update the current page
  };
  return (
    <Pagination className="mb-12 mt-12 flex justify-center">
      <PaginationContent>
        <PaginationItem className=" pr-2">
          <button
            disabled={!hasPrev}
            className="mx-2 flex h-8 w-18 items-center justify-center gap-2 rounded-md border border-[#ed553b] bg-[#ed553b] p-2 text-white shadow-lg transition-colors duration-300 hover:bg-[#e14b33] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => page > 1 && handlePageClick(page - 1)}
          >
            <ChevronLeft className="h-6 w-6" />
            Prev
          </button>
        </PaginationItem>
        {}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageI) => (
          <PaginationItem key={pageI}>
            <PaginationLink
              className={`h-[49px] w-[49px] rounded-full text-[22px] font-semibold ${
                page === pageI
                  ? "bg-[#ed553b] text-white"
                  : "border border-[#e5e3da] font-normal text-[#888888]"
              }`}
              onClick={() => handlePageClick(pageI)}
              isActive={page === pageI}
            >
              {pageI}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem aria-disabled={!hasNext} className="disabled pl-2">
          <button
            disabled={!hasNext}
            className="flex h-8 w-18 items-center justify-center gap-2 rounded-md border border-[#ed553b] bg-[#ed553b] p-2 text-white shadow-lg transition-colors duration-300 hover:bg-[#e14b33] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => page < totalPages && handlePageClick(page + 1)}
          >
            Next
            <ChevronRight className="h-6 w-6" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
