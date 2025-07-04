"use client";
import CardDataStats from "@/components/admin/stats/CardDataStats";
import React from "react";
// import ChartOne from "../Charts/ChartOne";//will be used
// import ChartThree from "../Charts/ChartThree";//will be used
import TableOne from "@/components/admin/stats/TableOne";
import { Album, BookCopy, LibraryBig, Users } from "lucide-react";

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total Unique Books"
          total="$3.456K"
          rate="0.43%"
          levelUp
        >
          <BookCopy />
        </CardDataStats>
        <CardDataStats
          title="Total Books In Library"
          total="$45,2K"
          rate="4.35%"
          levelUp
        >
          <LibraryBig />
        </CardDataStats>
        <CardDataStats
          title="Total Borrowed"
          total="2.450"
          rate="2.59%"
          levelUp
        >
          <Album />
        </CardDataStats>
        <CardDataStats title="Total Users" total="3.456" rate="0.95%" levelDown>
          <Users />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne /> */}
        {/* <ChartTwo /> */}
        {/* <ChartThree /> */}
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default ECommerce;
