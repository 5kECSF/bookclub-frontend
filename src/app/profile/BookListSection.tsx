import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
const BookCard = ({ book }: any) => {
  const isEbook = book.status === "E-BOOK";
  const isRead = book.status === "Read";

  return (
    <Card className="relative h-[260px] w-[308px] overflow-hidden">
      <CardContent className="p-0">
        <img
          className="absolute left-[15px] top-4 h-[170px] w-[123px]"
          alt={book.title}
          src={book.image}
        />

        {book.isOverdue && (
          <Badge className="absolute right-4 top-[11px] h-2.5 w-2.5 rounded-[5px] bg-[#fb4141] p-0" />
        )}

        <div className="absolute left-[15px] top-[198px] flex flex-col items-start gap-[5px]">
          <div className="whitespace-nowrap text-xs leading-[15.4px] text-[#4c4c4c]">
            {book.title}
          </div>
          <div className="whitespace-nowrap text-[10px] leading-[12.9px] text-[#4c4c4c]">
            {book.author}
          </div>
          <div className="whitespace-nowrap text-[10px] leading-[12.9px]">
            <span className="text-[#4c4c4c]">{book.rating}</span>
            <span className="text-[#a6a6a6]">/5</span>
          </div>
        </div>

        <div className="absolute left-[168px] top-6 whitespace-nowrap text-[15px] leading-[19.3px] text-[#4c4c4c]">
          Borrowed on
        </div>
        <div className="absolute left-[168px] top-[53px] text-[10px] leading-[12.9px] text-neutral-500">
          {book.borrowedOn}
        </div>

        <div className="absolute left-[168px] top-[81px] whitespace-nowrap text-[15px] leading-[19.3px] text-[#4c4c4c]">
          Submission Due
        </div>
        <div className="absolute left-[168px] top-[110px] text-[10px] leading-[12.9px]">
          {book.isOverdue ? (
            <>
              <span className="text-neutral-500">{book.submissionDue} </span>
              <span className="text-[#f23d3d]">(Over Due)</span>
            </>
          ) : (
            <span className="text-neutral-500">{book.submissionDue}</span>
          )}
        </div>

        <div className="absolute left-[163px] top-[141px] h-10 w-[125px]">
          <Button
            className={`h-10 w-full rounded-[5px] ${
              isEbook || isRead ? "bg-[#42bb4e]" : "bg-[#a0a0a0]"
            }`}
          >
            {book.status}
          </Button>
        </div>

        <div className="absolute left-[163px] top-[196px] h-10 w-[125px]">
          {book.hasAudio ? (
            <div className="relative flex h-10 w-[125px] rounded-[5px] border border-solid border-[#f76b56] bg-white">
              <Button
                className="h-10 flex-1 bg-transparent font-semibold text-[#f76b56] hover:bg-transparent"
                // variant="null"
              >
                Read
              </Button>
              <div className="flex h-[38px] w-10 items-center justify-center border-l border-[#f76b56]">
                <Headphones className="h-4 w-[15px]" />
              </div>
            </div>
          ) : (
            <Button
              className="h-10 w-full border border-solid border-[#f76b56] bg-white font-semibold text-[#f76b56] hover:bg-white hover:text-[#f76b56]"
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
    <section className="mx-auto mt-4 w-full max-w-[1455px] px-11">
      <Tabs defaultValue="all-books" className="w-full">
        <TabsList className="mb-10 flex gap-[50px] bg-transparent p-0">
          <TabsTrigger
            value="all-books"
            className="h-[33px] bg-transparent px-0 text-xl font-medium text-[#4c4c4c] data-[state=active]:text-[#4c4c4c] data-[state=inactive]:text-[#858585]"
          >
            All Books
          </TabsTrigger>
          <TabsTrigger
            value="favourite"
            className="h-[33px] bg-transparent px-0 text-xl font-medium text-[#858585] data-[state=active]:text-[#4c4c4c] data-[state=inactive]:text-[#858585]"
          >
            Favourite
          </TabsTrigger>
          <TabsTrigger
            value="borrowed-books"
            className="h-[33px] bg-transparent px-0 text-xl font-medium text-[#858585] data-[state=active]:text-[#4c4c4c] data-[state=inactive]:text-[#858585]"
          >
            Borrowed Books
          </TabsTrigger>
          <TabsTrigger
            value="read-books"
            className="h-[33px] bg-transparent px-0 text-xl font-medium text-[#858585] data-[state=active]:text-[#4c4c4c] data-[state=inactive]:text-[#858585]"
          >
            Read Books
          </TabsTrigger>
        </TabsList>

        <div className="space-y-10">
          <TabsContent value="all-books">
            <div className="grid grid-cols-1 items-center   justify-center gap-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
              {[...secondRowBooks, ...books].map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="borrowed-books">
            <div className="grid grid-cols-1 gap-6   lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {[...secondRowBooks, ...books]
                .filter((b) => b.status === "Borrowed")
                .map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="read-books">
            <div className="grid grid-cols-1 gap-6   lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
              {[...secondRowBooks, ...books]
                .filter((b) => b.status === "Read")
                .map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="favourite">
            <div className="text-neutral-400">No favourite books yet.</div>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
