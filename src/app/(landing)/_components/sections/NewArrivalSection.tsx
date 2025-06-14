/* eslint-disable @next/next/no-img-element */
import { ArrowRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { JSX } from "react";

export const NewArrivalSection = (): JSX.Element => {
  return (
    <section className="mx-auto w-full max-w-[1266px] py-12">
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
const books = [
  {
    id: 1,
    coverImage: "/assets/anima/frame-19.png",
    title: "",
    author: "",
    year: "",
    rating: "",
    tag: "",
  },
  {
    id: 2,
    coverImage: "/assets/anima/rectangle-12.png",
    title: "The Design of Every..",
    author: "Don Norman",
    year: "1988",
    rating: "4.5",
    tag: "spiritual",
  },
  {
    id: 3,
    coverImage: "/assets/anima/rectangle-12-1.png",
    title: "Sprint : How to solve...",
    author: "Jake Knapp",
    year: "2000",
    rating: "4.5",
    tag: "prayer",
  },
  {
    id: 4,
    coverImage: "/assets/anima/rectangle-12-2.png",
    title: "Learn UX : Design Gr...",
    author: "Jeff Gothelf",
    year: "2016",
    rating: "4.5",
    tag: "",
  },
  {
    id: 5,
    coverImage: "/assets/anima/rectangle-12-3.png",
    title: "The Road to React",
    author: "Steve Krug",
    year: "2000",
    rating: "4.5",
    tag: "",
  },
  {
    id: 6,
    coverImage: "/assets/anima/rectangle-12-4.png",
    title: "Rich Dad Poor Dad",
    author: "Robert T.Kiyosaki",
    year: "1997",
    rating: "5",
    tag: "",
  },
  {
    id: 7,
    coverImage: "/assets/anima/rectangle-12-5.png",
    title: "Harry Potter and The...",
    author: "J.K. Rowling",
    year: "2002",
    rating: "4.9",
    tag: "",
  },
  {
    id: 8,
    coverImage: "/assets/anima/rectangle-12-6.png",
    title: "You Don't Know JS: S..",
    author: "Kyle Simpson",
    year: "2014",
    rating: "4.9",
    tag: "",
  },
];

export const ScrollingBooks = (): JSX.Element => {
  return (
    <ScrollArea className="h-[359px] w-full ">
      <div className="flex items-start gap-[39px] py-4 shadow-4">
        {books.map((book) => (
          <React.Fragment key={book.id}>
            <Card className="h-[260px] w-40 overflow-hidden rounded-[10px]">
              <CardContent className="relative h-full p-0">
                <img
                  className="absolute left-[15px] top-[15px] h-[172px] w-[130px] object-cover"
                  alt="Book Cover"
                  src={book.coverImage}
                />

                <div className="absolute left-[15px] top-[198px]">
                  <div className="flex flex-col items-start gap-[5px]">
                    <div className="h-3.5 w-[130px] whitespace-nowrap text-xs font-normal leading-[15.4px] tracking-[0] text-[#4c4c4c] [font-family:'Inter',Helvetica]">
                      {book.title}
                    </div>

                    <div className="h-3.5 w-[130px] whitespace-nowrap text-[10px] font-normal leading-[12.9px] tracking-[0] text-[#4c4c4c] [font-family:'Inter',Helvetica]">
                      {book.author}, {book.year}
                    </div>

                    <div className="h-[11px] w-[101px] whitespace-nowrap text-[10px] font-normal leading-[12.9px] tracking-[0] [font-family:'Inter',Helvetica]">
                      <span className="text-[#4c4c4c]">{book.rating}</span>
                      <span className="text-[#a6a6a6]">/5</span>
                    </div>
                  </div>

                  {book.tag && (
                    <Badge
                      className="bg-primarypurple-dark-10 absolute left-[72px] top-10 h-[9px] rounded px-3.5 py-2 font-light text-black"
                      variant="outline"
                    >
                      <span className="mb-[-8.00px] ml-[-8.00px] mt-[-12.00px] h-[13px] w-[39px] overflow-hidden text-ellipsis whitespace-nowrap text-[10px] leading-[12.9px] tracking-[0] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box] [font-family:'Inria_Serif',Helvetica]">
                        {book.tag}
                      </span>
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </React.Fragment>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
