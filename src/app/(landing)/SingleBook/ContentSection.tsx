/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ArrowLeftIcon, ChevronDown, CircleCheck, MapPinHouse, Share2 } from "lucide-react";

import type { JSX } from "react";
import { BottomTabsSection } from "./bookBottomTabs";
// Book metadata
export const bookInfo = {
  title: "Don't Make Me Think",
  author: "Steve Krug",
  year: "2000",
  edition: "Second Edition",
  rating: "5.0",
  currentlyReading: "25",
  haveRead: "119",
  publishDate: "2000",
  publisher: "New Riders Press",
  language: "English",
  pages: "216",
  location: "CS A-15",
};

// Availability options
export const availabilityOptions = [
  { type: "Hard Copy", available: true },
  { type: "E - Book", available: true },
  { type: "Audio book", available: true },
];

//
export const ContentSection = (): JSX.Element => {


  return (
    <div className="w-full h-full overflow-y-auto rounded-[10px] py-10 px-6 mx-5">
      <div className="w-full h-full rounded-[0px_10px_10px_0px]">
        {/* Back to results button */}
        <div className="flex items-center gap-[9px] mb-8">
          <ArrowLeftIcon className="w-5 h-5" />
          <div className="font-normal text-[#4c4c4c] text-[15px] leading-[19.3px]">
            Back to results
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Top section with book image and details */}
          <div className="flex gap-8">
            {/* Book image */}
            <Card className="w-[558px] h-[473px] overflow-hidden">
              <CardContent className="p-0 h-full flex flex-col items-center">
                <img
                  className="w-[450px] h-[421px]"
                  alt="Book cover"
                  src="/assets/imgrectangle-19.png"
                />
                <div className="flex justify-center gap-6 mt-2">
                  {/*<div className="flex flex-col items-center">*/}
                  {/*  <div className="w-8 h-8 flex items-center justify-center">*/}
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
                  {/*  </span>*/}
                  {/*</div>*/}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <Share2 />
                    </div>
                    <span className="font-bold text-[#333333] text-[11px] leading-3">
                      Share
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Book details */}
            <div className="flex flex-col w-[503px]">
              <div className="flex flex-col gap-1">
                <h1 className="font-normal text-[#4c4c4c] text-[35px] leading-[45px]">
                  {bookInfo.title}
                </h1>
                <div className="font-normal text-[#4c4c4c] text-[15px] mt-8">
                  By <span className="underline">{bookInfo.author}</span>,{" "}
                  {bookInfo.year}
                </div>
                <div className="font-normal text-[#9a9a9a] text-[15px]">
                  {bookInfo.edition}
                </div>
              </div>

              {/* Ratings and stats */}
              <div className="flex items-start gap-[19px] mt-8">
                <div className="flex items-center gap-[11px]">
                  <div className="flex items-start gap-[3px]">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className="w-3.5 h-[13.22px] bg-[url(/assets/imgunion.svg)] bg-[100%_100%]"
                      />
                    ))}
                  </div>
                  <div className="font-medium text-[#4c4c4c] text-sm whitespace-nowrap">
                    {bookInfo.rating} Ratings
                  </div>
                </div>
                <div className="font-medium text-[#333333] text-sm whitespace-nowrap">
                  {bookInfo.currentlyReading} Currently reading
                </div>
                <div className="font-medium text-[#333333] text-sm whitespace-nowrap">
                  {bookInfo.haveRead} Have read
                </div>
              </div>

              {/* Availability and Status */}
              <div className="flex items-start gap-[17px] mt-8">
                <div className="w-[132px]">
                  <h3 className="font-bold text-[#4c4c4c] text-sm whitespace-nowrap mb-6">
                    Availability
                  </h3>
                  <div className="flex flex-col gap-2">
                    {availabilityOptions.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CircleCheck />
                        <div className="font-normal text-[#4c4c4c] text-[15px]">
                          {option.type}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-[132px]">
                  <h3 className="font-bold text-[#4c4c4c] text-sm whitespace-nowrap mb-6">
                    Status
                  </h3>
                  <div className="flex flex-col gap-[13px]">
                    <Badge className="w-[85px] h-[26px] bg-[#42bb4e] text-white font-normal text-[15px] rounded-[5px] shadow-[0px_0px_4px_#00000040] flex items-center justify-center">
                      In-Shelf
                    </Badge>
                    <div className="flex items-start  gap-3">
                      <div className="w-5 h-5 relative">
                        <MapPinHouse />
                      </div>
                      <div className="font-normal text-[#4c4c4c] text-[15px] leading-[22.5px]">
                        {bookInfo.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add to List button */}
              <div className="mt-4">
                <Button className="w-[127px] h-10 bg-[#4c4c4c] rounded-[5px] text-white font-normal text-[15px]">
                  Add to List
                  <ChevronDown />
                </Button>
              </div>

              {/* Action buttons */}
              <div className="flex items-start gap-[38px] mt-8">
                <Button className="w-[209px] h-[61px] bg-[#f27851] rounded-[5px] text-white font-semibold text-xl">
                  Request BORROW
                </Button>
                <Button className="w-[209px] h-[61px] bg-[#41b54c] rounded-[5px] text-white font-bold text-xl">
                  Return book
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs section */}
          <BottomTabsSection bookInfo={bookInfo}/>
        </div>
      </div>
    </div>
  );
};

