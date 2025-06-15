"use client";
/* eslint-disable @next/next/no-img-element */
import { PaginationComponent } from "@/app/(landing)/books/_components/paginationComponent";
import { borrowStatus, IBorrow } from "@/app/admin/borrow/model-def";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

// Book card component for reusability
function isOverdue(returnDate: Date | string | undefined): boolean {
  if (returnDate == undefined) return false;
  const now = new Date();
  const dueDate = new Date(returnDate);
  return now > dueDate;
}

export function BooksList({
  value,
  setPage,
  data,
  query,
}: {
  value: string;
  data: any;
  query: Record<string, any>;
  setPage: any;
}) {
  const borrowList = data?.body || [];
  return (
    <TabsContent value={value}>
      <div className="grid grid-cols-1 gap-3   lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {borrowList.map((book: any, i: number) => (
          <BorrowCard key={i} borrow={book} />
        ))}
        {!borrowList.length && <div className="text-neutral-400">No Data.</div>}
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

//The Borrow Card component
const BorrowCard = ({ borrow }: { borrow: IBorrow }) => {
  // const isEbook = borrow.status === "E-BOOK";
  // const isRead = borrow.status === "Read";

  return (
    <Card className="relative h-[260px] w-[308px] overflow-hidden">
      <CardContent className="p-0">
        <img
          className="absolute left-[15px] top-4 h-[170px] w-[123px]"
          alt={borrow.bookName}
          src={borrow.imgUrl}
        />

        {borrow.returnedDate && (
          <Badge className="absolute right-4 top-[11px] h-2.5 w-2.5 rounded-[5px] bg-[#fb4141] p-0" />
        )}

        <div className="absolute left-[15px] top-[198px] flex flex-col items-start gap-[5px]">
          <div className="whitespace-nowrap text-xs leading-[15.4px] text-[#4c4c4c]">
            {borrow.bookName}
          </div>
          {/* <div className="whitespace-nowrap text-[10px] leading-[12.9px] text-[#4c4c4c]">
            {borrow.author}
          </div> */}
          <div className="whitespace-nowrap text-[10px] leading-[12.9px]">
            {/* <span className="text-[#4c4c4c]">{borrow.rating}</span> */}
            <span className="text-[#a6a6a6]">/5</span>
          </div>
        </div>

        <div className="absolute left-[168px] top-6 whitespace-nowrap text-[15px] leading-[19.3px] text-[#4c4c4c]">
          Borrowed on
        </div>
        <div className="absolute left-[168px] top-[53px] text-[10px] leading-[12.9px] text-neutral-500">
          {borrow?.takenDate?.toString() || ""}
        </div>

        <div className="absolute left-[168px] top-[81px] whitespace-nowrap text-[15px] leading-[19.3px] text-[#4c4c4c]">
          Submission Due
        </div>
        <div className="absolute left-[168px] top-[110px] text-[10px] leading-[12.9px]">
          {isOverdue(borrow.returnedDate) ? (
            <>
              <span className="text-neutral-500">
                {borrow.returnedDate?.toDateString()}{" "}
              </span>
              <span className="text-[#f23d3d]">(Over Due)</span>
            </>
          ) : (
            <span className="text-neutral-500">
              {borrow.returnedDate?.toDateString()}
            </span>
          )}
        </div>

        <div className="absolute left-[163px] top-[141px] h-10 w-[125px]">
          <Button
            className={`h-10 w-full rounded-[5px] ${
              borrow.status == borrowStatus.Taken || borrowStatus.Accepted
                ? "bg-[#42bb4e]"
                : "bg-[#a0a0a0]"
            }`}
          >
            {borrow.status}
          </Button>
        </div>

        {/* <div className="absolute left-[163px] top-[196px] h-10 w-[125px]">
          {borrow.hasAudio ? (
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
        </div> */}
      </CardContent>
    </Card>
  );
};
