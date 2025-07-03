"use client";
import BookCard2 from "@/app/(landing)/books/_components/book-item-card2";
import { BookCard } from "@/app/(landing)/books/_components/bookCard";
import { HeaderFilter } from "@/app/(landing)/books/_components/headerFilter";
import { PaginationComponent } from "@/app/(landing)/books/_components/paginationComponent";
import {
  DrawerElement,
  SideBarFilter,
} from "@/app/(landing)/books/_components/sideBarFilter";
import QueryChips from "@/components/admin/crud/query-chips";
import BookLoader from "@/components/loader/book-list-loader";
import { KY } from "@/lib/constants/routes";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { useSearch } from "@/lib/state/hooks/useSearch";
import { IBook } from "@/types/libraryTypes";
import { useEffect, useState } from "react";

export const BooksState = ({
  urlParam,
}: {
  urlParam: Record<string, string>;
}) => {
  // Book data for the listing

  const [isGrid, setIsGrid] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { searchTerm } = useSearch();
  const [query, setQuery] = useState<Record<string, any>>(
    getQueryFromUrl({ status: "active", ...urlParam }),
  );

  const setPage = (page: number) => {
    setQuery({ ...query, page });
  };
  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [KY.book, JSON.stringify(query), searchTerm],
    `${KY.book}`,
    { ...query, q: searchTerm },
  );
  const booksList = data?.body || [];
  useEffect(() => {
    setUrl(query);
  }, [query]);
  return (
    <div className="mt-4 flex flex-row">
      {/* Filter sidebar */}

      <SideBarFilter setQuery={setQuery} />
      <DrawerElement
        setQuery={setQuery}
        open={drawerOpen}
        onOpenChange={(e) => setDrawerOpen(e)}
      />

      {/* Main content */}
      <div className="flex-1 px-6">
        {/* Sorting and display options */}
        <HeaderFilter
          isGrid={isGrid}
          setIsGrid={setIsGrid}
          setDrawerOpen={setDrawerOpen}
          count={data?.count}
          page={query?.page}
          limit={query?.limit}
          setQuery={setQuery}
          query={query}
        />
        <QueryChips
          query={{ ...query, q: searchTerm }}
          setQuery={setQuery}
          removedKeys={["status"]}
        />

        {/* Book grid */}
        {isLoading ? (
          <BookLoader count={8} />
        ) : isError ? (
          <div className="font-mono flex h-[400px] items-center justify-center text-[30px] font-bold">
            {"Something went wrong"}
          </div>
        ) : isGrid ? (
          <div className="m-6 mb-10 grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
            {booksList.map((book: IBook, i: number) => (
              <BookCard key={i} book={book} />
            ))}
          </div>
        ) : (
          <div className="mb-20 flex h-full w-full flex-col gap-4 rounded-lg bg-slate-200 px-4 py-8 md:px-10">
            {booksList.map((book: IBook, i: number) => (
              <BookCard2 key={i} book={book} />
            ))}
          </div>
        )}

        <PaginationComponent
          count={data?.count}
          page={query?.page}
          setPage={setPage}
          limit={query?.limit}
          hasNext={data?.hasNext}
          hasPrev={data?.hasPrev}
        />
      </div>
    </div>
  );
};
