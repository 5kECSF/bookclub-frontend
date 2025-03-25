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
    href: "/dashboard/account",
  },
  {
    name: "Search",
    icon: AiOutlineSearch,
    href: "/dashboard/search",
  },
  {
    name: "My shelf",
    icon: GiBookshelf,
    href: "/dashboard/shelf",
  },
  {
    name: "Contributte",
    icon: BiDonateBlood,
    href: "/dashboard/contributte",
  },
];

export default function SideNavigation() {
  const pathname = usePathname();
  const activePage = (href: string): boolean => {
    if (pathname)
      return (pathname === href) || pathname.startsWith(href);
    return false
  }
  console.log(activePage('/dashboard/shelf'))
  return (
    <div className="hidden bg-white top-10 left-10  w-[176px] bottom-10 py-6 md:flex md:fixed flex-col rounded-l ">
      <Image className=" px-10 object-contain" src={"/Logo.png"} alt="logo" />
      <div className="flex flex-col gap-3 mt-8 pl-10">
        {data.map((value, i) => {
          return (
            <Link key={i}
              href={value.href}
              className="flex gap-2 items-center no-underline"
            >
              <value.icon className={` ${activePage(value.href) ? `text-black` : `text-gray-500`}`} />
              <h4
                className={`p-0 m-0 text-[14px] ${activePage(value.href) ? `text-black` : `text-gray-500`
                  }  font-Red_Hat_Display`}
              >
                {value.name}
              </h4>
            </Link>
          );
        })}
      </div>
      <div
        className={`mt-auto px-10 text-[9px] text-gray-500  font-Red_Hat_Display`}
      >
        <h4 className="p-0 m-0">About</h4>
        <h4 className="p-0 m-0">Support</h4>
        <h4 className="p-0 m-0">Term & Condition</h4>
      </div>
    </div>
  );
}
