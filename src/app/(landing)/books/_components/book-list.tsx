"use client";
import Empty from "@/components/home/empty";
import BookLoader from "@/components/loader/book-list-loader";
import { KY } from "@/lib/constants";
import useAxiosAuth from "@/lib/state/hooks/useAxioxsAuth";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { IBook, ICategory } from "@/types/db";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import qs from "query-string";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Filter } from "../page";
import { BookItem } from "./book-item-card1";
import BookCard2 from "./book-item-card2";

export default function GridView({
  searchParams,
  displayGrid,
}: {
  searchParams: Filter;
  displayGrid: boolean;
}) {
  const { isLoading: catLoading, data: categoryData } = useFetch(
    [KY.category],
    `category`,
  );

  const isEmpty = (pages: any): boolean => {
    console.log("pages", pages);
    let i = true;
    if (!pages) return false;
    pages?.forEach((val: any) => {
      if (val?.length) return (i = false);
    });
    return i;
  };

  const axiosAuth = useAxiosAuth();
  const { ref, inView } = useInView();
  const fetchProjects = async ({ pageParam = 1 }) => {
    const url = qs.stringifyUrl(
      {
        url: "book",
        query: {
          categoryId: searchParams?.categoryId,
          searchText: searchParams?.searchText,
          language: searchParams?.language,
          genres: searchParams?.genres,
          page: pageParam,
          sort: searchParams?.sort,
        },
      },
      { skipNull: true },
    );
    const res = await axiosAuth.get(url);
    return res.data.body;
  };

  const {
    isLoading,
    isError,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [KY.book, searchParams],
    queryFn: fetchProjects,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length,
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  const category = (book: IBook) =>
    data
      ? categoryData?.data?.find(
          (cat: ICategory) => cat._id === book?.categoryId,
        )?.name
      : "";

  if (isLoading) return <BookLoader count={8} />;
  if (error)
    return (
      <div className="font-mono flex h-[400px] items-center justify-center text-[30px] font-bold">
        {"Something went wrong"}
      </div>
    );
  if (isEmpty(data?.pages)) return <Empty description="No book is found" />;
  return (
    <>
      {displayGrid ? (
        <div className="grid w-full grid-cols-1 gap-4  pb-10 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4  lg:gap-12">
          {data?.pages?.map((page) => (
            <>
              {page?.length
                ? page?.map((book: IBook, index: number) => {
                    if (index === page.length - 1) {
                      return (
                        <div key={book._id} ref={ref}>
                          <BookItem book={book} />
                        </div>
                      );
                    } else {
                      return <BookItem key={index} book={book} />;
                    }
                  })
                : null}
            </>
          ))}
        </div>
      ) : (
        <div className="mb-20 flex h-full w-full flex-col gap-4 rounded-lg bg-slate-200 px-4 py-8 md:px-10">
          {data?.pages?.map((page) => (
            <>
              {page?.length
                ? page?.map((book: IBook, index: number) => {
                    if (index === page.length - 1) {
                      return (
                        <div key={book._id} ref={ref}>
                          <BookCard2 book={book} category={category(book)} />
                        </div>
                      );
                    } else {
                      return (
                        <BookCard2
                          key={index}
                          book={book}
                          category={category(book)}
                        />
                      );
                    }
                  })
                : null}
            </>
          ))}
        </div>
      )}

      {isFetchingNextPage && (
        <div className="my-4 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
        </div>
      )}
    </>
  );
}
