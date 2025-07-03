/* eslint-disable @next/next/no-img-element */
import { UI_ROUTES } from "@/lib/constants/routes";
import { type JSX } from "react";
import { SocialMediaIcons } from "./SocialIcons";

// Define data for navigation links to make the code more maintainable
const companyLinks = [
  { title: "HOME", href: "/" },
  { title: "NEW ARRIVAL", href: "/#newArrival" },
  { title: "Featured", href: "/#featured" },
  { title: "BOOKS", href: "/books" },
  { title: "CONTACT US", href: "/#contact-us" },
  // { title: "BLOG", href: "#" },
];

const importantLinks = [
  { title: "My Profile", href: UI_ROUTES.Profile },
  { title: "My Shelf", href: UI_ROUTES.MyShelf },
  { title: "My Remainders", href: UI_ROUTES.Remainders },
];

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="w-full bg-[#ed553b] py-16">
      <div className="container mx-auto max-w-[1155px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo and description column */}
          <div className="flex flex-col gap-6">
            <img
              className="h-[87px] w-[83px] object-cover"
              alt="Book club logo"
              src="/assets/logo/logo2.png"
            />
            <p className="text-lg font-normal leading-[34px] tracking-[0.36px] text-white">
              Follow us on Different social media.
            </p>

            {/* Social media icons */}
            <SocialMediaIcons />
          </div>

          {/* Company links column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold tracking-[0.48px] text-white">
              Navigate
            </h3>
            <nav className="mt-4 flex flex-col gap-[15px]">
              {companyLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-lg font-semibold tracking-[0.36px] text-white hover:underline"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Important links column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold tracking-[0.48px] text-white">
              ACCOUNT LINKS
            </h3>
            <nav className="mt-4 flex flex-col gap-[15px]">
              {importantLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-lg font-semibold tracking-[0.36px] text-white hover:underline"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/20 pt-4 md:flex-row">
          <p className="text-lg font-normal tracking-[0.36px] text-white">
            © {new Date().getFullYear()} 5kilo Fellowship Bookclub.
          </p>
          <div className="text-lg font-bold tracking-[0.36px] text-white">
            {/* <a href="#" className="hover:underline">
              Privacy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:underline">
              Terms of Service
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};
