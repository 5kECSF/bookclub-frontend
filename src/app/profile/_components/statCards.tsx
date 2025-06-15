"use client";
/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/state/depricated/auth.context";
import { BookIcon, GiftIcon } from "lucide-react";
import { JSX } from "react";

const statsCards = [
  {
    id: "readings",
    icon: <BookIcon className="h-[29px] w-[29px]" />,
    value: "120",
    label: "Readings",
    bgColor: "bg-[#f27851]",
  },
  {
    id: "contribution",
    icon: <GiftIcon className="h-[21px] w-[21px]" />,
    value: "10",
    label: "Contribution",
    bgColor: "bg-[#926cff]",
  },
  {
    id: "contribution",
    icon: <GiftIcon className="h-[21px] w-[21px]" />,
    value: "10",
    label: "Contribution",
    bgColor: "bg-[#2A7B9B]",
  },
];
export function StatCards() {
  const { user } = useAuth();
  return (
    <div className="flex gap-6">
      <StatCard card={{ ...statsCards[0], value: String(1) }} />
      <StatCard card={{ ...statsCards[1], value: String(1) }} />
      <StatCard card={{ ...statsCards[2], value: String(1) }} />
    </div>
  );
}
interface cardProps {
  id: string;
  icon: JSX.Element;
  value: string;
  label: String;
  bgColor: String;
}
export function StatCard({ card }: { card: cardProps }) {
  return (
    <Card
      className={`${card.bgColor} relative h-[149px] w-[175px] rounded-[10px] border-none`}
    >
      <CardContent className="p-0">
        <div className="absolute left-[15px] top-[21px] flex h-12 w-[54px] items-center justify-center rounded-[10px] bg-white">
          {card.icon}
        </div>
        <div className="absolute left-[92px] top-6 w-[63px] text-[32px] font-medium leading-[36.0px] tracking-[0] text-white [font-family:'Inter-Medium',Helvetica]">
          {card.value}
        </div>
        <div className="absolute left-[21px] top-[94px] text-[25px] font-medium leading-[28.1px] tracking-[0] text-white [font-family:'Inter-Medium',Helvetica]">
          {card.label}
        </div>
      </CardContent>
    </Card>
  );
}
