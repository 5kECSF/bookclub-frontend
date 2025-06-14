"use client";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/lib/constants";
import { useAuth } from "@/lib/state/context/jotai-auth";
import { LogIn, ShieldHalf, SignpostBig } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";
import { UserContent } from "./user-dropdown";

function AccountItem({
  children,
  name,
  href,
}: {
  children: JSX.Element;
  name: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-2">
        {children}
        <span className="text-sm font-semibold tracking-[1.68px] text-[#393280]">
          {name}
        </span>
      </div>
    </Link>
  );
}

export const AccountSection = (): JSX.Element => {
  const { user, loggedIn } = useAuth();
  return (
    <div className="hidden  items-center gap-4 lg:flex">
      {user ? (
        <>
          <UserContent user={user} />

          <Separator orientation="vertical" className="h-4 bg-[#d1d1d1]" />

          {user?.role === "ADMIN" && (
            <AccountItem href="/admin" name={"MANAGE"}>
              <ShieldHalf className="h-3.5 w-4 text-[#393280]" />
            </AccountItem>
          )}
        </>
      ) : (
        <>
          <AccountItem href={`/${ROUTES.SignIn}`} name={"LOGIN"}>
            <LogIn className="h-3.5 w-4 text-[#393280]" />
          </AccountItem>

          <AccountItem href={`/${ROUTES.SignUp}`} name={"SIGNUP"}>
            <SignpostBig className="h-3.5 w-4 text-[#393280]" />
          </AccountItem>
        </>
      )}
    </div>
  );
};
