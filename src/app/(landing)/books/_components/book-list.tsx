'use client'
import { KY } from "@/lib/constants";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { IBook, ICategory } from "@/types/db";
import {  Loader2 } from "lucide-react";
import BookLoader from "@/components/loader/book-list-loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Filter } from "../page";
import qs from "query-string";
import useAxiosAuth from "@/lib/state/hooks/useAxioxsAuth";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Empty from "@/components/empty";
import { BookItem } from "./book-item-card1";
import BookCard2 from "./book-item-card2";


export default function GridView({ searchParams, displayGrid }: { searchParams: Filter, displayGrid: boolean }) {
  const { isLoading: catLoading, data: categoryData, } = useFetch(
    [KY.category],
    `category`,
  );

  const isEmpty = (pages: any): boolean => {
    console.log("pages", pages)
    let i = true
    if(!pages) return false
    pages?.forEach((val: any) => {
      if (val?.length) return i = false
    })
    return i
  }

  const axiosAuth = useAxiosAuth();
  const { ref, inView } = useInView()
  const fetchProjects = async ({ pageParam = 1 }) => {
    const url = qs.stringifyUrl({
      url: 'book',
      query: {
        categoryId: searchParams?.categoryId,
        searchText: searchParams?.searchText,
        language: searchParams?.language,
        genres: searchParams?.genres,
        page: pageParam,
        sort: searchParams?.sort
      },
    }, {skipNull: true});
    const res = await axiosAuth.get(url)
    return res.data.data
  }

  const { isLoading, isError, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey:[KY.book, searchParams],
    queryFn: fetchProjects,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length,
})
  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])
  const category = (book: IBook) => data ? categoryData?.data?.find((cat: ICategory) => cat._id === book?.categoryId)?.name : ''


  if (isLoading) return <BookLoader count={8} />
  if (error) return <div className="h-[400px] flex justify-center items-center text-[30px] font-mono font-bold">{"Something went wrong"}</div>
  if (isEmpty(data?.pages)) return <Empty description="No book is found" />
  return (
    <>

      {displayGrid ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 w-full gap-4 md:gap-8 lg:gap-12  pb-10">
        {data?.pages?.map((page) => (
          <>
            {
              page?.length ? page?.map((book: IBook, index: number) => {
                if (index === page.length - 1) {
                  return (
                    <div key={book._id} ref={ref}>
                      <BookItem
                        book={book}
                      />
                    </div>
                  )
                } else {
                  return (
                    <BookItem key={index}
                      book={book}
                    />
                  )
                }

              }) : null}

          </>
        ))}

      </div > :
        <div className="flex flex-col w-full gap-4 h-full mb-20 bg-slate-200 px-4 md:px-10 py-8 rounded-lg">
          {data?.pages?.map((page) => (
            <>
              {
                page?.length ? page?.map((book: IBook, index: number) => {
                  if (index === page.length - 1) {
                    return (
                      <div key={book._id} ref={ref}>
                        <BookCard2
                          book={book}
                          category={category(book)}
                        />
                      </div>
                    )
                  } else {
                    return (

                      <BookCard2
                        key={index}
                        book={book}
                        category={category(book)}
                      />
                    )
                  }

                }) : null}

            </>
          ))}

        </div >}

      {
        isFetchingNextPage && (
          <div className='flex justify-center my-4'>
            <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
          </div>
        )
      }
    </>
  );
}

