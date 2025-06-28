import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import type { JSX } from "react";

export const AuthorsSection = (): JSX.Element => {
  // Sample book data that would be displayed in the carousel
  const books = [
    {
      id: 1,
      title: "Book 1",
      image: "/assets/anima/book1.jpg",
    },
    {
      id: 2,
      title: "Book 2",
      image: "/assets/anima/book2.jpg",
    },
    {
      id: 3,
      title: "Book 3",
      image: "/assets/anima/book3.jpg",
    },
    {
      id: 4,
      title: "Book 4",
      image: "/assets/anima/book4.jpg",
    },
    {
      id: 5,
      title: "Book 5",
      image: "/assets/anima/book5.jpg",
    },
    {
      id: 6,
      title: "Book 6",
      image: "/assets/anima/book6.jpg",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1266px] py-12">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-[32px] font-semibold tracking-[1.87px] text-[#173f5f]">
          Book Author&apos;s
        </h2>

        <p className="mt-4 max-w-[647px] text-center text-lg font-normal leading-[30px] tracking-[1.29px] text-[#766f6f]">
          We Have Books from the following Authors.
        </p>

        <Carousel className="w-full max-w-[900px]">
          <CarouselContent>
            {books.map((book) => (
              <CarouselItem key={book.id} className="basis-1/6">
                <div className="p-1">
                  <div className="aspect-[3/4] overflow-hidden rounded-md bg-muted">
                    {/* Authors cover would be displayed here */}
                  </div>
                </div>
              </CarouselItem>
            ))}
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
