import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
}; // Community reviews data
export const TabButtons = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <TabsTrigger
      value={value}
      className="rounded-none px-4 text-[13px] data-[state=active]:border-b-2 data-[state=active]:border-[#f27851] data-[state=active]:text-[#f27851]"
    >
      {title}
    </TabsTrigger>
  );
};
export const BottomTabsSection = ({ bookInfo }: any) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <div className="border-b border-[#dddddd]">
        <TabsList className="h-10 bg-transparent">
          <TabButtons title="Overview" value="overview" />
          <TabButtons title="View book Instances" value="instances" />
          <TabButtons title="Lists" value="lists" />
          <TabButtons title="Related Books" value="related" />
        </TabsList>
      </div>

      <OverviewSection bookInfo={bookInfo} />
      <RelatedBooksSection />
    </Tabs>
  );
};
//
export const RelatedBooksSection = () => {
  return (
    <TabsContent value="instances" className="mt-6">
      <div className="flex gap-4">
        <div className="h-[99px] w-[75px] rounded-[5px] border border-solid border-[#f1f1f1] bg-[url(/assets/imgframe-52.png)] bg-cover" />
        <div className="h-[99px] w-[75px] rounded-[5px] border border-solid border-[#f1f1f1] bg-[url(/assets/imgframe-53.png)] bg-cover" />
      </div>
    </TabsContent>
  );
};
export const Metadata = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <Card className="flex-1 rounded-[5px] border border-solid border-[#dddddd]">
      <CardContent className="flex flex-col items-center gap-1.5 px-10 py-2.5">
        <div className="text-center text-[10.5px] font-semibold text-[#666666]">
          {title}
        </div>
        <div className="text-center text-[10.8px] font-semibold text-[#f27851]">
          {value}
        </div>
      </CardContent>
    </Card>
  );
};
export const OverviewSection = ({ bookInfo }: any) => (
  <TabsContent value="overview" className="mt-6">
    {/* Book metadata cards */}
    <div className="flex items-start gap-[50px] py-2.5">
      <Metadata title="Publish Date" value={bookInfo.publishDate} />
      <Metadata title="Publisher" value={bookInfo.publisher} />
      <Metadata title="Language" value={bookInfo.language} />
      <Metadata title="Pages" value={bookInfo.pages} />
    </div>

    {/* Preview language */}
    <div className="mt-6">
      <div className="text-xs">
        <span className="font-semibold text-[#666666]">
          Previews available in:{" "}
        </span>
        <span className="font-semibold text-[#f27851] underline">English</span>
      </div>
    </div>

    {/* Book description */}
    <div className="mt-4 w-full">
      <div className="text-[13px] leading-[19.5px] text-[#333333]">
        Since Don&apos;t Make Me Think was first published in 2000, hundreds of
        thousands of Web designers and developers have relied on usability guru
        Steve Krug&apos;s guide to help them understand the principles of
        intuitive navigation and information design. Witty, commonsensical, and
        eminently practical, it&apos;s one of the best-loved and
        most...&nbsp;&nbsp;
        <span className="text-[#f27851]">Read more</span>
      </div>
    </div>

    <div className="mt-10 flex gap-8">
      {/* Book details section */}
      <Card className="w-[507px] rounded-[5px] border border-solid border-[#dddddd]">
        <CardContent className="p-10">
          <h2 className="mb-6 text-[22px] font-semibold text-[#4c4c4c]">
            Book Details
          </h2>

          {/* Published in */}
          <div className="mb-4 flex justify-stretch">
            <h3 className="mb-3 mr-4 text-sm font-semibold text-[#4c4c4c]">
              Published in:
            </h3>
            <div className="text-xs font-semibold leading-[19.5px] text-[#4c4c4c]">
              {bookDetails.publishedIn}
            </div>
          </div>

          {/* Edition Notes */}
          <div className="mb-6">
            <h3 className="mb-2.5 text-sm font-semibold text-[#4c4c4c]">
              Classifications
            </h3>
            <div className="grid grid-cols-[120px_1fr] gap-y-2">
              <div className="text-[11px] font-semibold text-[#4c4c4c]">
                Book Category
              </div>
              <div className="text-[11px] font-semibold text-[#4c4c4c]">
                {bookDetails.editionNotes.series}
              </div>
              <div className="text-[11px] font-semibold text-[#4c4c4c]">
                Genres
              </div>
              <div className="text-[10px] font-semibold text-[#4c4c4c]">
                {bookInfo.genres &&
                  bookInfo.genres.map((tag: string, tagIndex: number) => (
                    <Badge
                      key={tagIndex}
                      className="ml-2 rounded-2xl border border-solid border-[#cccccc] bg-transparent text-[11px] font-semibold text-[#333333]"
                    >
                      {tag}{" "}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>

          {/* Physical Object */}
          <div className="mb-6">
            <h3 className="mb-3 text-[12.8px] font-semibold text-[#666666]">
              The Physical Object
            </h3>
            <div className="grid grid-cols-[120px_1fr] gap-y-2">
              <div className="text-[11px] font-semibold text-[#666666]">
                Cover Type
              </div>
              <div className="text-[11px] font-semibold text-[#333333]">
                {bookDetails.physicalObject.pagination}
              </div>
              <div className="text-[11px] font-semibold text-[#666666]">
                Number of pages
              </div>
              <div className="text-xs font-semibold text-[#333333]">
                {bookDetails.physicalObject.numberOfPages}
              </div>
            </div>
          </div>

          {/* ID Numbers */}
          <div>
            <h3 className="mb-3 text-[12.8px] font-semibold text-[#666666]">
              ID Numbers
            </h3>
            <div className="grid grid-cols-[120px_1fr] gap-y-2">
              <div className="text-[11px] font-semibold text-[#666666]">
                My Book Shelf
              </div>
              <div className="text-[11px] font-semibold text-[#333333]">
                {bookDetails.idNumbers.myBookShelf}
              </div>
              <div className="text-[11px] font-semibold text-[#666666]">
                ISBN 10
              </div>
              <div className="text-xs font-semibold text-[#333333]">
                {bookDetails.idNumbers.isbn10}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6">
        {/* About Author section */}
        <AuthorDetails />

        {/* Community Reviews section */}
        {/* <CommunityReview/> */}
      </div>
    </div>
  </TabsContent>
);

export const AuthorDetails = () => {
  return (
    <Card className="h-[418px] w-[445px] overflow-hidden rounded-[10px]">
      <CardContent className="p-8">
        <div className="flex justify-between">
          <div>
            <h2 className="mb-6 text-xl">
              <span className="font-semibold text-[#f27851]">About</span>
              <span className="font-semibold text-[#4c4c4c]"> Author</span>
            </h2>
            <div className="mb-6 text-xl font-normal text-[#4c4c4c]">
              Steve Krug
            </div>
          </div>
          <img
            className="h-[101px] w-[88px]"
            alt="Author"
            src="/assets/imgrectangle-19-1.png"
          />
        </div>

        <p className="mb-6 text-[13px] leading-[16.7px] text-[#4c4c4c]">
          Steve Krug is a usability consultant who has more than 30 years of
          experience as a user advocate for companies like Apple, Netscape, AOL,
          Lexus, and others. Based in part on the success of his first book,
          Don&#39;t Make Me Think, he has become a highly sought-after speaker
          on usability design.
        </p>

        <h3 className="mb-4 text-[15px] font-bold text-[#4c4c4c]">
          Other Books
        </h3>

        <div className="flex gap-4">
          <div className="h-[99px] w-[75px] rounded-[5px] border border-solid border-[#f1f1f1] bg-[url(/assets/imgframe-52.png)] bg-cover" />
          <div className="h-[99px] w-[75px] rounded-[5px] border border-solid border-[#f1f1f1] bg-[url(/assets/imgframe-53.png)] bg-cover" />
        </div>
      </CardContent>
    </Card>
  );
};
