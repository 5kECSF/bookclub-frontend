/* eslint-disable @next/next/no-img-element */
import { JSX } from "react";

import ReminderSection from "./ReminderSection";
import { PageWrper } from "../shelf/_components/page-wraper";

export default function MyShelf(): JSX.Element {
  return (
    <PageWrper title="Reminders">
      <ReminderSection />
    </PageWrper>
  );
}
