"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function LogoutButton({ logout }: { logout: () => void }) {
  return (
    <DropdownMenuItem>
      <Button onClick={logout} variant="ghost">
        <LogOut />
        Log out
      </Button>
    </DropdownMenuItem>
  );
}
