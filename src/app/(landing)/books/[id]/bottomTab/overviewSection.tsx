import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";

import { Card, CardContent } from "@/components/ui/card";
import { IBook } from "@/types/libraryTypes";
import { AuthorDetails } from "./author-content";

export const OverviewSection = ({ book }: { book: IBook }) => (
  <TabsContent value="overview" className="mt-6">
    {/* Book metadata cards */}

    {/* Book description */}
    <div className="mt-4 w-full">
      <div className="text-[13px] leading-[19.5px] text-[#333333]">
        {book.desc}
        <div className="text-[#f27851]">Read more</div>
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
              Published On:
            </h3>
            <div className="text-xs font-semibold leading-[19.5px] text-[#4c4c4c]">
              {book.publishDate}
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
                {book.categoryName}
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
              About
            </h3>
            <div className="grid grid-cols-[120px_1fr] gap-y-2">
              <div className="text-[11px] font-semibold text-[#666666]">
                Author
              </div>
              <div className="text-[11px] font-semibold text-[#333333]">
                {book.authorName}
              </div>
              <div className="text-[11px] font-semibold text-[#666666]">
                Number of pages
              </div>
              <div className="text-xs font-semibold text-[#333333]">
                {book.page}
              </div>
            </div>
          </div>

          {/* ID Numbers */}
          <div>
            <h3 className="mb-3 text-[12.8px] font-semibold text-[#666666]">
              Shelf Stats
            </h3>
            <div className="grid grid-cols-[120px_1fr] gap-y-2">
              <div className="text-[11px] font-semibold text-[#666666]">
                Total Books
              </div>
              <div className="text-[11px] font-semibold text-[#333333]">
                {book.instanceCnt}
              </div>
              <div className="text-[11px] font-semibold text-[#666666]">
                Currently Available
              </div>
              <div className="text-xs font-semibold text-[#333333]">
                {book.availableCnt}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6">
        {/* About Author section */}
        <AuthorDetails book={book} />

        {/* Community Reviews section */}
        {/* <CommunityReview/> */}
      </div>
    </div>
  </TabsContent>
);
