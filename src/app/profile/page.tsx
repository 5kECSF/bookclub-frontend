import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JSX } from "react";
import { BooksList, StatCards } from "./_components/BookListSection";
import { PageWrper } from "./_components/page-wraper";
function TabItem({ value, lable }: { value: string; lable: string }) {
  return (
    <TabsTrigger
      value={value}
      className="h-[33px] bg-transparent px-0 text-xl font-medium text-[#4c4c4c]  data-[state=active]:border-b-2 data-[state=active]:border-blue-700 data-[state=active]:bg-transparent  data-[state=active]:font-bold data-[state=active]:text-[#f4683c]"
    >
      {lable}
    </TabsTrigger>
  );
}
export default function MyShelf(): JSX.Element {
  return (
    <PageWrper title="shelf">
      <section className="mx-auto mt-4 flex w-full max-w-[1455px] flex-col gap-4 px-11">
        <StatCards />
        <Tabs defaultValue="favorite" className="mt-8 w-full">
          <TabsList className="mb-10 flex gap-[50px] bg-transparent p-0">
            <TabItem value="requested" lable="Requested Books" />
            <TabItem value="borrowed-books" lable="Borrowed Books" />
            <TabItem value="returned-books" lable="Read Books" />
            <TabItem value="donated-books" lable="Donated Books" />
          </TabsList>

          <div className="space-y-10">
            <BooksList value="requested" urlParam={{}} />
            <BooksList value="borrowed-books" urlParam={{}} />
            <BooksList value="returned-books" urlParam={{}} />
            <BooksList value="donated-books" urlParam={{}} />
          </div>
        </Tabs>
      </section>
    </PageWrper>
  );
}
