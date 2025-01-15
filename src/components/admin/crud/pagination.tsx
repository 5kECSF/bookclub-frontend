import { GenericButton } from "@/components/admin/ui/genericButton";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";

interface IPagination {
  isPlaceholderData: boolean;
  page: number;
  hasNext: boolean;
  setPage: any;
}

export const Pagination = ({
  isPlaceholderData,
  page,
  hasNext,
  setPage,
}: IPagination) => {
  // console.log("placeHolder", isPlaceholderData, hasNext);
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      {page > 1 && (
        <GenericButton
          onClick={() => setPage(Math.max(page - 1, 1))}
          className="flex gap-2 text-white [background:linear-gradient(161.68deg,_#001f3f,_#003366)]"
          disabled={page === 1}
        >
          <LucideArrowLeft /> Prev
        </GenericButton>
      )}
      <p className="text-bold text-l">page: {page}</p>
      {!isPlaceholderData && hasNext && (
        <GenericButton
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
        </GenericButton>
      )}
    </div>
  );
};
