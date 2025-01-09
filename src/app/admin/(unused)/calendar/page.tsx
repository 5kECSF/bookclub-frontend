import Calendar from "@/components/Elements/Calender";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const CalendarPage = () => {
  return <Calendar />;
};

export default CalendarPage;
