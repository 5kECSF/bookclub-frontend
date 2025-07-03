"use client";
import { NavRoutes } from "@/lib/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const NavList = () => {
  const pathName = usePathname();
  return (
    <nav className="container mx-auto hidden justify-center px-[62px] py-4 lg:flex">
      <ul className="flex items-center justify-center gap-4 text-lg tracking-[0.39px]">
        {NavRoutes.map((link, index) => (
          <React.Fragment key={link.name}>
            <Link
              href={link.url}
              className={`font-medium ${pathName === link.url ? "border-b font-extrabold text-[#ed553b]" : "text-[#111111]"}`}
            >
              {link.name}
            </Link>
            {index < NavRoutes.length - 1 && (
              <li className="text-[#d1d1d1]">|</li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};
