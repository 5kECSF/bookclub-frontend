import { Badge } from "@/components/ui/badge";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import { Card, CardContent } from "@/components/ui/card";

// Book details data

export const bookDetails = {
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
};// Community reviews data
export const TabButtons=({title, value}:{title:string, value:string})=>{
    return(
         <TabsTrigger
            value={value}
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#f27851] data-[state=active]:text-[#f27851] text-[13px] rounded-none px-4"
        >
          {title}
        </TabsTrigger>
    )
}
export const BottomTabsSection = ({bookInfo}:any) => {
  return(<Tabs defaultValue="overview" className="w-full">
    <div className="border-b border-[#dddddd]">
      <TabsList className="bg-transparent h-10">
        <TabButtons title="Overview" value="overview"/>
        <TabButtons title="View book Instances" value="instances"/>
        <TabButtons title="Lists" value="lists"/>
        <TabButtons title="Related Books" value="related"/>
      </TabsList>
    </div>

    <OverviewSection bookInfo={bookInfo}/>
    <RelatedBooksSection />
  </Tabs>)
}
//
export const RelatedBooksSection=()=>{
    return (
        <TabsContent value="instances" className="mt-6">
<div className="flex gap-4">
                <div className="w-[75px] h-[99px] rounded-[5px] border border-solid border-[#f1f1f1] bg-[url(/assets/imgframe-52.png)] bg-cover" />
                <div className="w-[75px] h-[99px] rounded-[5px] border border-solid border-[#f1f1f1] bg-[url(/assets/imgframe-53.png)] bg-cover" />
              </div>
        </TabsContent>
        
    )
}
export const Metadata=({title, value}: {title: string, value: string})=>{
    return (
        <Card className="flex-1 border border-solid border-[#dddddd] rounded-[5px]">
          <CardContent className="flex flex-col items-center gap-1.5 px-10 py-2.5">
            <div className="font-semibold text-[#666666] text-[10.5px] text-center">
              {title}
            </div>
            <div className="font-semibold text-[#f27851] text-[10.8px] text-center">
              {value}
            </div>
          </CardContent>
        </Card>
    )
}
export const OverviewSection = ({bookInfo}:any) => (
    <TabsContent value="overview" className="mt-6">
      {/* Book metadata cards */}
      <div className="flex items-start gap-[50px] py-2.5">
        <Metadata title="Publish Date" value={bookInfo.publishDate}/>
        <Metadata title="Publisher" value={bookInfo.publisher}/>
        <Metadata title="Language" value={bookInfo.language}/>
        <Metadata title="Pages" value={bookInfo.pages}/>
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
            <div className="mb-4 flex justify-stretch">
              <h3 className="font-semibold text-[#4c4c4c] text-sm mr-4 mb-3">
                Published in:
              </h3>
              <div className="font-semibold text-[#4c4c4c] text-xs leading-[19.5px]">
                {bookDetails.publishedIn}
              </div>
            </div>

            {/* Edition Notes */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#4c4c4c] text-sm mb-2.5">
                Classifications
              </h3>
              <div className="grid grid-cols-[120px_1fr] gap-y-2">
                <div className="font-semibold text-[#4c4c4c] text-[11px]">
                  Book Category
                </div>
                <div className="font-semibold text-[#4c4c4c] text-[11px]">
                  {bookDetails.editionNotes.series}
                </div>
                <div className="font-semibold text-[#4c4c4c] text-[11px]">
                  Genres
                </div>
                <div className="font-semibold text-[#4c4c4c] text-[10px]">
                  {bookInfo.genres &&
                          bookInfo.genres.map((tag: string, tagIndex: number) => (
                              <Badge
                                  key={tagIndex}
                                  className="ml-2 bg-transparent text-[#333333] border border-solid border-[#cccccc] rounded-2xl font-semibold text-[11px]"
                              >
                                {tag}{" "}
                              </Badge>
                          ))}
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
                  Cover Type
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

              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          {/* About Author section */}
          <AuthorDetails/>

          {/* Community Reviews section */}
            {/* <CommunityReview/> */}
        </div>
      </div>
    </TabsContent>
)

export const AuthorDetails=()=>{
    return (
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
    )
}
