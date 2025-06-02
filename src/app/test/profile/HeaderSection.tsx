import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
    Barcode,
    ChevronDown,
    Search
} from "lucide-react";
import { JSX } from "react";

export default function HeaderSection(): JSX.Element {
  return (
    <header className="w-full py-8 flex items-center justify-between shadow-4  gap-4">
      {/* Search Bar */}
      <div className="mx-4 flex-1 max-w-[543px]">
        <div className="relative flex items-center w-full h-[49px] bg-white rounded-[40px] shadow-[0px_0px_4px_#00000040]">
          <div className="h-full">
            <Select>
              <SelectTrigger className="w-[102px] h-[49px] bg-[#f7f7fa] rounded-[40px_0px_0px_40px] border-0 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="All" />
                <ChevronDown className="h-3 w-3 opacity-50" />
              </SelectTrigger>
            </Select>
          </div>

          <Input
            className="flex-1 h-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 [font-family:'Inter-Regular',Helvetica] text-xl placeholder:text-[#c6c6c6]"
            placeholder="Search"
          />

          <div className="flex items-center pr-3 gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-5 w-5 text-gray-500" />
            </Button>

            <Separator orientation="vertical" className="h-[33px]" />

            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Barcode className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>

      {/* Language Selector */}
      {/* <div className="h-[47px]">
        <Button
          variant="outline"
          className="h-[47px] px-6 rounded-[33px] shadow-[0px_0px_4px_#00000040] [font-family:'Inter-Regular',Helvetica] text-xl text-[#4c4c4c]"
        >
          <Languages className="mr-2 h-5 w-5" />
          Lang
          <ChevronDown className="ml-2 h-3 w-3" />
        </Button>
      </div> */}

      {/* Time and Date */}
      {/* <div className="h-[46px] flex items-center bg-white rounded-[40px] shadow-[0px_0px_4px_#00000040] px-6 gap-10">
        <div className="flex items-center gap-1.5">
          <Clock className="h-[19px] w-[19px] text-[#4c4c4c]" />
          <span className="[font-family:'Digital_Numbers-Regular',Helvetica] font-normal text-[#4c4c4c] text-[15px] tracking-[-0.68px]">
            09:00 hrs
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Calendar className="h-[19px] w-[19px] text-[#4c4c4c]" />
          <span className="[font-family:'Digital_Numbers-Regular',Helvetica] font-normal text-[#4c4c4c] text-[15px] tracking-[-0.68px]">
            4-Mar-2023
          </span>
        </div>
      </div> */}

      {/* User Profile */}
      <div className="h-[50px]">
        <Button
          variant="outline"
          className="h-[50px] pl-[3px] pr-4 rounded-[33px] shadow-[0px_0px_4px_#00000040] flex items-center gap-3"
        >
          <Avatar className="h-[45px] w-[45px]">
            <AvatarImage src="/default.png" alt="User" />
            <AvatarFallback>K</AvatarFallback>
          </Avatar>

          <span className="[font-family:'Inter-Regular',Helvetica] font-normal text-[#4c4c4c] text-xl">
            Kenson
          </span>
          <ChevronDown className="h-3 w-3 text-[#4c4c4c]" />
        </Button>
      </div>
    </header>
  );
}
