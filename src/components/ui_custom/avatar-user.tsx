"use client";

import { ChevronsUpDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";

export function AvatarContent({ user }: { user: User | null }) {
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={user?.avatar} alt={user?.firstName} />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">
          {user?.firstName + "" + user?.lastName}
        </span>
        <span className="truncate text-xs">{user?.email}</span>
      </div>
      <ChevronsUpDown className="ml-auto size-4" />
    </>
  );
}
