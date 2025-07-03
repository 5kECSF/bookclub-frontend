import { AccountSection } from "@/app/(landing)/_components/common/AccountSection";
import { NavList } from "@/app/(landing)/_components/common/NavList";
import MobileSidebar from "@/components/home/mobile-sidebar";
import { TopBar } from "@/components/home/topBar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { type JSX } from "react";
import { Search } from "./SearchBar";

export const HeaderSection = (): JSX.Element => {
  // Navigation links data

  return (
    <header className="w-full bg-transparent">
      {/* Top bar with phone and social icons */}
      <TopBar />
      {/* <TopBar2 /> */}

      {/* Main header with logo, search and account links */}
      <div className="container mx-auto py-5">
        <div className="md-gap-2 flex  flex-wrap items-center justify-between gap-4 p-2 lg:flex-nowrap  lg:gap-0">
          {/* Logo */}
          <div className="flex w-full items-center justify-between gap-4 lg:w-auto ">
            <Link href="/">
              <div className="flex items-center">
                <div className="relative h-20 w-20 rounded-md p-0 [background:linear-gradient(90deg,rgba(41,121,255,1)_0%,rgba(76,88,158,1)_100%)]">
                  <Image
                    src="/assets/logo/logo2.png"
                    alt="Logo"
                    className="rounded-md object-cover"
                    fill
                    priority
                  />
                </div>
                <div className="ml-2 text-4xl font-medium leading-9 text-blue-100">
                  BookClub
                </div>
              </div>
            </Link>

            <MobileSidebar />
          </div>

          {/* SearchIcon bar */}
          <Search />

          {/* Account, Cart, Wishlist */}
          <AccountSection />
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto px-[62px]">
        <Separator className="bg-[#e0e0e0]" />
      </div>

      {/*<Nav />*/}
      {/*Navigation menu */}
      <NavList />
    </header>
  );
};
