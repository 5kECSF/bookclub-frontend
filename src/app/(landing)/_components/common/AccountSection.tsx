"use client";
import React, { JSX } from "react";
import { LogIn, ShieldHalf, SignpostBig, UserIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/state/context/jotai-auth";
import Link from "next/link";

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
          <AccountItem
            href="/account"
            name={"ACCOUNT"}
            children={<UserIcon className="h-3.5 w-4 text-[#393280]" />}
          />
          <Separator orientation="vertical" className="h-4 bg-[#d1d1d1]" />

          {user?.role === "ADMIN" && (
            <AccountItem
              href="/admin"
              name={"MANAGE"}
              children={<ShieldHalf className="h-3.5 w-4 text-[#393280]" />}
            />
          )}
        </>
      ) : (
        <>
          <AccountItem
            href="/login"
            name={"LOGIN"}
            children={<LogIn className="h-3.5 w-4 text-[#393280]" />}
          />

          <AccountItem
            href="/signup"
            name={"SIGNUP"}
            children={<SignpostBig className="h-3.5 w-4 text-[#393280]" />}
          />
        </>
      )}
    </div>
  );
};
