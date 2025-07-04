"use client";
/* eslint-disable @next/next/no-img-element */
import { borrowStatus } from "@/app/admin/borrow/model-def";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { KY } from "@/lib/constants/routes";
import { GetDateStr, IsOverdue } from "@/lib/functions/url";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { INotification } from "@/types/commonTypes";
import { IUser } from "@/types/user";
import { IBorrow } from "../../admin/borrow/model-def";

export function Overdue({ user }: { user: IUser | null }) {
  const { data } = useFetch(
    [KY.borrow, borrowStatus.Borrowed, `${user?._id}`, "my"],
    `${KY.borrow}`,
    { status: borrowStatus.Borrowed, userId: `${user?._id}` },
  );
  const borrowList: IBorrow[] = data?.body || [];
  return (
    <Card className="rounded-[15px]">
      <CardHeader className="pb-0">
        <CardTitle className="font-['Inter-SemiBold',Helvetica] text-xl font-semibold text-[#4c4c4c]">
          Borrowed Books
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col space-y-6">
          {borrowList.map((book, index) => (
            <DueCard key={index} book={book} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function Notifications({ user }: { user: IUser | null }) {
  const { data } = useFetch(
    [KY.notification, `${user?._id}`, "my"],
    `${KY.notification}`,
    {},
  );
  const notificationList: INotification[] = data?.body || [];
  return (
    <Card className="rounded-[15px]">
      <CardHeader className="pb-0">
        <CardTitle className="font-['Inter-SemiBold',Helvetica] text-xl font-semibold text-[#4c4c4c]">
          Lates Updates
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-10 flex max-h-[60vh] flex-col space-y-6 overflow-y-scroll">
          {notificationList.map((update, index) => (
            <div key={index}>
              <div className="flex flex-col gap-1.5">
                <p className="font-['Inter-Regular',Helvetica] text-xl leading-[25.7px] text-[#4c4c4c]">
                  {update.title}
                </p>
                <p className="mt-4 font-['Inter-SemiBold',Helvetica] text-[15px] font-semibold leading-[19.3px] text-[#4c4c4c]">
                  {update.body}
                </p>
                <p className="mt-5 font-['Inter-Regular',Helvetica] text-[13px] leading-[16.7px] text-neutral-500">
                  {GetDateStr(update.createdAt)}
                </p>
              </div>

              <Separator className="mt-6" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function RequestedBooks({ user }: { user: IUser | null }) {
  const { data } = useFetch(
    [KY.borrow, borrowStatus.WaitList, `${user?._id}`, "my"],
    `${KY.borrow}`,
    { status: borrowStatus.WaitList, userId: `${user?._id}` },
  );
  const waitList: IBorrow[] = data?.body || [];
  const { data: acceptedLst } = useFetch(
    [KY.borrow, borrowStatus.Accepted, `${user?._id}`, "my"],
    `${KY.borrow}`,
    { status: borrowStatus.Accepted, userId: `${user?._id}` },
  );
  const acceptedList: IBorrow[] = acceptedLst?.body || [];
  return (
    <Card className="rounded-[15px]">
      <CardHeader className="pb-0">
        <CardTitle className="font-['Inter-SemiBold',Helvetica] text-xl font-semibold text-[#4c4c4c]">
          Requested Books
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col space-y-6">
          {acceptedList.map((book, index) => (
            <BorrowCard key={index} borrow={book} />
          ))}
          {waitList.map((book, index) => (
            <BorrowCard key={index} borrow={book} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function BorrowCard({ borrow }: { borrow: IBorrow }) {
  return (
    <div>
      <div className="flex gap-8">
        <div className="bg-gray-200 h-[99px] w-[75px] rounded">
          <img
            src={borrow.imgUrl || "default.png"}
            alt={borrow.bookName}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="my-2 font-['Inter-Regular',Helvetica] text-xl leading-[25.7px] text-[#4c4c4c]">
            {borrow.bookName}
          </h3>
          <p className="font-['Inter-Regular',Helvetica] text-[15px] leading-[19.3px] text-[#4c4c4c]">
            {borrow.instanceUid && (
              <span className="text-sm text-slate-400 ">Book Uid:</span>
            )}
            {borrow.instanceUid}
          </p>
          <p className="font-['Inter-Regular',Helvetica] text-[15px] leading-[19.3px] text-[#4c4c4c]">
            <span className="text-sm text-slate-400 ">Requested On:</span>{" "}
            {GetDateStr(borrow.createdAt)}
          </p>
          <div className="mt-6 flex items-center justify-between">
            <p className="whitespace-pre-line text-wrap p-2 font-['Inter-Regular',Helvetica] text-[13px] leading-[16.7px] text-neutral-500">
              {borrow.note && (
                <span className="text-sm text-rose-500 ">Admin note: </span>
              )}
              {borrow.note}
            </p>

            <Button
              className={`h-10 rounded-[5px] font-['Inter-SemiBold',Helvetica] text-[15px] font-semibold text-white ${borrow.status == borrowStatus.WaitList ? "bg-[#a0a0a0]" : "bg-[#42bb4e]"}`}
              variant="ghost"
            >
              {borrow.status}
            </Button>
          </div>
        </div>
      </div>

      <Separator className="mt-6" />
    </div>
  );
}
function DueCard({ book }: { book: IBorrow }) {
  return (
    <div>
      <div className="flex gap-8">
        <div className="bg-gray-200 h-[99px] w-[75px] rounded">
          <img
            src={book.imgUrl || "default.png"}
            alt={book.bookName}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-['Inter-Regular',Helvetica] text-xl leading-[25.7px] text-[#4c4c4c]">
            {book.bookName}
          </h3>
          <p className="font-['Inter-Regular',Helvetica] text-[15px] leading-[19.3px] text-[#4c4c4c]">
            {book.instanceUid && (
              <span className="text-sm text-slate-400 ">Book Uid:</span>
            )}
            {book.instanceUid}
          </p>
          <p className="font-['Inter-Regular',Helvetica] text-[15px] leading-[19.3px] text-[#4c4c4c]">
            <span className="text-sm text-slate-400 ">Taken On:</span>{" "}
            {GetDateStr(book.takenDate)}
          </p>
          <div className="mt-6 flex items-center justify-between">
            <p className="font-['Inter-Regular',Helvetica] text-[13px] leading-[16.7px]">
              <span className="text-neutral-500">
                <span className="text-sm text-slate-400 underline">
                  DueDate:
                </span>{" "}
                {GetDateStr(book?.dueDate)}{" "}
              </span>
              <span className="text-[#f23d3d]">
                {IsOverdue(book?.dueDate || null) && `(OVER DUE)`}
              </span>
            </p>
            {/* <Button
                      variant="outline"
                      className="h-10 rounded-[5px] border-[#f76b56] font-['Inter-SemiBold',Helvetica] text-[15px] font-semibold text-[#f76b56]"
                    >
                      Return
                    </Button> */}
          </div>
        </div>
      </div>

      <Separator className="mt-6" />
    </div>
  );
}
