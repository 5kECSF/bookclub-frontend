import { Button } from "@/components/ui/button";
import { BookOpenIcon, GiftIcon, HomeIcon, SearchIcon } from "lucide-react";
import { JSX } from "react";

export const SideBar = (): JSX.Element => {
  // Navigation menu items data
  const navItems = [
    { icon: <HomeIcon size={23} />, label: "Home", active: false },
    { icon: <SearchIcon size={23} />, label: "Search", active: false },
    { icon: <BookOpenIcon size={20} />, label: "My Shelf", active: true },
    { icon: <GiftIcon size={21} />, label: "Contribute", active: false },
  ];

  // Footer links data
  const footerLinks = ["About", "Support", "Terms & Condition"];

  return (
    <nav className="flex h-screen  w-[306px] flex-col bg-white shadow-4">
      <div className="px-[68px] py-[38px]">
        {/* Logo */}
        <div className="mb-[100px] h-[74px] w-[120px]">
          <h1 className="text-xl font-bold">
            <span className="text-purple-600">My Book</span>
            <br />
            <span>Shelf</span>
          </h1>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col items-center gap-[34px]">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`flex h-auto w-full items-center justify-start gap-3 p-0 ${
                item.active ? "text-[#4c4c4c]" : "text-[#8a8a8a]"
              }`}
            >
              {item.icon}
              <span className="text-xl font-normal">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="sticky bottom-0 mt-auto px-[68px] pb-4">
        <div className="flex flex-col items-start gap-[15px]">
          {footerLinks.map((link, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-[15px] font-normal text-[#8a8a8a]"
            >
              {link}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
