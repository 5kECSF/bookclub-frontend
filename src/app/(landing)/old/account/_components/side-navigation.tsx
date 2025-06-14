"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";
import { BiDonateBlood, BiHomeAlt2 } from "react-icons/bi";
import { GiBookshelf } from "react-icons/gi";

export interface ISidebar {
  name: string;
  icon: IconType;
  href: string;
}

export const data: ISidebar[] = [
  {
    name: "Home",
    icon: BiHomeAlt2,
    href: "/account/account",
  },
  {
    name: "Search",
    icon: AiOutlineSearch,
    href: "/account/search",
  },
  {
    name: "My shelf",
    icon: GiBookshelf,
    href: "/account/shelf",
  },
  {
    name: "Contributte",
    icon: BiDonateBlood,
    href: "/account/contributte",
  },
];

export default function SideNavigation() {
  const pathname = usePathname();
  const activePage = (href: string): boolean => {
    if (pathname) return pathname === href || pathname.startsWith(href);
    return false;
  };
  console.log(activePage("/account/shelf"));
  return (
    <div className="bottom-10 left-10 top-10 hidden  w-[176px] flex-col rounded-l bg-white py-6 md:fixed md:flex ">
      <Image
        className=" object-contain px-10"
        src={"/Logo.png"}
        height={500}
        width={500}
        alt="logo"
      />
      <div className="mt-8 flex flex-col gap-3 pl-10">
        {data.map((value, i) => {
          return (
            <Link
              key={i}
              href={value.href}
              className="flex items-center gap-2 no-underline"
            >
              <value.icon
                className={` ${activePage(value.href) ? `text-black` : `text-gray-500`}`}
              />
              <h4
                className={`m-0 p-0 text-[14px] ${
                  activePage(value.href) ? `text-black` : `text-gray-500`
                }  font-Red_Hat_Display`}
              >
                {value.name}
              </h4>
            </Link>
          );
        })}
      </div>
      <div
        className={`text-gray-500 font-Red_Hat_Display mt-auto px-10  text-[9px]`}
      >
        <h4 className="m-0 p-0">About</h4>
        <h4 className="m-0 p-0">Support</h4>
        <h4 className="m-0 p-0">Term & Condition</h4>
      </div>
    </div>
  );
}
