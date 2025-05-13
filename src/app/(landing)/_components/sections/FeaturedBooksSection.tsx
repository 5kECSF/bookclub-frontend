import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import React, { JSX } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const FeaturedBooksSection = (): JSX.Element => {
  // Book data that can be mapped over if needed for multiple books
  const featuredBook = {
    title: "Birds Gonna Be Happy",
    author: "TIMBUR HOOD",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac.",
    price: "45.00",
    image: "/assets/anima/book.png",
  };

  // Pagination dots data
  const paginationDots = [
    { active: true, id: 1 },
    { active: false, id: 2 },
    { active: false, id: 3 },
    { active: false, id: 4 },
  ];

  return (
    <section
      id="featured"
      className="w-full py-20 [background:linear-gradient(79deg,rgba(251,238,238,1)_0%,rgba(247,255,254,1)_100%)]"
    >
      <div className="container relative mx-auto px-4">
        <Carousel className="w-full max-w-[1200px]  gap-8">
          <CarouselContent className="  gap-8">
            <FeaturedItem featuredBook={featuredBook} />
            <FeaturedItem featuredBook={featuredBook} />
          </CarouselContent>
          <CarouselPrevious className="h-[39px] w-[39px] rounded-[19.5px] border-[#ed553b]" />
          <CarouselNext className="h-[39px] w-[39px] rounded-[19.5px] border-[#ed553b]" />
        </Carousel>

        {/* Navigation Arrows */}
        {/*<div className="flex justify-between w-full absolute top-1/2 -translate-y-1/2 pointer-events-none">*/}
        {/*  <Button*/}
        {/*    variant="outline"*/}
        {/*    size="icon"*/}
        {/*    className="w-[49px] h-[49px] rounded-full border border-solid border-[#ed553b] bg-white pointer-events-auto"*/}
        {/*  >*/}
        {/*    <ChevronLeftIcon className="h-[11px] w-[19px]" />*/}
        {/*  </Button>*/}

        {/*  <Button*/}
        {/*    variant="outline"*/}
        {/*    size="icon"*/}
        {/*    className="w-[49px] h-[49px] rounded-full border border-solid border-[#ed553b] bg-white pointer-events-auto"*/}
        {/*  >*/}
        {/*    <ChevronRightIcon className="h-[11px] w-[19px]" />*/}
        {/*  </Button>*/}
        {/*</div>*/}

        {/* Pagination Dots */}
        {/*<div className="mt-12 flex justify-center gap-[31px]">*/}
        {/*  {paginationDots.map((dot) => (*/}
        {/*    <div key={dot.id} className="relative">*/}
        {/*      {dot.active ? (*/}
        {/*        <div className="flex h-[39px] w-[39px] items-center justify-center rounded-full border border-solid border-[#ed553b]">*/}
        {/*          <div className="h-[13px] w-[13px] rounded-full bg-[#ed553b]" />*/}
        {/*        </div>*/}
        {/*      ) : (*/}
        {/*        <div className="h-[13px] w-[13px] rounded-full bg-[#bebebe]" />*/}
        {/*      )}*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </div>
    </section>
  );
};

export const FeaturedItem = ({ featuredBook }: { featuredBook: any }) => {
  return (
    <CarouselItem className="m-2">
      <div className="flex flex-col items-center gap-8 md:flex-row">
        {/* Book Image */}
        <div className="flex justify-center md:w-1/2">
          <img
            className="h-auto max-w-full"
            alt="Book"
            src={featuredBook.image}
          />
        </div>

        {/* Book Details */}
        <div className="flex flex-col space-y-6 md:w-1/2">
          <h2 className="text-5xl font-semibold text-[#393280] [font-family:'Inter',Helvetica]">
            Featured Book
          </h2>

          <div className="h-0.5 w-[101px] bg-[#ed553b]" />

          <div className="text-[13px] font-medium tracking-[2.08px] text-[#888888] [font-family:'Inter',Helvetica]">
            BY {featuredBook.author}
          </div>

          <h3 className="text-[28px] font-semibold text-[#393280] [font-family:'Inter',Helvetica]">
            {featuredBook.title}
          </h3>

          <p className="text-base font-normal leading-[33.3px] tracking-[0.32px] text-[#7a7a7a] [font-family:'Inter',Helvetica]">
            {featuredBook.description}
          </p>

          <div className="text-[23px] font-bold text-[#ed553b] [font-family:'Inter',Helvetica]">
            $ {featuredBook.price}
          </div>

          <Button
            variant="outline"
            className="h-[61px] w-[197px] rounded-[7px] border border-solid border-[#393280] bg-transparent text-base font-medium tracking-[1.60px] text-[#393280] [font-family:'Inter',Helvetica]"
          >
            VIEW MORE
            <ChevronRightIcon className="ml-2 h-2.5 w-[13px]" />
          </Button>
        </div>
      </div>
    </CarouselItem>
  );
};
