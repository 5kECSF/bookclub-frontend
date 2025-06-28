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
import { UI_ROUTES } from "@/lib/constants/routes";
import { useAuth } from "@/lib/state/context/jotai-auth";
import { IUser } from "@/types/user";
import Link from "next/link";

export function UserContent({ user }: { user: IUser | null }) {
  const { logout } = useAuth();

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
        <Link href={UI_ROUTES.Profile}>
          <DropdownMenuItem>My Profile</DropdownMenuItem>
        </Link>
        <Link href={UI_ROUTES.MyShelf}>
          <DropdownMenuItem> My Shelf</DropdownMenuItem>
        </Link>
        <Link href={UI_ROUTES.Remainders}>
          <DropdownMenuItem>Remainders</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <LogoutButton logout={logout} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
