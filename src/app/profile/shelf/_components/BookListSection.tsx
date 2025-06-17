"use client";
/* eslint-disable @next/next/no-img-element */
import { PaginationComponent } from "@/app/(landing)/books/_components/paginationComponent";
import { borrowStatus, IBorrow } from "@/app/admin/borrow/model-def";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { KY, MTD } from "@/lib/constants";
import { useMakeReqState } from "@/lib/state/hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { toast } from "sonner";

// Book card component for reusability
function isOverdue(returnDate: Date | string | undefined): boolean {
  if (returnDate == undefined) return false;
  const now = new Date();
  const dueDate = new Date(returnDate);
  return now > dueDate;
}
interface BookListProp {
  value: borrowStatus;
  data: any;
  query: Record<string, any>;
  setPage: any;
}
export function BooksList({ value, setPage, data, query }: BookListProp) {
  const { loading, makeReq } = useMakeReqState();
  const queryClient = useQueryClient();
  const borrowList = data?.body || [];
  const CancleBorrowRequest = async (borrowId: string) => {
    console.log("borrowId", borrowId);
    const resp = await makeReq(`${KY.borrow}/cancle/${borrowId}`, {}, MTD.POST);
    if (!resp.ok) {
      toast.error(resp.message);
      return;
    }
    toast.success("succesfully requested book");
    await queryClient.invalidateQueries({ queryKey: [KY.borrow] });
  };
  return (
    <TabsContent value={value}>
      <div className="grid grid-cols-1 gap-3   lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {borrowList.map((book: any, i: number) => (
          <BorrowCard
            key={i}
            borrow={book}
            cancleReq={CancleBorrowRequest}
            loading={loading}
          />
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
interface CardProp {
  loading: boolean;
  borrow: IBorrow;
  cancleReq: any;
}
//The Borrow Card component
const BorrowCard = ({ borrow, cancleReq, loading }: CardProp) => {
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
          <Badge className="absolute right-4 top-[11px] h-2.5 w-2.5 rounded-[5px] bg-[#1d64b0] p-0" />
        )}

        <div className="absolute left-[15px] top-[198px] flex flex-col items-start gap-[5px]">
          <div className="text-s whitespace-nowrap leading-[15.4px] text-blue-900">
            {borrow.bookName}
          </div>
          {/* <div className="whitespace-nowrap text-[10px] leading-[12.9px] text-[#4c4c4c]">
            {borrow.author}
          </div> */}
          <div className="whitespace-nowrap text-[10px] leading-[12.9px]">
            {/* <span className="text-[#4c4c4c]">{borrow.rating}</span> */}
            {/* <span className="text-[#a6a6a6]">/5</span> */}
          </div>
        </div>

        <div className="absolute left-[168px] top-6 whitespace-nowrap text-[15px] leading-[19.3px] text-[#4c4c4c]">
          {GetFirstTxt(borrow).txt}
        </div>
        <div className="absolute left-[168px] top-[53px] text-[10px] leading-[12.9px] text-neutral-500">
          {GetFirstTxt(borrow).strDate || ""}
        </div>

        <div className="absolute left-[168px] top-[81px] whitespace-nowrap text-[15px] leading-[19.3px] text-[#4c4c4c]">
          {GetSecondTxt(borrow).txt}
        </div>
        <div className="absolute left-[168px] top-[110px] text-[10px] leading-[12.9px]">
          {isOverdue(borrow.returnedDate) ? (
            <>
              <span className="text-neutral-500">
                {GetSecondTxt(borrow).strDate}{" "}
              </span>
              <span className="text-[#f23d3d]">(Over Due)</span>
            </>
          ) : (
            <span className="text-neutral-500">
              {GetSecondTxt(borrow).strDate}
            </span>
          )}
        </div>

        <div className="absolute left-[163px] top-[141px] h-10 w-[125px]">
          <div
            className={`flex h-10 w-full items-center justify-center rounded-[5px] align-middle  ${
              borrow.status == borrowStatus.Taken || borrowStatus.Accepted
                ? "bg-[#a9d8ae]"
                : "bg-[#a0a0a0]"
            }`}
          >
            {borrow.status}
          </div>
        </div>

        <div className="absolute left-[163px] top-[196px] h-10 w-[125px]">
          {borrow.status == borrowStatus.WaitList ? (
            <div className="relative flex h-10 w-[125px] rounded-[5px] border border-solid border-[#f76b56] bg-white">
              <Button
                disabled={loading}
                onClick={() => cancleReq(borrow._id)}
                className="h-10 flex-1 bg-transparent font-semibold text-[#f76b56] hover:bg-transparent"
                // variant="null"
              >
                {loading ? "...loading" : "Cancle"}
                <div className="flex h-[38px] w-1/6 items-center justify-center border-[#f76b56]">
                  <X className="h-4 w-[15px]" />
                </div>
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface Disp {
  txt: string;
  date?: Date;
  strDate?: string;
}
function formatCustom(rawDate: Date): string {
  if (!rawDate) return "";
  const date = new Date(rawDate);
  const formatted = date.toLocaleString("en-US", {
    month: "short", // Jan
    day: "numeric", // 3
    year: "numeric", // 2014
  });

  return `${formatted || ""}`;
}
function GetFirstTxt(borrow: IBorrow | undefined): Disp {
  let data: Disp = { txt: "" };
  if (borrow?.status == borrowStatus.WaitList)
    data = { txt: "requested on", date: borrow.createdAt };
  else if (borrow?.status == borrowStatus.Accepted)
    data = { txt: "requested on", date: borrow.acceptedDate };
  else if (borrow?.status == borrowStatus.Taken)
    data = { txt: "Borrowed on", date: borrow.takenDate };
  else if (borrow?.status == borrowStatus.Returned)
    data = { txt: "Borrowed On", date: borrow.takenDate };
  data.strDate = formatCustom(data.date as Date) || "";
  return data;
}

function GetSecondTxt(borrow: IBorrow | undefined): Disp {
  let data: Disp = { txt: "" };
  if (borrow?.status == borrowStatus.WaitList) return { txt: "" };
  else if (borrow?.status == borrowStatus.Accepted)
    data = { txt: "accepted On", date: borrow.acceptedDate };
  else if (borrow?.status == borrowStatus.Taken)
    data = { txt: "Return Date", date: borrow.dueDate };
  else if (borrow?.status == borrowStatus.Returned)
    data = { txt: "Borrowed on", date: borrow.returnedDate };
  data.strDate = formatCustom(data.date as Date) || "";
  return data;
}
