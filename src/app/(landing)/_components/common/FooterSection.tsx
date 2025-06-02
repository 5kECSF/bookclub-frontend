/* eslint-disable @next/next/no-img-element */
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { type JSX } from "react";

// Define data for navigation links to make the code more maintainable
const companyLinks = [
  { title: "HOME", href: "#" },
  { title: "ABOUT US", href: "#" },
  { title: "BOOKS", href: "#" },
  { title: "NEW RELEASE", href: "#" },
  { title: "CONTACT US", href: "#" },
  { title: "BLOG", href: "#" },
];

const importantLinks = [
  { title: "Privacy Policy", href: "#" },
  { title: "FAQs", href: "#" },
  { title: "Terms of Service", href: "#" },
];

const socialIcons = [
  { icon: FacebookIcon, alt: "Facebook" },
  { icon: TwitterIcon, alt: "Twitter" },
  { icon: LinkedinIcon, alt: "LinkedIn" },
  { icon: YoutubeIcon, alt: "YouTube" },
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
              alt="Sample logo"
              src="/assets/imgsample-logo-1@2x.png"
            />
            <p className="text-lg font-normal leading-[34px] tracking-[0.36px] text-white">
              Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>

            {/* Social media icons */}
            <div className="mt-4 flex gap-6">
              {socialIcons.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white"
                    aria-label={social.alt}
                  >
                    <IconComponent className="text-[#ed553b]" size={24} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company links column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold tracking-[0.48px] text-white">
              COMPANY
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
              IMPORTENT LINKS
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
            © 2022 Arihant. All Rights Reserved.
          </p>
          <div className="text-lg font-bold tracking-[0.36px] text-white">
            <a href="#" className="hover:underline">
              Privacy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
