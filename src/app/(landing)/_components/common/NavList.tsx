"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

export const navLinks = [
  { name: "HOME", active: true, url: "/" },
  { name: "BOOKS", active: false, url: "/books" },
  { name: "SingleBook", active: false, url: "/SingleBook" },
  { name: "NEW RELEASE", active: false, url: "/#new-release" },
  { name: "ABOUT US", active: false, url: "/#about" },
  { name: "CONTACT US", active: false, url: "/#contact-us" },
];
export const NavList = () => {
  const pathName = usePathname();
  return (
    <nav className="container mx-auto hidden justify-center px-[62px] py-4 lg:flex">
      <ul className="flex items-center justify-center gap-4 text-lg tracking-[0.39px]">
        {navLinks.map((link, index) => (
          <React.Fragment key={link.name}>
            <Link
              href={link.url}
              className={`font-medium ${pathName === link.url ? "border-b font-extrabold text-[#ed553b]" : "text-[#111111]"}`}
            >
              {link.name}
            </Link>
            {index < navLinks.length - 1 && (
              <li className="text-[#d1d1d1]">|</li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};
