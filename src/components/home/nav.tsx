"use client";
import { NavRoutes } from "@/lib/constants/routes";
import { useAuth } from "@/lib/state/context/jotai-auth";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const { user } = useAuth();
  const pathName = usePathname();
  if (pathName === "/books" || pathName?.startsWith("/books?"))
    return (
      <div className="flex items-center justify-center bg-slate-300/50 py-6 text-sm">
        <Link href={"/"}>HOME / BOOKS</Link>
      </div>
    );

  return (
    <div className="mx-auto hidden max-w-[1200px] justify-center border-t bg-white pb-8 pt-4 lg:flex">
      <section className="ml-4  hidden flex-row justify-center font-semibold lg:flex">
        <div className=" text-align-center flex  w-full items-center justify-center gap-6 text-[14px] tracking-[0.08em] ">
          {NavRoutes.map((route, i) => {
            return (
              <Link
                key={i}
                className={cn(
                  `${pathName === route.href ? `border-b` : null}`,
                  ` px-2`,
                )}
                href={route.href}
              >
                {route.name}
              </Link>
            );
          })}
          {user?.role === "ADMIN" && (
            <Link
              className="text-[14px] font-semibold  tracking-[0.08em]"
              href={"/admin"}
            >
              ADMIN
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
