/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { KY, UI_ROUTES } from "@/lib/constants/routes";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { IBook } from "@/types/libraryTypes";
import Link from "next/link";
import { JSX } from "react";
function Loading() {
  return (
    <>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <CarouselItem key={index} className="m-2">
            <div className="flex flex-col items-center gap-8 md:flex-row">
              {/* Book Image Placeholder */}
              <div className="flex justify-center   md:w-1/2">
                <div className="bg-gray-200 h-150 w-full max-w-100 animate-pulse rounded-md bg-slate-400" />
              </div>
              {/* Book Details Placeholder */}
              <div className="flex flex-col space-y-6 md:w-1/2">
                <div className="h-12 w-3/4 animate-pulse rounded-md bg-slate-400" />
                <div className="h-0.5 w-[101px] animate-pulse rounded-md bg-slate-400" />
                <div className="h-4 w-1/4 animate-pulse rounded-md bg-slate-400" />
                <div className="h-8 w-1/2 animate-pulse rounded-md bg-slate-400" />
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded-md bg-slate-400" />
                  <div className="h-4 w-3/4 animate-pulse rounded-md bg-slate-400" />
                </div>
                <div className="h-12 w-[197px] animate-pulse rounded-md bg-slate-400" />
              </div>
            </div>
          </CarouselItem>
        ))}
    </>
  );
}
export const FeaturedBooksSection = (): JSX.Element => {
  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [KY.book, "featured"],
    `${KY.book}`,
    { meta: ["featured"] },
  );
  const featuredBooks = data?.body || [];

  return (
    <section
      id="featured"
      className="w-full py-20 [background:linear-gradient(79deg,rgba(251,238,238,1)_0%,rgba(247,255,254,1)_100%)]"
    >
      <div className="container relative mx-auto px-4">
        <Carousel className="w-full max-w-[1200px]  gap-8">
          <CarouselContent className="  gap-8">
            {isLoading || isPlaceholderData ? (
              <Loading />
            ) : isError ? (
              <div className="text-red-500 text-center">
                Error loading featured books:{" "}
                {error?.message || "Unknown error"}
              </div>
            ) : featuredBooks.length === 0 ? (
              <div className="text-gray-500 text-center">
                No featured books available
              </div>
            ) : (
              featuredBooks.map((book: IBook) => (
                <FeaturedItem key={book._id} featuredBook={book} />
              ))
            )}
          </CarouselContent>
          <CarouselPrevious className="h-[39px] w-[39px] rounded-[19.5px] border-[#ed553b]" />
          <CarouselNext className="h-[39px] w-[39px] rounded-[19.5px] border-[#ed553b]" />
        </Carousel>
      </div>
    </section>
  );
};

export const FeaturedItem = ({ featuredBook }: { featuredBook: IBook }) => {
  return (
    <CarouselItem className="m-2">
      <div className="flex flex-col items-center gap-8 md:flex-row">
        {/* Book Image */}
        <div className="flex justify-center md:w-1/2">
          <img
            className="h-150 max-w-full"
            alt="Book"
            src={featuredBook.upload?.url}
          />
        </div>

        {/* Book Details */}
        <div className="flex flex-col space-y-6 md:w-1/2">
          <h2 className="text-5xl font-semibold text-[#393280] [font-family:'Inter',Helvetica]">
            Featured Books
          </h2>

          <div className="h-0.5 w-[101px] bg-[#ed553b]" />

          <div className="text-[13px] font-medium tracking-[2.08px] text-[#888888] [font-family:'Inter',Helvetica]">
            BY {featuredBook.authorName}
          </div>

          <h3 className="text-[28px] font-semibold text-[#393280] [font-family:'Inter',Helvetica]">
            {featuredBook.title}
          </h3>

          <p className="text-base font-normal leading-[33.3px] tracking-[0.32px] text-[#7a7a7a] [font-family:'Inter',Helvetica]">
            {featuredBook.body}
          </p>

          {/* <div className="text-[23px] font-bold text-[#ed553b] [font-family:'Inter',Helvetica]">
            $ {featuredBook.price}
          </div> */}
          <Link href={`${UI_ROUTES.BooksListing}/${featuredBook._id}`}>
            <Button
              variant="outline"
              className="h-[61px] w-[197px] rounded-[7px] border border-solid border-[#393280] bg-transparent text-base font-medium tracking-[1.60px] text-[#393280] [font-family:'Inter',Helvetica]"
            >
              VIEW MORE
              <ChevronRightIcon className="ml-2 h-2.5 w-[13px]" />
            </Button>
          </Link>
        </div>
      </div>
    </CarouselItem>
  );
};
