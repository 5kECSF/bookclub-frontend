import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    HeartIcon,
    PhoneIcon,
    SearchIcon,
    ShoppingCartIcon,
    UserIcon,
} from "lucide-react";
import React, { type JSX } from "react";
import Link from "next/link";

  export const HeaderSection = (): JSX.Element => {
    // Navigation links data
    const navLinks = [
      { name: "HOME", active: true, url:"/HomePage" },
      { name: "BOOKS", active: false, url:"/ListingPage"  },
      { name: "SingleBook", active: false, url:"/SingleBook"  },
      { name: "NEW RELEASE", active: false , url:"/HomePage" },
      { name: "ABOUT US", active: false, url:"/HomePage"  },
      { name: "CONTACT US", active: false, url:"/HomePage"  },
    ];
  
    return (
      <header className="w-full bg-transparent">
        {/* Top bar with phone and social icons */}
        <div className="w-full h-14 bg-[#393280]">
          <div className="container mx-auto flex justify-between items-center h-full px-[62px]">
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-[15px] h-5 text-white" />
              <span className="text-white text-[22px] tracking-[0.44px] font-semibold">
                +91 8374902234
              </span>
            </div>
  
            <img
              className="h-5"
              alt="Social"
              src={"/assets/imgsocial.png"}
              width={500}
            />
          </div>
        </div>
  
        {/* Main header with logo, search and account links */}
        <div className="container mx-auto px-[62px] py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative w-10 h-10 rounded-md [background:linear-gradient(90deg,rgba(41,121,255,1)_0%,rgba(76,88,158,1)_100%)]">
                <div className="absolute w-10 h-10 -top-px left-0 font-bold text-white-100 text-[32px] text-center leading-9">
                  5k
                </div>
              </div>
              <div className="ml-2 font-medium text-blue-100 text-4xl leading-9">
                5kECSF
              </div>
            </div>
  
            {/* SearchIcon bar */}
            <div className="relative w-[617px]">
              <Input
                className="h-[45px] bg-[#f6f6f6] rounded-[20px] pl-6 font-semibold text-sm tracking-[1.68px]"
                placeholder="SearchIcon Books"
              />
              <SearchIcon className="absolute w-[18px] h-[18px] top-[13px] right-[25px] text-[#bcbcbc]" />
            </div>
  
            {/* Account, Cart, Wishlist */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <UserIcon className="w-3 h-[13px] text-[#393280]" />
                <span className="font-semibold text-[#393280] text-sm tracking-[1.68px]">
                  ACCOUNT
                </span>
              </div>
  
              <Separator orientation="vertical" className="h-4 bg-[#d1d1d1]" />
  
              {/*<div className="flex items-center gap-2">*/}
              {/*  <ShoppingCartIcon className="w-[11px] h-[13px] text-[#393280]" />*/}
              {/*  <span className="font-semibold text-[#393280] text-sm tracking-[1.68px]">*/}
              {/*    CART:(0$)*/}
              {/*  </span>*/}
              {/*</div>*/}
  
              {/*<Separator orientation="vertical" className="h-4 bg-[#d1d1d1]" />*/}
  
              <div className="flex items-center gap-2">
                <HeartIcon className="w-4 h-3.5 text-[#393280]" />
                <span className="font-semibold text-[#393280] text-sm tracking-[1.68px]">
                  WISHLIST
                </span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Divider */}
        <div className="container mx-auto px-[62px]">
          <Separator className="bg-[#e0e0e0]" />
        </div>
  
        {/* Navigation menu */}
        <nav className="container mx-auto px-[62px] py-4">
          <ul className="flex justify-center items-center gap-4 text-lg tracking-[0.39px]">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <Link
                    href={link.url}
                  className={`font-medium ${link.active ? "font-extrabold text-[#ed553b]" : "text-[#111111]"}`}
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
      </header>
    );
  };
  