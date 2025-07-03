/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MTD } from "@/lib/constants";
import { KY } from "@/lib/constants/routes";
import { useMakeReqState } from "@/lib/state/hooks/useMutation";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { IBook } from "@/types/libraryTypes";
import { ACCOUNT_STATUS, IUser } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";

import { MapPinHouse, Share2 } from "lucide-react";

import type { JSX } from "react";
import { toast } from "sonner";

// Availability options
export const availabilityOptions = [
  { type: "Hard Copy", available: true },
  { type: "E - Book", available: true },
  { type: "Audio book", available: true },
];
const handleShare = async (book: IBook) => {
  const shareUrl = `http://localhost:3002/books/${encodeURIComponent(book?._id as string)}`;
  const shareData = {
    title: book.title,
    text: `Check out "${book.title}" by ${book.authorName}!`,
    url: shareUrl,
  };

  try {
    if (navigator.share && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!", {
        description: "Share this link with others.",
      });
    }
  } catch (error) {
    toast.error("Failed to share book", {
      description: "Please try copying the link manually.",
    });
  }
};
//
export const ContentSection = ({ book }: { book: IBook }): JSX.Element => {
  const { loading, makeReq } = useMakeReqState();
  const queryClient = useQueryClient();

  const { isLoading, data, isError, error, isPlaceholderData } =
    useFetch<IUser>([KY.profile], `${KY.profile}`, {});

  const RequestBook = async () => {
    const resp = await makeReq(
      `${KY.borrow}/request/${book._id}`,
      {},
      MTD.POST,
    );
    if (!resp.ok) {
      toast.error(resp.message);
      return;
    }
    toast.success("succesfully requested book");
    await queryClient.invalidateQueries({ queryKey: [KY.profile] });
  };
  return (
    <div className="flex gap-8">
      {/* Book image */}
      <Card className="h-[473px] w-[558px] overflow-hidden">
        <CardContent className="flex h-full flex-col items-center p-0">
          <img
            className="h-[421px] w-[450px]"
            alt="Book cover"
            src={book.upload?.url}
          />
          <div className="mt-2 flex justify-center gap-6">
            {/* <CommentedOut/> */}
            <Button
              onClick={() => handleShare(book)}
              variant="ghost"
              className="flex  flex-col items-center"
            >
              <div className="flex h-8 w-8 items-center justify-center">
                <Share2 />
              </div>
              <span className="text-[11px] font-bold leading-3 text-[#333333]">
                Share
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Book details */}
      <div className="flex w-[503px] flex-col">
        <div className="flex flex-col gap-1">
          <h1 className="text-[35px] font-normal leading-[45px] text-[#4c4c4c]">
            {book.title}
          </h1>
          <div className="mt-8 text-[15px] font-normal text-[#4c4c4c]">
            By <span className="underline">{book?.authorName}</span>,{" "}
            {/*TODO {bookInfo.year} */}
          </div>
          <div className="text-[15px] font-normal text-[#9a9a9a]">
            {/*TODO {bookInfo.edition} */}
          </div>
        </div>

        {/* Ratings and stats */}
        <div className="mt-8 flex items-start gap-[19px]">
          {/* Rating */}
          <CommentedRating />
          <div className="whitespace-nowrap text-sm font-medium text-[#333333]">
            {book?.availableCnt} Currently Available
          </div>
          <div className="whitespace-nowrap text-sm font-medium text-[#333333]">
            {book.instanceCnt} Total Books
          </div>
        </div>

        {/* Availability and Status */}
        <div className="mt-8 flex items-start gap-[17px]">
          <div className="w-[132px]">
            <h3 className="mb-6 whitespace-nowrap text-sm font-bold text-[#4c4c4c]">
              Genres
            </h3>
            <div className="flex flex-col gap-2">
              {book?.genres?.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  {/* <CircleCheck /> */}
                  <div className="text-[15px] font-normal text-[#4c4c4c]">
                    {option}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="">
            <h3 className="mb-6 whitespace-nowrap text-sm font-bold text-[#4c4c4c]">
              Category
            </h3>
            <div className="flex flex-col gap-[13px]">
              <Badge className="inline-flex h-[26px] items-center justify-center overflow-hidden  whitespace-nowrap  rounded-[5px] bg-[#42bb4e] p-2 px-4 text-[15px] font-normal text-white shadow-[0px_0px_4px_#00000040]">
                {book.categoryName}
              </Badge>
              <div className="flex items-start  gap-3">
                <div className="relative h-5 w-5">
                  <MapPinHouse />
                </div>
                <div className="text-[15px] font-normal leading-[22.5px] text-[#4c4c4c]">
                  {/* {bookInfo.location} */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add to List button */}
        <div className="mt-4">
          {/* <Button className="h-10 w-[127px] rounded-[5px] bg-[#4c4c4c] text-[15px] font-normal text-white">
            Add to List
            <ChevronDown />
          </Button> */}
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex items-start gap-[38px]">
          <Button
            disabled={!AllowedToBorrow(book, data as IUser) || loading}
            onClick={RequestBook}
            className="h-[61px] w-fit rounded-[5px] bg-[#f27851] px-3 text-xl font-semibold text-white"
          >
            {loading ? "...loading" : ReturnTxt(book, data)}
          </Button>

          {/* <Button className="h-[61px] w-[209px] rounded-[5px] bg-[#41b54c] text-xl font-bold text-white">
            Return book
          </Button> */}
        </div>
      </div>
    </div>
  );
};

