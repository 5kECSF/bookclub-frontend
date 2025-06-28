import { AccountSection } from "@/app/(landing)/_components/common/AccountSection";
import { NavList } from "@/app/(landing)/_components/common/NavList";
import MobileSidebar from "@/components/home/mobile-sidebar";
import { TopBar } from "@/components/home/topBar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { type JSX } from "react";

export const HeaderSection = (): JSX.Element => {
  // Navigation links data

  return (
    <header className="w-full bg-transparent">
      {/* Top bar with phone and social icons */}
      <TopBar />
      {/*<TopBar2/>*/}

      {/* Main header with logo, search and account links */}
      <div className="container mx-auto py-5">
        <div className="md-gap-2 flex  flex-wrap items-center justify-between gap-4 p-2 lg:flex-nowrap  lg:gap-0">
          {/* Logo */}
          <div className="flex w-full items-center justify-between gap-4 lg:w-auto ">
            <div className="flex items-center">
              <div className="relative h-20 w-20 rounded-md p-0 [background:linear-gradient(90deg,rgba(41,121,255,1)_0%,rgba(76,88,158,1)_100%)]">
                {/*<div className="text-white-100 absolute -top-px left-0 h-10 w-10 text-center text-[32px] font-bold leading-9">*/}
                {/*  5k*/}
                {/*</div>*/}
                {/*<div className="relative  h-20 w-20">*/}
                <Image
                  src="/assets/logo/logo2.png"
                  alt="Logo"
                  className="rounded-md object-cover"
                  fill
                  priority
                />
                {/*</div>*/}
              </div>

              <div className="ml-2 text-4xl font-medium leading-9 text-blue-100">
                BookClub
              </div>
            </div>

            <MobileSidebar />
          </div>

          {/* SearchIcon bar */}
          <div className="relative w-full lg:w-1/2 ">
            <Input
              className="h-[45px] rounded-[20px] bg-[#f6f6f6] pl-6 text-sm  tracking-[1.68px]"
              placeholder="search books..."
            />
            <SearchIcon className="absolute right-[25px] top-[13px] h-[18px] w-[18px] text-[#bcbcbc]" />
          </div>

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
