import { Button } from "@/components/ui/button";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
interface IPagination {
  isPlaceholderData: boolean;
  page: number;
  hasNext: boolean;
  setPage: any;
  total?: number;
}

export const Pagination = ({
  isPlaceholderData,
  page,
  hasNext,
  setPage,
  total,
}: IPagination) => {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      {page > 1 && (
        <Button
          onClick={() => setPage(Math.max(page - 1, 1))}
          className="flex gap-2 text-white [background:linear-gradient(161.68deg,_#001f3f,_#003366)]"
          disabled={page === 1}
        >
          <LucideArrowLeft /> Prev
        </Button>
      )}
      {renderPageButtons(setPage, page, total || 0)}
      {!isPlaceholderData && hasNext && (
        <Button
          onClick={() => {
            if (!isPlaceholderData && hasNext) {
              console.log("page", page);
              setPage(Number(page) + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPlaceholderData || !hasNext}
          className="flex gap-2 text-white [background:linear-gradient(161.68deg,_#001f3f,_#003366)]"
        >
          Next <LucideArrowRight />
        </Button>
      )}
    </div>
  );
};
function calculatePages(totalItems: number, itemsPerPage: number): number {
  // Check if inputs are valid numbers and greater than 0
  if (
    !Number.isInteger(totalItems) ||
    !Number.isInteger(itemsPerPage) ||
    totalItems < 0 ||
    itemsPerPage <= 0
  ) {
    return 0;
  }

  // Calculate total pages using Math.ceil to round up
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return totalPages;
}
const renderPageButtons = (setPage: any, page: number, total: number) => {
  const totalPages = calculatePages(total, 10);
  const range: number[] = [];
  const visibleCount = 3;

  if (totalPages <= visibleCount * 3) {
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
  } else {
    const start = [1, 2, 3];
    const end = [totalPages - 2, totalPages - 1, totalPages];
    const middle = [page - 1, page, page + 1].filter(
      (p) => p > 3 && p < totalPages - 2,
    );

    const allPages = new Set([...start, ...middle, ...end]);
    range.push(...Array.from(allPages).sort((a, b) => a - b));
  }
  const buttons: React.ReactNode[] = [];
  let lastPage = 0;

  for (let p of range) {
    if (lastPage && p - lastPage > 1) {
      buttons.push(
        <span key={`ellipsis-${p}`} className="text-gray-500 px-1 text-lg">
          ...
        </span>,
      );
    }

    buttons.push(
      <Button
        key={p}
        variant={p === page ? "default" : "outline"}
        className={`px-4 ${p === page ? "bg-blue-700 text-white" : ""}`}
        onClick={() => setPage(p)}
      >
        {p}
      </Button>,
    );

    lastPage = p;
  }
  if (!totalPages) {
    buttons.push(
      <Button
        key={page}
        variant={page === page ? "default" : "outline"}
        className={`px-4 ${page === page ? "bg-blue-700 text-white" : ""}`}
        onClick={() => setPage(page)}
      >
        {page}
      </Button>,
    );
  }

  return buttons;
};