function AllowedToBorrow(book: IBook, user: IUser | undefined): boolean {
  if (!HaveBook(book)) return false;
  if (user?.accountStatus != ACCOUNT_STATUS.ACTIVE) return false;
  if (
    [
      ...(user?.requestedBooks || []),
      ...(user?.approvedBooks || []),
      ...(user?.borrowedBooks || []),
    ].includes(book?._id as string)
  )
    return false;
  return true;
}
function ReturnTxt(book: IBook, user: IUser | undefined): string {
  if (user && user?.accountStatus != ACCOUNT_STATUS.ACTIVE)
    return "Your account is not Approved";
  if (!user) {
    return "login to Request";
  }
  if (user?.requestedBooks?.includes(book?._id as string))
    return "Book Requested";
  else if (user?.approvedBooks?.includes(book?._id as string))
    return "Request Approved";
  else if (user?.borrowedBooks?.includes(book?._id as string))
    return "Book Taken";
  else if (!HaveBook(book)) return "Currently Not Available";
  return "Request To BORROW";
}
function HaveBook(book: IBook): boolean {
  if ((book?.availableCnt || 0) > 0) return true;
  return false;
}

function CommentedOut() {
  return (
    <>
      {/* <div className="flex flex-col items-center">*/}
      {/* <div className="w-8 h-8 flex items-center justify-center">*/}
      {/*    <img*/}
      {/*      className="w-5 h-[18px]"*/}
      {/*      alt="Review"*/}
      {/*      src="/assets/imgg3702.png"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <span className="font-bold text-[#333333] text-[11px] leading-3">*/}
      {/*    Review*/}
      {/*  </span>*/}
      {/*</div>*/}
      {/*<div className="flex flex-col items-center">*/}
      {/*  <div className="w-8 h-8 flex items-center justify-center">*/}
      {/*    <img*/}
      {/*      className="w-[17px] h-[17px]"*/}
      {/*      alt="Notes"*/}
      {/*      src="/assets/imggroup.png"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <span className="font-bold text-[#333333] text-[11px] leading-3">*/}
      {/*    Notes*/}
      {/*  </span> */}
      {/*</div> */}
    </>
  );
}

function CommentedRating() {
  return (
    <>
      {/* <div className="flex items-center gap-[11px]">
            <div className="flex items-start gap-[3px]">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-[13.22px] w-3.5 bg-[url(/assets/anima/subtract.svg)] bg-[100%_100%]"
                />
              ))}
            </div>
            <div className="whitespace-nowrap text-sm font-medium text-[#4c4c4c]">
              {book.rating} Ratings
            </div>
          </div> */}
    </>
  );
}
