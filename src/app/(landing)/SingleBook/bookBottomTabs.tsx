import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardContent } from "@/components/ui/card";
import { IBook } from "@/types/libraryTypes";
import { RelatedBooksSection } from "./bottomTab/author-content";
import { OverviewSection } from "./bottomTab/overviewSection";
// Book details data

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
export const BottomTabsSection = ({ book }: any) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <div className="border-b border-[#dddddd]">
        <TabsList className="h-10 bg-transparent">
          <TabButtons title="Overview" value="overview" />
          <TabButtons title="Description" value="description" />
          <TabButtons title="Related Books" value="related" />
        </TabsList>
      </div>

      <OverviewSection book={book} />
      <Description book={book} />
      <RelatedBooksSection book={book} />
    </Tabs>
  );
};
//

export const Description = ({ book }: { book: IBook }) => {
  return (
    <TabsContent value="description" className="mt-6">
      <div className="flex items-start gap-[50px] py-2.5">
        <Metadata title="Publish Date" value={String(book.publishDate)} />
        <Metadata title="Category" value={book.categoryName} />
        <Metadata title="Language" value={book?.language || ""} />
        <Metadata title="Pages" value={String(book?.page)} />
      </div>

      {/* Preview language */}
      <div className="mt-6">
        <div className="text-xs">
          {/* <span className="font-semibold text-[#666666]">
            Previews available in:{" "}
          </span>
          <span className="font-semibold text-[#f27851] underline">
            English
          </span> */}
        </div>
      </div>

      <div className="flex gap-4">{book.desc}</div>
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
