/* eslint-disable @next/next/no-img-element */
"use client";
import { IAuthor } from "@/app/admin/author/model-def";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { KY } from "@/lib/constants/routes";
import { useFetch } from "@/lib/state/hooks/useQuery";
import Link from "next/link";

import type { JSX } from "react";
function Loading() {
  return (
    <>
      {Array(7)
        .fill(0)
        .map((_, index) => (
          <CarouselItem key={index} className="basis-1/6">
            <div className="p-1">
              <div className="aspect-[3/4] overflow-hidden rounded-md bg-muted">
                {/* Authors cover would be displayed here */}
              </div>
            </div>
          </CarouselItem>
        ))}
    </>
  );
}
export const AuthorsSection = (): JSX.Element => {
  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [KY.author, ""],
    `${KY.author}`,
    {status: "active",}
  );
  const newArrival = data?.body || [];
  // Sample book data that would be displayed in the carousel

  return (
    <section className="mx-auto w-full max-w-[1266px] py-12">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-[32px] font-semibold tracking-[1.87px] text-[#173f5f]">
          Book Author&apos;s
        </h2>

        <p className="my-6 max-w-[647px] text-center text-lg font-normal leading-[30px] tracking-[1.29px] text-[#766f6f]">
          We Have Books from the following Authors.
        </p>

        <Carousel className="w-full max-w-[900px]">
          <CarouselContent>
            {isLoading ? (
              <Loading />
            ) : (
              newArrival.map((author: IAuthor) => (
                <CarouselItem key={author._id} className="basis-1/6">
                  <div className="p-1">
                    <Link
                      href={`/books?authorName=${author.name}`}
                      className="mx-auto"
                    >
                      <div className="aspect-[3/4] flex-col overflow-hidden rounded-md bg-muted">
                        <img
                          className=" left-[15px] top-[15px] h-[90%] object-cover"
                          alt={author.name}
                          src={author.upload?.url}
                        />
                        <div className="flex h-3.5 w-[130px] items-center whitespace-nowrap text-xs font-normal leading-[15.4px] tracking-[0] text-[#4c4c4c] [font-family:'Inter',Helvetica]">
                          {author.name}
                        </div>
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselPrevious className="h-[39px] w-[39px] rounded-[19.5px]" />
          <CarouselNext className="h-[39px] w-[39px] rounded-[19.5px]" />
        </Carousel>

        {/*<div className="flex items-center justify-center gap-4 mt-8">*/}
        {/*  <div className="relative w-[39px] h-[39px] rounded-[19.5px] border border-solid border-[#ed553b]">*/}
        {/*    <div className="absolute w-[13px] h-[13px] top-[13px] left-[13px] bg-[#ed553b] rounded-[6.5px]" />*/}
        {/*  </div>*/}
        {/*  <div className="w-[13px] h-[13px] bg-[#bebebe] rounded-[6.5px]" />*/}
        {/*  <div className="w-[13px] h-[13px] bg-[#bebebe] rounded-[6.5px]" />*/}
        {/*  <div className="w-[13px] h-[13px] bg-[#bebebe] rounded-[6.5px]" />*/}
        {/*</div>*/}
      </div>
    </section>
  );
};
