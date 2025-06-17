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
import { User } from "@/types/user";
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
          <DropdownMenuItem>My Profile</DropdownMenuItem>
        </Link>
        <Link href={"/profile/shelf"}>
          <DropdownMenuItem> My Shelf</DropdownMenuItem>
        </Link>
        <Link href={"/profile/remainders"}>
          <DropdownMenuItem>Remainders</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <LogoutButton logout={logout} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
