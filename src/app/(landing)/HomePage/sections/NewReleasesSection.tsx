import {
    HeartIcon,
    PhoneIcon,
    SearchIcon,
    ShoppingCartIcon,
    UserIcon,
  } from "lucide-react";
  import React, { type JSX } from "react";
  import { Input } from "@/components/ui/input";
  import { Separator } from "@/components/ui/separator";
  
  export const NewReleasesSection = (): JSX.Element => {
    // Navigation menu items data
    const navItems = [
      { name: "HOME", active: true },
      { name: "ABOUT US", active: false },
      { name: "BOOKS", active: false },
      { name: "NEW RELEASE", active: false },
      { name: "CONTACT US", active: false },
      { name: "BLOG", active: false },
    ];
  
    return (
      <header className="w-full">
        {/* Top blue bar with phone and social icons */}
        <div className="w-full h-14 bg-[#393280]">
          <div className="container mx-auto px-16 h-full flex justify-between items-center">
            {/* PhoneIcon number */}
            <div className="flex items-center">
              <PhoneIcon className="w-[15px] h-5 text-white" />
              <span className="ml-[21px] font-semibold text-white text-[22px] tracking-[0.44px]">
                +91 8374902234
              </span>
            </div>
  
            {/* Social media icons */}
            <img
              className="h-5"
              alt="Social media icons"
              src="/assets/imgsocial@2x.png"
            />
          </div>
        </div>
  
        {/* Main header with logo, search and account links */}
        <div className="container mx-auto px-16 py-5">
          <div className="flex items-center justify-between">
            {/* Logo section */}
            <div className="flex items-center gap-8">
              <div className="w-[86px] h-[86px] bg-[#c4c4c4] rounded-full" />
              <img
                className="w-52 h-[45px]"
                alt="Left logo"
                src="/assets/imgleft---logo.png"
              />
            </div>
  
            {/* SearchIcon bar */}
            <div className="relative w-[617px]">
              <Input
                className="h-[45px] bg-[#f6f6f6] rounded-[20px] pl-6 font-semibold text-[#bcbcbc] text-sm tracking-[1.68px]"
                placeholder="SearchIcon Books"
              />
              <SearchIcon className="absolute w-[18px] h-[18px] top-[13px] right-[25px] text-[#bcbcbc]" />
            </div>
  
            {/* Account, cart and wishlist */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <UserIcon className="w-3 h-[13px] text-[#393280]" />
                <span className="ml-[22px] font-semibold text-[#393280] text-sm tracking-[1.68px]">
                  ACCOUNT
                </span>
              </div>
  
              <Separator orientation="vertical" className="h-4 bg-[#d1d1d1]" />
  
              <div className="flex items-center">
                <ShoppingCartIcon className="w-[11px] h-[13px] text-[#393280]" />
                <span className="ml-[21px] font-semibold text-[#393280] text-sm tracking-[1.68px]">
                  CART:(0$)
                </span>
              </div>
  
              <Separator orientation="vertical" className="h-4 bg-[#d1d1d1]" />
  
              <div className="flex items-center">
                <HeartIcon className="w-4 h-3.5 text-[#393280]" />
                <span className="ml-[25px] font-semibold text-[#393280] text-sm tracking-[1.68px]">
                  WISHLIST
                </span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Separator line */}
        <div className="container mx-auto px-16">
          <Separator className="h-0.5 bg-[#e0e0e0]" />
        </div>
  
        {/* Navigation menu */}
        <nav className="container mx-auto px-16 py-4">
          <ul className="flex justify-center items-center gap-4 text-lg tracking-[0.39px]">
            {navItems.map((item, index) => (
              <React.Fragment key={item.name}>
                <li
                  className={`font-${item.active ? "extrabold" : "medium"} ${item.active ? "text-[#ed553b]" : "text-[#111111]"}`}
                >
                  {item.name}
                </li>
                {index < navItems.length - 1 && (
                  <li className="font-medium text-[#d1d1d1]">|</li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </header>
    );
  };
  