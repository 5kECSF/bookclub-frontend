/* eslint-disable @next/next/no-img-element */
import { ScrollArea } from "@/components/ui/scroll-area";
import { JSX } from "react";
import BookListSection from "./BookListSection";
import ReminderSection from "./ReminderSection";

export default function MyShelf(): JSX.Element {
  return (
    <>
    <h1 className="text-[25px] font-bold m-6 ml-11">
        <span className="text-[#4c4c4c]">Your </span>
        <span className="text-[#ef8361]">Shelf</span>
        </h1>

    <ScrollArea className="w-full max-w-[1544px]  h-[calc(100vh-80px)] rounded-[10px]">
    <div className="relative w-full p-6">
        {/* Title */}
        
        {/* Book list section */}
        <BookListSection />

        {/* Reminder section */}
        <ReminderSection />
    </div>
    </ScrollArea>

    </>
    
  );
}
