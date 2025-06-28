import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";

import { Card, CardContent } from "@/components/ui/card";
import { IBook } from "@/types/libraryTypes";
import { AuthorDetails } from "./author-content";
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
};
// Community reviews data
// const bookInfo = {
//   title: "Don't Make Me Think",
//   author: "Steve Krug",
//   year: "2000",
//   edition: "Second Edition",
//   rating: "5.0",
//   currentlyReading: "25",
//   haveRead: "119",
//   publishDate: "2000",
//   publisher: "New Riders Press",
//   language: "English",
//   pages: "216",
//   location: "CS A-15",
// };
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
export const OverviewSection = ({ book }: { book: IBook }) => (
  <TabsContent value="overview" className="mt-6">
    {/* Book metadata cards */}
    <div className="flex items-start gap-[50px] py-2.5">
      <Metadata title="Publish Date" value={String(book.publishDate)} />
      <Metadata title="Category" value={book.categoryName} />
      <Metadata title="Language" value={book?.language || ""} />
      <Metadata title="Pages" value={String(book?.page)} />
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
        {book.body}
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
                {book.genres &&
                  book.genres.map((tag: string, tagIndex: number) => (
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
