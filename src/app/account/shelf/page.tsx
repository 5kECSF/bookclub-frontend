"use client";
import { borrowStatus } from "@/app/admin/borrow/model-def";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KY } from "@/lib/constants/routes";
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
const tabList = [
  { status: borrowStatus.WaitList, lable: "Requested Books" },
  { status: borrowStatus.Accepted, lable: "Accepted Requests" },
  { status: borrowStatus.Borrowed, lable: "Borrowed Books" },
  { status: borrowStatus.Returned, lable: "Read Books" },
];
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
        {/* Stat Cards */}
        <StatCards />
        {/* ===========   Bottom Tab itmes */}
        <Tabs defaultValue={borrowStatus.WaitList} className="mt-8 w-full">
          <TabsList className="mb-10 flex gap-[50px]  border-b-zinc-400 bg-transparent p-0 px-0 pb-4">
            {tabList.map((tabItem) => (
              <TabItem
                key={tabItem.status}
                onClick={() => setQuery({ ...query, status: tabItem.status })}
                value={tabItem.status}
                lable={tabItem.lable}
              />
            ))}

            <TabItem value={borrowStatus.Donation} lable="Donated Books" />
          </TabsList>

          <div className="space-y-10">
            <BooksList
              value={borrowStatus.WaitList}
              data={data}
              query={query}
              setPage={setPage}
            />
            <BooksList
              value={borrowStatus.Accepted}
              data={data}
              query={query}
              setPage={setPage}
            />
            <BooksList
              value={borrowStatus.Borrowed}
              data={data}
              query={query}
              setPage={setPage}
            />
            <BooksList
              value={borrowStatus.Returned}
              data={data}
              query={query}
              setPage={setPage}
            />
            <BooksList
              data={donationData}
              value={borrowStatus.Donation}
              query={{}}
              setPage={() => {}}
            />
          </div>
        </Tabs>
      </section>
    </PageWrper>
  );
}
