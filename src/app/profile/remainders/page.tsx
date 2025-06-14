/* eslint-disable @next/next/no-img-element */
import { JSX } from "react";

import ReminderSection from "../_components/ReminderSection";
import { PageWrper } from "../_components/page-wraper";


export default function MyShelf(): JSX.Element {
  return (
    <PageWrper title="Reminders">
      <ReminderSection />
    </PageWrper>
  );
}
