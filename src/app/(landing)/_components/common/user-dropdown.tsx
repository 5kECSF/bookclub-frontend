"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarContent } from "@/components/ui_custom/avatar-user";
import { LogoutButton } from "@/components/ui_custom/logout-button";
import { User } from "@/lib/state/context/jotai-auth";
import Link from "next/link";

export function UserContent({ user }: { user: User | null }) {
  const logout = () => {
    console.log("logout clicked");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="">
          <AvatarContent user={user} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <Link href={"/profile"}>
          <DropdownMenuItem>My Shelf</DropdownMenuItem>
        </Link>
        <Link href={"/profile/remainders"}>
          <DropdownMenuItem>Remainders</DropdownMenuItem>
        </Link>
        <Link href={"/profile/settings"}>
          <DropdownMenuItem> Account</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <LogoutButton logout={logout} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
