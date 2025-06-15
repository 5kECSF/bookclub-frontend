"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KY } from "@/lib/constants";
import { getQueryFromUrl, setUrl } from "@/lib/functions/url";
import { useAuth } from "@/lib/state/context/jotai-auth";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { JSX, useEffect, useState } from "react";
import { BooksList } from "./_components/BookListSection";
import { PageWrper } from "./_components/page-wraper";
import { StatCards } from "./_components/statCards";
function TabItem({
  value,
  lable,
  onClick,
}: {
  value: string;
  lable: string;
  onClick?: any;
}) {
  return (
    <TabsTrigger
      value={value}
      onClick={onClick}
      className="h-[33px] bg-transparent px-0 text-xl font-medium text-[#4c4c4c]  data-[state=active]:border-b-2 data-[state=active]:border-blue-700 data-[state=active]:bg-transparent  data-[state=active]:font-bold data-[state=active]:text-[#f4683c]"
    >
      {lable}
    </TabsTrigger>
  );
}
export default function MyShelf(): JSX.Element {
  const { user } = useAuth();
  const [query, setQuery] = useState<Record<string, any>>(
    getQueryFromUrl({ status: "WAITLIST" }),
  );
  const setPage = (page: number) => {
    setQuery({ ...query, page });
  };
  const { isLoading, data } = useFetch(
    [KY.borrow, JSON.stringify(query), `${user?._id}`],
    `${KY.borrow}`,
    { ...query, userId: `${user?._id}` },
  );
  useEffect(() => {
    setUrl(query);
  }, [query]);

  const { isLoading: donationsLoading, data: donationData } = useFetch(
    [KY.donation, `${user?._id}`],
    `${KY.donation}`,
    { donorId: user?._id },
  );
  return (
    <PageWrper title="shelf">
      <section className="mx-auto mt-4 flex w-full max-w-[1455px] flex-col gap-4 px-11">
        <StatCards />
        <Tabs defaultValue="WAITLIST" className="mt-8 w-full">
          <TabsList className="mb-10 flex gap-[50px] bg-transparent p-0">
            <TabItem
              onClick={() => setQuery({ ...query, status: "WAITLIST" })}
              value="WAITLIST"
              lable="Requested Books"
            />
            <TabItem
              onClick={() => setQuery({ ...query, status: "BORROWED" })}
              value="BORROWED"
              lable="Borrowed Books"
            />
            <TabItem
              onClick={() => setQuery({ ...query, status: "RETURNED" })}
              value="RETURNED"
              lable="Read Books"
            />
            <TabItem value="donated-books" lable="Donated Books" />
          </TabsList>

          <div className="space-y-10">
            <BooksList
              value="WAITLIST"
              data={data}
              query={query}
              setPage={setPage}
            />
            <BooksList
              value="BORROWED"
              data={data}
              query={query}
              setPage={setPage}
            />
            <BooksList
              value="RETURNED"
              data={data}
              query={query}
              setPage={setPage}
            />
            <BooksList
              data={donationData}
              value="donated-books"
              query={{}}
              setPage={() => {}}
            />
          </div>
        </Tabs>
      </section>
    </PageWrper>
  );
}
