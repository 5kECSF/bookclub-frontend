import { ScrollArea } from "@/components/ui/scroll-area";
import { JSX } from "react";

export function PageWrper({
  children,
  title,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <>
      <h1 className="m-6 ml-11 text-[25px] font-bold">
        <span className="text-[#4c4c4c]">Your </span>
        <span className="text-[#ef8361]">{title}</span>
      </h1>

      <ScrollArea className="h-[calc(100vh-80px)] w-full  max-w-[1544px] rounded-[10px]">
        <div className="relative w-full p-6">{children}</div>
      </ScrollArea>
    </>
  );
}
