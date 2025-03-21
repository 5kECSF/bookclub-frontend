import {
    HeartIcon,
    PhoneIcon,
    SearchIcon,
    ShoppingCartIcon,
    UserIcon,
} from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { Separator } from "../../../../components/ui/separator";
  
  export const BookListSection = (): JSX.Element => {
    return (
      <header className="w-full">
        {/* Top bar with phone number and social icons */}
        <div className="w-full h-14 bg-[#393280]">
          <div className="container flex items-center justify-between h-full py-[15px]">
            <div className="flex items-center gap-1.5">
              <PhoneIcon className="w-[15px] h-5 text-white" />
              <span className="font-semibold text-white text-[22px] tracking-[0.44px]">
                +91 8374902234
              </span>
            </div>
  
            <div className="flex items-center">
              <img
                className="w-[244px] h-[20.04px]"
                alt="Social media icons"
                src="/assets/imgsocial@2x.png"
              />
            </div>
          </div>
        </div>
  
        {/* Main navigation bar */}
        <div className="container py-5 px-5">
          <div className="flex items-center justify-between px-5">
            {/* Logo */}
            <div className="w-[86px] h-[86px] bg-[#c4c4c4] rounded-[43px]" />
  
            {/* SearchIcon bar */}
            <div className="relative flex-1 mx-[113px]">
              <Input
                className="h-[45px] px-6 py-[13px] bg-[#f6f6f6] rounded-[20px] font-semibold text-[#bcbcbc] text-sm tracking-[1.68px]"
                placeholder="SearchIcon Books"
              />
              <SearchIcon className="absolute right-6 top-1/2 transform -translate-y-1/2 w-[18px] h-[18px] text-[#bcbcbc]" />
            </div>
  
            {/* Navigation links */}
            <div className="flex items-center gap-[17px]">
              {/* Account link */}
              <div className="flex items-center gap-2.5">
                <UserIcon className="w-3 h-[13px] text-[#393280]" />
                <span className="font-semibold text-[#393280] text-sm tracking-[1.68px]">
                  ACCOUNT
                </span>
              </div>
  
              <Separator orientation="vertical" className="h-4 bg-[#d1d1d1]" />
  
              {/* Cart link */}
              <div className="flex items-center gap-[9px]">
                <ShoppingCartIcon className="w-[11.06px] h-[13px] text-[#393280]" />
                <span className="font-semibold text-[#393280] text-sm tracking-[1.68px]">
                  CART:(0$)
                </span>
              </div>
  
              <Separator orientation="vertical" className="h-4 bg-[#d1d1d1]" />
  
              {/* Wishlist link */}
              <div className="flex items-center gap-2.5">
                <HeartIcon className="w-4 h-3.5 text-[#393280]" />
                <span className="font-semibold text-[#393280] text-sm tracking-[1.68px]">
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
  