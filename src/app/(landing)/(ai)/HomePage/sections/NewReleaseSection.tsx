import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRightIcon } from "lucide-react";

import type { JSX } from "react";

export const NewReleaseSection = (): JSX.Element => {
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
    <section className="w-full max-w-[1266px] mx-auto py-12">
      <div className="flex flex-col items-center">
        <h2 className="font-semibold text-[32px] text-[#173f5f] text-center tracking-[1.87px]">
          New Release Books
        </h2>

        <p className="mt-4 font-normal text-lg text-[#766f6f] text-center tracking-[1.29px] leading-[30px] max-w-[647px]">
          1000+ books are published by different authors everyday.
        </p>

        <div className="flex items-center mt-6 mb-10">
          <button className="flex items-center text-[#ed553b] font-bold text-base tracking-[0.32px]">
            View All Products
            <ArrowRightIcon className="ml-2 w-3.5 h-2" />
          </button>
        </div>

        <Carousel className="w-full max-w-[900px]">
          <CarouselContent>
            {books.map((book) => (
              <CarouselItem key={book.id} className="basis-1/6">
                <div className="p-1">
                  <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden">
                    {/* Book cover would be displayed here */}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden" />
          <CarouselNext className="hidden" />
        </Carousel>

        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="relative w-[39px] h-[39px] rounded-[19.5px] border border-solid border-[#ed553b]">
            <div className="absolute w-[13px] h-[13px] top-[13px] left-[13px] bg-[#ed553b] rounded-[6.5px]" />
          </div>
          <div className="w-[13px] h-[13px] bg-[#bebebe] rounded-[6.5px]" />
          <div className="w-[13px] h-[13px] bg-[#bebebe] rounded-[6.5px]" />
          <div className="w-[13px] h-[13px] bg-[#bebebe] rounded-[6.5px]" />
        </div>
      </div>
    </section>
  );
};
