import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { ArrowLeftIcon } from "lucide-react";

import type { JSX } from "react";

export const ContentSection = (): JSX.Element => {
  // Book metadata
  const bookInfo = {
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
  const availabilityOptions = [
    { type: "Hard Copy", available: true },
    { type: "E - Book", available: true },
    { type: "Audio book", available: true },
  ];

  // Book details data
  const bookDetails = {
    publishedIn: "United States",
    editionNotes: {
      series: "Dover large print classics",
      genre: "Fiction.",
    },
    classifications: {
      deweyDecimal: "823/.8",
      libraryOfCongress: "PR5485 .A1 2002",
    },
    physicalObject: {
      pagination: "ix, 112 p. (large print) ;",
      numberOfPages: "216",
    },
    idNumbers: {
      myBookShelf: "OL3570252M",
      isbn10: "0486424715",
      lccn: "2002073560",
      libraryThing: "12349",
      goodreads: "690668",
    },
  };

  // Community reviews data
  const communityReviews = [
    { category: "PACE", tag: "Meandering", percentage: "100%" },
    { category: "ENJOYABILITY", tag: "Interesting", percentage: "100%" },
    { category: "DIFFICULTY", tag: "Advanced", percentage: "100%" },
    {
      category: "GENRES",
      tags: [
        { name: "Horror", percentage: "66%" },
        { name: "Mystery", percentage: "33%" },
      ],
    },
    {
      category: "MOOD",
      tags: [
        { name: "Ominous", percentage: "25%" },
        { name: "Scientific", percentage: "25%" },
      ],
    },
    {
      category: "IMPRESSIONS",
      tags: [
        { name: "Overhyped", percentage: "50%" },
        { name: "Forgettable", percentage: "50%" },
      ],
    },
    { category: "LENGTH", tag: "Short", percentage: "100%" },
  ];

  return (
    <div className="w-full h-full overflow-y-auto rounded-[10px] py-10 px-6">
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
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img
                        className="w-5 h-[18px]"
                        alt="Review"
                        src="/assets/imgg3702.png"
                      />
                    </div>
                    <span className="font-bold text-[#333333] text-[11px] leading-3">
                      Review
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img
                        className="w-[17px] h-[17px]"
                        alt="Notes"
                        src="/assets/imggroup.png"
                      />
                    </div>
                    <span className="font-bold text-[#333333] text-[11px] leading-3">
                      Notes
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img
                        className="w-5 h-5"
                        alt="Share"
                        src="/assets/imgclip-path-group.png"
                      />
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
                        <img
                          className="w-[15px] h-[15px]"
                          alt="Check"
                          src="/assets/imgvector.svg"
                        />
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
                    <div className="flex items-start gap-px">
                      <div className="w-5 h-5 relative">
                        <img
                          className="absolute w-3.5 h-[17px] top-0.5 left-[3px]"
                          alt="Location"
                          src="/assets/imgsubtract.svg"
                        />
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
                  <img
                    className="w-[17px] h-[9px] ml-2"
                    alt="Dropdown"
                    src="/assets/imgpolygon-1.svg"
                  />
                </Button>
              </div>

              {/* Action buttons */}
              <div className="flex items-start gap-[38px] mt-8">
                <Button className="w-[209px] h-[61px] bg-[#f27851] rounded-[5px] text-white font-semibold text-xl">
                  BORROW
                </Button>
                <Button className="w-[209px] h-[61px] bg-[#41b54c] rounded-[5px] text-white font-bold text-xl">
                  Return book
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs section */}
          <Tabs defaultValue="overview" className="w-full">
            <div className="border-b border-[#dddddd]">
              <TabsList className="bg-transparent h-10">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#f27851] data-[state=active]:text-[#f27851] text-[13px] rounded-none px-4"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="instances"
                  className="text-[#666666] text-[13px] font-medium rounded-none px-4"
                >
                  View book Instances
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="text-[#666666] text-[13px] font-medium rounded-none px-4"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="text-[#666666] text-[13px] font-medium rounded-none px-4"
                >
                  4.1k Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="lists"
                  className="text-[#666666] text-[13px] font-medium rounded-none px-4"
                >
                  Lists
                </TabsTrigger>
                <TabsTrigger
                  value="related"
                  className="text-[#666666] text-[13px] font-medium rounded-none px-4"
                >
                  Related Books
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="mt-6">
              {/* Book metadata cards */}
              <div className="flex items-start gap-[50px] py-2.5">
                <Card className="flex-1 border border-solid border-[#dddddd] rounded-[5px]">
                  <CardContent className="flex flex-col items-center gap-[3px] px-[57px] py-2.5">
                    <div className="font-semibold text-[#666666] text-[10.5px] text-center">
                      Publish Date
                    </div>
                    <div className="font-semibold text-[#333333] text-[12.8px] text-center whitespace-nowrap">
                      {bookInfo.publishDate}
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex-1 border border-solid border-[#dddddd] rounded-[5px]">
                  <CardContent className="flex flex-col items-center gap-1.5 px-10 py-2.5">
                    <div className="font-semibold text-[#666666] text-[10.5px] text-center">
                      Publisher
                    </div>
                    <div className="font-semibold text-[#f27851] text-[10.8px] text-center">
                      {bookInfo.publisher}
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex-1 border border-solid border-[#dddddd] rounded-[5px]">
                  <CardContent className="flex flex-col items-center gap-[5px] px-16 py-2.5">
                    <div className="font-semibold text-[#666666] text-[10.5px] text-center">
                      Language
                    </div>
                    <div className="font-semibold text-[#f27851] text-[10.8px] text-center">
                      {bookInfo.language}
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex-1 border border-solid border-[#dddddd] rounded-[5px]">
                  <CardContent className="flex flex-col items-center gap-1 px-[73px] py-2.5">
                    <div className="font-semibold text-[#666666] text-[10.5px] text-center">
                      Pages
                    </div>
                    <div className="font-semibold text-[#333333] text-[12.8px] text-center whitespace-nowrap">
                      {bookInfo.pages}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preview language */}
              <div className="mt-6">
                <div className="text-xs">
                  <span className="font-semibold text-[#666666]">
                    Previews available in:{" "}
                  </span>
                  <span className="font-semibold text-[#f27851] underline">
                    English
                  </span>
                </div>
              </div>

              {/* Book description */}
              <div className="mt-4 w-full">
                <div className="text-[13px] text-[#333333] leading-[19.5px]">
                  Since Don&apos;t Make Me Think was first published in 2000,
                  hundreds of thousands of Web designers and developers have
                  relied on usability guru Steve Krug&apos;s guide to help them
                  understand the principles of intuitive navigation and
                  information design. Witty, commonsensical, and eminently
                  practical, it&apos;s one of the best-loved and
                  most...&nbsp;&nbsp;
                  <span className="text-[#f27851]">Read more</span>
                </div>
              </div>

              <div className="flex gap-8 mt-10">
                {/* Book details section */}
                <Card className="w-[507px] border border-solid border-[#dddddd] rounded-[5px]">
                  <CardContent className="p-10">
                    <h2 className="font-semibold text-[#4c4c4c] text-[22px] mb-6">
                      Book Details
                    </h2>

                    {/* Published in */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-[#4c4c4c] text-sm mb-3">
                        Published in
                      </h3>
                      <div className="font-semibold text-[#4c4c4c] text-xs leading-[19.5px]">
                        {bookDetails.publishedIn}
                      </div>
                    </div>

                    {/* Edition Notes */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-[#4c4c4c] text-sm mb-2.5">
                        Edition Notes
                      </h3>
                      <div className="grid grid-cols-[120px_1fr] gap-y-2">
                        <div className="font-semibold text-[#4c4c4c] text-[11px]">
                          Series
                        </div>
                        <div className="font-semibold text-[#4c4c4c] text-[11px]">
                          {bookDetails.editionNotes.series}
                        </div>
                        <div className="font-semibold text-[#4c4c4c] text-[11px]">
                          Genre
                        </div>
                        <div className="font-semibold text-[#4c4c4c] text-[10px]">
                          {bookDetails.editionNotes.genre}
                        </div>
                      </div>
                    </div>

                    {/* Classifications */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-[#666666] text-[12.8px] mb-3">
                        Classifications
                      </h3>
                      <div className="grid grid-cols-[120px_1fr] gap-y-4">
                        <div className="font-semibold text-[#666666] text-xs">
                          Dewey Decimal Class
                        </div>
                        <div className="font-semibold text-[#333333] text-xs">
                          {bookDetails.classifications.deweyDecimal}
                        </div>
                        <div className="font-semibold text-[#666666] text-[11px]">
                          Library of Congress
                        </div>
                        <div className="font-semibold text-[#333333] text-[11px]">
                          {bookDetails.classifications.libraryOfCongress}
                        </div>
                      </div>
                    </div>

                    {/* Physical Object */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-[#666666] text-[12.8px] mb-3">
                        The Physical Object
                      </h3>
                      <div className="grid grid-cols-[120px_1fr] gap-y-2">
                        <div className="font-semibold text-[#666666] text-[11px]">
                          Pagination
                        </div>
                        <div className="font-semibold text-[#333333] text-[11px]">
                          {bookDetails.physicalObject.pagination}
                        </div>
                        <div className="font-semibold text-[#666666] text-[11px]">
                          Number of pages
                        </div>
                        <div className="font-semibold text-[#333333] text-xs">
                          {bookDetails.physicalObject.numberOfPages}
                        </div>
                      </div>
                    </div>

                    {/* ID Numbers */}
                    <div>
                      <h3 className="font-semibold text-[#666666] text-[12.8px] mb-3">
                        ID Numbers
                      </h3>
                      <div className="grid grid-cols-[120px_1fr] gap-y-2">
                        <div className="font-semibold text-[#666666] text-[11px]">
                          My Book Shelf
                        </div>
                        <div className="font-semibold text-[#333333] text-[11px]">
                          {bookDetails.idNumbers.myBookShelf}
                        </div>
                        <div className="font-semibold text-[#666666] text-[11px]">
                          ISBN 10
                        </div>
                        <div className="font-semibold text-[#333333] text-xs">
                          {bookDetails.idNumbers.isbn10}
                        </div>
                        <div className="font-semibold text-[#666666] text-[11px]">
                          LCCN
                        </div>
                        <div className="font-semibold text-[#4c4c4c] text-xs">
                          {bookDetails.idNumbers.lccn}
                        </div>
                        <div className="font-semibold text-[#666666] text-[10px]">
                          Library Thing
                        </div>
                        <div className="font-semibold text-[#4c4c4c] text-xs">
                          {bookDetails.idNumbers.libraryThing}
                        </div>
                        <div className="font-semibold text-[#666666] text-[11px]">
                          Goodreads
                        </div>
                        <div className="font-semibold text-[#4c4c4c] text-xs">
                          {bookDetails.idNumbers.goodreads}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-6">
                  {/* About Author section */}
                  <Card className="w-[445px] h-[418px] rounded-[10px] overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex justify-between">
                        <div>
                          <h2 className="text-xl mb-6">
                            <span className="text-[#f27851] font-semibold">
                              About
                            </span>
                            <span className="text-[#4c4c4c] font-semibold">
                              {" "}
                              Author
                            </span>
                          </h2>
                          <div className="text-[#4c4c4c] text-xl font-normal mb-6">
                            Steve Krug
                          </div>
                        </div>
                        <img
                          className="w-[88px] h-[101px]"
                          alt="Author"
                          src="/assets/imgrectangle-19-1.png"
                        />
                      </div>

                      <p className="text-[#4c4c4c] text-[13px] leading-[16.7px] mb-6">
                        Steve Krug is a usability consultant who has more than
                        30 years of experience as a user advocate for companies
                        like Apple, Netscape, AOL, Lexus, and others. Based in
                        part on the success of his first book, Don&#39;t Make Me
                        Think, he has become a highly sought-after speaker on
                        usability design.
                      </p>

                      <h3 className="font-bold text-[#4c4c4c] text-[15px] mb-4">
                        Other Books
                      </h3>

                      <div className="flex gap-4">
                        <div className="w-[75px] h-[99px] rounded-[5px] border border-solid border-[#f1f1f1] bg-[url(/assets/imgframe-52.png)] bg-cover" />
                        <div className="w-[75px] h-[99px] rounded-[5px] border border-solid border-[#f1f1f1] bg-[url(/assets/imgframe-53.png)] bg-cover" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Community Reviews section */}
                  <Card className="w-[507px] rounded-[5px] border border-solid border-[#dddddd]">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-[#4c4c4c] text-[22px]">
                          Community Reviews
                        </h2>
                        <span className="font-bold text-[#f76b56] text-[15px] underline">
                          Feedback?
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        {communityReviews.map((review, index) => (
                          <div
                            key={index}
                            className="h-[29px] flex items-center"
                          >
                            <div className="w-[70px] font-semibold text-[#666666] text-[11.2px] tracking-[0.50px]">
                              {review.category}
                            </div>

                            {review.tag && (
                              <Badge className="ml-2 bg-transparent text-[#333333] border border-solid border-[#cccccc] rounded-2xl font-semibold text-xs">
                                {review.tag}{" "}
                                <span className="text-[#767676]">
                                  {" "}
                                  {review.percentage}
                                </span>
                              </Badge>
                            )}

                            {review.tags &&
                              review.tags.map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  className="ml-2 bg-transparent text-[#333333] border border-solid border-[#cccccc] rounded-2xl font-semibold text-[11px]"
                                >
                                  {tag.name}{" "}
                                  <span className="text-[#767676]">
                                    {" "}
                                    {tag.percentage}
                                  </span>
                                </Badge>
                              ))}
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 font-bold text-[#4c4c4c] text-sm underline">
                        Add your community review
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
