import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Headphones } from "lucide-react";
import { JSX } from "react";

// Define book data structure for reusability
const books = [
  {
    id: 1,
    title: "Don't Make Me think",
    author: "Steve Krug, 2000",
    rating: "4.5",
    image: "./rectangle-12.png",
    borrowedOn: "2 Mar 2023 09:00 AM",
    submissionDue: "13 Mar 2023",
    status: "Borrowed",
    isOverdue: true,
  },
  {
    id: 2,
    title: "Java Script Scope & ..",
    author: "Kyle Simpson, 2014",
    rating: "4.5",
    image: "./image.png",
    borrowedOn: "2 Mar 2023 09:00 AM",
    submissionDue: "13 Mar 2023",
    status: "Borrowed",
    isOverdue: true,
  },
  {
    id: 3,
    title: "Sprint : Solve Big Pro..",
    author: "Robert T.Kiyosaki, 1997",
    rating: "5",
    image: "./rectangle-12-2.png",
    borrowedOn: "11 Mar 2023 09:00 AM",
    submissionDue: "14 Mar 2023",
    status: "E-BOOK",
    isOverdue: false,
  },
];

const secondRowBooks = [
  {
    id: 4,
    title: "Don't Make Me think",
    author: "Steve Krug, 2000",
    rating: "4.5",
    image: "./rectangle-12-3.png",
    borrowedOn: "11 Mar 2023 09:00 AM",
    submissionDue: "14 Mar 2023",
    status: "Borrowed",
    isOverdue: false,
  },
  {
    id: 5,
    title: "Rich Dad Poor Dad",
    author: "Robert T.Kiyosaki, 1997",
    rating: "5",
    image: "./rectangle-12-4.png",
    borrowedOn: "11 Mar 2023 09:00 AM",
    submissionDue: "14 Mar 2023",
    status: "Read",
    isOverdue: false,
    hasAudio: true,
  },
  {
    id: 6,
    title: "Don't Make Me think",
    author: "Steve Krug, 2000",
    rating: "4.5",
    image: "./rectangle-12-5.png",
    borrowedOn: "2 Mar 2023 09:00 AM",
    submissionDue: "13 Mar 2023",
    status: "Borrowed",
    isOverdue: true,
  },
  {
    id: 7,
    title: "Sprint : Solve Big Pro..",
    author: "Robert T.Kiyosaki, 1997",
    rating: "5",
    image: "./rectangle-12-6.png",
    borrowedOn: "11 Mar 2023 09:00 AM",
    submissionDue: "14 Mar 2023",
    status: "E-BOOK",
    isOverdue: false,
  },
];

// Book card component for reusability
const BookCard = ({ book }:any) => {
  const isEbook = book.status === "E-BOOK";
  const isRead = book.status === "Read";

  return (
    <Card className="w-[308px] h-[260px] relative overflow-hidden">
      <CardContent className="p-0">
        <img
          className="w-[123px] h-[170px] absolute top-4 left-[15px]"
          alt={book.title}
          src={book.image}
        />

        {book.isOverdue && (
          <Badge className="absolute w-2.5 h-2.5 top-[11px] right-4 bg-[#fb4141] rounded-[5px] p-0" />
        )}

        <div className="flex flex-col items-start gap-[5px] absolute top-[198px] left-[15px]">
          <div className="text-xs text-[#4c4c4c] leading-[15.4px] whitespace-nowrap">
            {book.title}
          </div>
          <div className="text-[10px] text-[#4c4c4c] leading-[12.9px] whitespace-nowrap">
            {book.author}
          </div>
          <div className="text-[10px] leading-[12.9px] whitespace-nowrap">
            <span className="text-[#4c4c4c]">{book.rating}</span>
            <span className="text-[#a6a6a6]">/5</span>
          </div>
        </div>

        <div className="absolute top-6 left-[168px] text-[15px] text-[#4c4c4c] leading-[19.3px] whitespace-nowrap">
          Borrowed on
        </div>
        <div className="absolute top-[53px] left-[168px] text-[10px] text-neutral-500 leading-[12.9px]">
          {book.borrowedOn}
        </div>

        <div className="absolute top-[81px] left-[168px] text-[15px] text-[#4c4c4c] leading-[19.3px] whitespace-nowrap">
          Submission Due
        </div>
        <div className="absolute top-[110px] left-[168px] text-[10px] leading-[12.9px]">
          {book.isOverdue ? (
            <>
              <span className="text-neutral-500">{book.submissionDue} </span>
              <span className="text-[#f23d3d]">(Over Due)</span>
            </>
          ) : (
            <span className="text-neutral-500">{book.submissionDue}</span>
          )}
        </div>

        <div className="absolute w-[125px] h-10 top-[141px] left-[163px]">
          <Button
            className={`w-full h-10 rounded-[5px] ${
              isEbook || isRead ? "bg-[#42bb4e]" : "bg-[#a0a0a0]"
            }`}

          >
            {book.status}
          </Button>
        </div>

        <div className="absolute w-[125px] h-10 top-[196px] left-[163px]">
          {book.hasAudio ? (
            <div className="relative w-[125px] h-10 bg-white rounded-[5px] border border-solid border-[#f76b56] flex">
              <Button
                className="flex-1 h-10 font-semibold text-[#f76b56] bg-transparent hover:bg-transparent"
                // variant="null"
              >
                Read
              </Button>
              <div className="w-10 h-[38px] border-l border-[#f76b56] flex items-center justify-center">
                <Headphones className="w-[15px] h-4" />
              </div>
            </div>
          ) : (
            <Button
              className="w-full h-10 font-semibold text-[#f76b56] bg-white border border-solid border-[#f76b56] hover:bg-white hover:text-[#f76b56]"
              variant="outline"
            >
              {isEbook ? "Read" : "Return"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function BookListSection(): JSX.Element {
  return (
    <section className="w-full max-w-[1455px] mt-4 mx-auto px-11">
      <Tabs defaultValue="all-books" className="w-full">
        <TabsList className="bg-transparent p-0 h-auto mb-[67px] gap-[50px]">
          <TabsTrigger
            value="all-books"
            className="font-medium text-xl text-[#4c4c4c] data-[state=active]:text-[#4c4c4c] data-[state=inactive]:text-[#858585] px-0 h-[33px] bg-transparent"
          >
            All Books
          </TabsTrigger>
          <TabsTrigger
            value="favourite"
            className="font-medium text-xl text-[#858585] data-[state=active]:text-[#4c4c4c] data-[state=inactive]:text-[#858585] px-0 h-[33px] bg-transparent"
          >
            Favourite
          </TabsTrigger>
          <TabsTrigger
            value="borrowed-books"
            className="font-medium text-xl text-[#858585] data-[state=active]:text-[#4c4c4c] data-[state=inactive]:text-[#858585] px-0 h-[33px] bg-transparent"
          >
            Borrowed Books
          </TabsTrigger>
          <TabsTrigger
            value="read-books"
            className="font-medium text-xl text-[#858585] data-[state=active]:text-[#4c4c4c] data-[state=inactive]:text-[#858585] px-0 h-[33px] bg-transparent"
          >
            Read Books
          </TabsTrigger>
        </TabsList>

        <div className="w-full h-[548px]">
          {/* First row of books */}
          <div className="w-full h-[260px] mb-[28px]">
            <div className="flex gap-[39px] overflow-x-auto">
              {secondRowBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>

          {/* Second row of books */}
          <div className="w-full h-[260px]">
            <div className="flex gap-[39px] overflow-x-auto">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </div>
      </Tabs>
    </section>
  );
}
