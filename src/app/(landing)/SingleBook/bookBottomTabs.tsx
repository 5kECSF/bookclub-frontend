import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardContent } from "@/components/ui/card";
import { IBook } from "@/types/libraryTypes";
import { OverviewSection } from "./overviewSection";

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
          <TabButtons title="View book Instances" value="instances" />
          <TabButtons title="Lists" value="lists" />
          <TabButtons title="Related Books" value="related" />
        </TabsList>
      </div>

      <OverviewSection book={book} />
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


