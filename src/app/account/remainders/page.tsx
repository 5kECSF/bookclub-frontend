"use client";
/* eslint-disable @next/next/no-img-element */
import { JSX } from "react";

import { useAuth } from "@/lib/state/context/jotai-auth";
import { PageWrper } from "../shelf/_components/page-wraper";
import { Notifications, Overdue, RequestedBooks } from "./ReminderSection";

export default function MyShelf(): JSX.Element {
  const { user } = useAuth();
  return (
    <PageWrper title="Reminders">
      <section className="w-full py-8">
        <h2 className="mb-6 font-['Inter-SemiBold',Helvetica] text-[25px] font-semibold text-[#4c4c4c]">
          Remainders
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {/* Latest Updates Card */}
          <Notifications user={user} />

          {/* OverDue Books Card */}
          <Overdue user={user} />

          {/* Requested Books Card */}
          <RequestedBooks user={user} />
        </div>
        <div className="m-4 p-4"></div>
      </section>
    </PageWrper>
  );
}
