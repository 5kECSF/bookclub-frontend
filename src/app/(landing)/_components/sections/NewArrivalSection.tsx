"use client";
/* eslint-disable @next/next/no-img-element */
import { ArrowRightIcon } from "lucide-react";

import LatestBookLoader from "@/components/loader/latest-book-loader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { KY, UI_ROUTES } from "@/lib/constants/routes";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { IBook } from "@/types/libraryTypes";
import Link from "next/link";
import React, { JSX } from "react";

export const NewArrivalSection = (): JSX.Element => {
  return (
    <section id="newArrival" className="mx-auto w-full max-w-[1266px] py-12">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-[32px] font-semibold tracking-[1.87px] text-[#173f5f]">
          New Arrival Books
        </h2>

        <p className="mt-4 max-w-[647px] text-center text-lg font-normal leading-[30px] tracking-[1.29px] text-[#766f6f]">
          We are adding new books to our library everyday.
        </p>

        <div className="mb-10 mt-6 flex items-center">
          <button className="flex items-center text-base font-bold tracking-[0.32px] text-[#ed553b]">
            View All Books
            <ArrowRightIcon className="ml-2 h-2 w-3.5" />
          </button>
        </div>

        <ScrollingBooks />
      </div>
    </section>
  );
};

export const ScrollingBooks = (): JSX.Element => {
  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [KY.book, "newArrival"],
    `${KY.book}`,
    { _sortDir: "desc", status: "active" },
  );
  const newArrival = data?.body || [];
  return (
    <ScrollArea className="h-[359px] w-full ">
      <div className="flex items-start gap-[39px] py-4 shadow-4">
        {isLoading ? (
          <LatestBookLoader count={7} />
        ) : (
          newArrival.map((book: IBook) => (
            <React.Fragment key={book._id}>
              <Link href={`${UI_ROUTES.BooksListing}/${book._id}`}>
                <Card className="h-[260px] w-40 overflow-hidden rounded-[10px]">
                  <CardContent className="relative h-full p-0">
                    <img
                      className="absolute left-[15px] top-[15px] h-[172px] w-[130px] object-cover"
                      alt="Book Cover"
                      src={book.upload?.url}
                    />

                    <div className="absolute left-[15px] top-[198px]">
                      <div className="flex flex-col items-start gap-[5px]">
                        <div className="h-3.5 w-[130px] whitespace-nowrap text-xs font-normal leading-[15.4px] tracking-[0] text-[#4c4c4c] [font-family:'Inter',Helvetica]">
                          {book.title}
                        </div>

                        <div className="h-3.5 w-[130px] whitespace-nowrap text-[10px] font-normal leading-[12.9px] tracking-[0] text-[#4c4c4c] [font-family:'Inter',Helvetica]">
                          {book.authorName}, {book.publishDate}
                        </div>

                        <div className="h-[11px] w-[101px] whitespace-nowrap text-[10px] font-normal leading-[12.9px] tracking-[0] [font-family:'Inter',Helvetica]">
                          <span className="text-[#4c4c4c]">{book.pageNo}</span>
                          {/* <span className="text-[#a6a6a6]">/5</span> */}
                        </div>
                      </div>

                      {book.categoryName && (
                        <Badge
                          className="bg-primarypurple-dark-10 absolute left-[72px] top-10 h-[9px] rounded px-3.5 py-2 font-light text-black"
                          variant="outline"
                        >
                          <span className="mb-[-8.00px] ml-[-8.00px] mt-[-12.00px] h-[13px] w-[39px] overflow-hidden text-ellipsis whitespace-nowrap text-[10px] leading-[12.9px] tracking-[0] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box] [font-family:'Inria_Serif',Helvetica]">
                            {book.categoryName}
                          </span>
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </React.Fragment>
          ))
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
