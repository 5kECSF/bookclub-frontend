"use client";
import CardDataStats from "@/components/admin/stats/CardDataStats";
import React from "react";
// import ChartOne from "../Charts/ChartOne";//will be used
// import ChartThree from "../Charts/ChartThree";//will be used
import TableOne from "@/components/admin/stats/TableOne";
import { Resp } from "@/lib/constants/return.const";
import { KY, UI_ROUTES } from "@/lib/constants/routes";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { IUser } from "@/types/user";
import { Album, BookCopy, LibraryBig, Users } from "lucide-react";
interface LibraryStats {
  totalBooks: number;
  totalDonations: number;
  totalUsers: number;
  activeBorrows: number;
}

const ECommerce: React.FC = () => {
  const { data } = useFetch<LibraryStats>([KY.Stats], `${KY.Stats}`);
  const { data: usersData } = useFetch<Resp<IUser[]>>(
    [KY.Stats, "donors"],
    `${KY.Stats}/donors`,
    {
      sort: "donatedCount",
      _sortDir: "desc",
    },
  );
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total Unique Books"
          total={`${data?.totalBooks}`}
          path={UI_ROUTES.ManageBooks}
          levelUp
        >
          <BookCopy />
        </CardDataStats>
        <CardDataStats
          title="Total Books In Library"
          total={`${data?.totalDonations}`}
          path={UI_ROUTES.ManageDonations}
          levelUp
        >
          <LibraryBig />
        </CardDataStats>
        <CardDataStats
          title="Total Borrowed"
          total={`${data?.activeBorrows}`}
          path={UI_ROUTES.ManageBorrow}
          levelUp
        >
          <Album />
        </CardDataStats>
        <CardDataStats
          title="Total Users"
          total={`${data?.totalUsers}`}
          path={UI_ROUTES.ManageUsers}
          levelDown
        >
          <Users />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne /> */}
        {/* <ChartTwo /> */}
        {/* <ChartThree /> */}
        <div className="col-span-12 xl:col-span-8">
          <TableOne users={usersData?.body || []} />
        </div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default ECommerce;
