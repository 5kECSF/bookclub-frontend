import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  HeartIcon,
  PhoneIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";

import type { JSX } from "react";

export const HeaderSection = (): JSX.Element => {
  return (
    <header className="w-full">


      {/* Main navigation bar */}
      <div className="container px-5 py-5">
        <div className="flex items-center justify-between px-2">
          {/* Logo */}
          <div className="h-[86px] w-[86px] rounded-[43px] bg-[#c4c4c4]" />

          {/* SearchIcon bar */}
          <div className="relative mx-[113px] flex-1">
            <Input
              className="h-[45px] rounded-[20px] bg-[#f6f6f6] px-6 py-[13px] text-sm font-semibold tracking-[1.68px] text-[#bcbcbc]"
              placeholder="SearchIcon Books"
            />
            <SearchIcon className="absolute right-6 top-1/2 h-[18px] w-[18px] -translate-y-1/2 transform text-[#bcbcbc]" />
          </div>

          {/* Navigation links */}
          <div className="flex items-center gap-[17px]">
            {/* Account link */}
            <div className="flex items-center gap-2.5">
              <UserIcon className="h-[13px] w-3 text-[#393280]" />
              <span className="text-sm font-semibold tracking-[1.68px] text-[#393280]">
                ACCOUNT
              </span>
            </div>

            <Separator orientation="vertical" className="h-4 bg-[#d1d1d1]" />

            {/* Cart link */}
            <div className="flex items-center gap-[9px]">
              <ShoppingCartIcon className="h-[13px] w-[11.06px] text-[#393280]" />
              <span className="text-sm font-semibold tracking-[1.68px] text-[#393280]">
                CART:(0$)
              </span>
            </div>

            <Separator orientation="vertical" className="h-4 bg-[#d1d1d1]" />

            {/* Wishlist link */}
            <div className="flex items-center gap-2.5">
              <HeartIcon className="h-3.5 w-4 text-[#393280]" />
              <span className="text-sm font-semibold tracking-[1.68px] text-[#393280]">
                WISHLIST
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="container">
        <Separator className="h-0.5 bg-[#e0e0e0]" />
      </div>
    </header>
  );
};
