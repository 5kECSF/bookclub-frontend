"use client";
/* eslint-disable @next/next/no-img-element */
import { PaginationComponent } from "@/app/(landing)/books/_components/paginationComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { KY } from "@/lib/constants";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { BookIcon, GiftIcon, Headphones } from "lucide-react";
import { useEffect, useState } from "react";

// Define book data structure for reusability
const books = [
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

export function BooksList({
  value,
  urlParam,
}: {
  value: string;
  urlParam: Record<string, string>;
}) {
  const [query, setQuery] = useState<Record<string, any>>(
    getQueryFromUrl({ status: "active", ...urlParam }),
  );

  const setPage = (page: number) => {
    setQuery({ ...query, page });
  };
  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [KY.book, JSON.stringify(query)],
    `${KY.book}`,
    query,
  );
  const booksList = data?.body || [];
  useEffect(() => {
    setUrl(query);
  }, [query]);

  return (
    <TabsContent value={value}>
      <div className="grid grid-cols-1 gap-3   lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {booksList.map((book: any, i: number) => (
          <BookCard key={i} book={book} />
        ))}
        {!booksList.length && <div className="text-neutral-400">No Data.</div>}
      </div>
      {data && (data.hasNext || data.hasPrev) && (
        <PaginationComponent
          count={data?.count}
          page={query?.page}
          setPage={setPage}
          limit={query?.limit}
          hasNext={data?.hasNext}
          hasPrev={data?.hasPrev}
        />
      )}
    </TabsContent>
  );
}

const statsCards = [
  {
    id: "readings",
    icon: <BookIcon className="h-[29px] w-[29px]" />,
    value: "120",
    label: "Readings",
    bgColor: "bg-[#f27851]",
  },
  {
    id: "contribution",
    icon: <GiftIcon className="h-[21px] w-[21px]" />,
    value: "10",
    label: "Contribution",
    bgColor: "bg-[#926cff]",
  },
];
export function StatCards() {
  return (
    <div className="flex gap-6">
      {statsCards.map((card) => (
        <Card
          key={card.id}
          className={`${card.bgColor} relative h-[149px] w-[175px] rounded-[10px] border-none`}
        >
          <CardContent className="p-0">
            <div className="absolute left-[15px] top-[21px] flex h-12 w-[54px] items-center justify-center rounded-[10px] bg-white">
              {card.icon}
            </div>
            <div className="absolute left-[92px] top-6 w-[63px] text-[32px] font-medium leading-[36.0px] tracking-[0] text-white [font-family:'Inter-Medium',Helvetica]">
              {card.value}
            </div>
            <div className="absolute left-[21px] top-[94px] text-[25px] font-medium leading-[28.1px] tracking-[0] text-white [font-family:'Inter-Medium',Helvetica]">
              {card.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
