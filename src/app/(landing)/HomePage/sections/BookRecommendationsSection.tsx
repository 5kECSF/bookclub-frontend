import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";

// Book data for mapping
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

export const BookRecommendationsSection = (): JSX.Element => {
  return (
    <ScrollArea className="w-full h-[359px]">
      <div className="flex items-start gap-[39px] py-4">
        {books.map((book) => (
          <React.Fragment key={book.id}>
            {book.id === 1 ? (
              <img
                className="w-40 h-[260px]"
                alt="Frame"
                src={book.coverImage}
              />
            ) : (
              <Card className="w-40 h-[260px] rounded-[10px] overflow-hidden">
                <CardContent className="p-0 h-full relative">
                  <img
                    className="w-[130px] h-[172px] absolute top-[15px] left-[15px] object-cover"
                    alt="Book Cover"
                    src={book.coverImage}
                  />

                  <div className="absolute top-[198px] left-[15px]">
                    <div className="flex flex-col items-start gap-[5px]">
                      <div className="w-[130px] h-3.5 [font-family:'Inter',Helvetica] font-normal text-[#4c4c4c] text-xs tracking-[0] leading-[15.4px] whitespace-nowrap">
                        {book.title}
                      </div>

                      <div className="w-[130px] h-3.5 [font-family:'Inter',Helvetica] font-normal text-[#4c4c4c] text-[10px] tracking-[0] leading-[12.9px] whitespace-nowrap">
                        {book.author}, {book.year}
                      </div>

                      <div className="w-[101px] h-[11px] [font-family:'Inter',Helvetica] font-normal text-[10px] tracking-[0] leading-[12.9px] whitespace-nowrap">
                        <span className="text-[#4c4c4c]">{book.rating}</span>
                        <span className="text-[#a6a6a6]">/5</span>
                      </div>
                    </div>

                    {book.tag && (
                      <Badge
                        className="absolute top-10 left-[72px] h-[9px] px-3.5 py-2 bg-primarypurple-dark-10 rounded text-black font-light"
                        variant="outline"
                      >
                        <span className="w-[39px] h-[13px] mt-[-12.00px] mb-[-8.00px] ml-[-8.00px] [font-family:'Inria_Serif',Helvetica] text-[10px] tracking-[0] leading-[12.9px] whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                          {book.tag}
                        </span>
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </React.Fragment>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
