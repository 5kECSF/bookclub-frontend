import {
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    YoutubeIcon,
  } from "lucide-react";
  import React, { type JSX } from "react";
  
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
  
  export const FilterSection = (): JSX.Element => {
    return (
      <footer className="w-full bg-[#ed553b] py-16">
        <div className="container mx-auto max-w-[1155px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and description column */}
            <div className="flex flex-col gap-6">
              <img
                className="w-[83px] h-[87px] object-cover"
                alt="Sample logo"
                src="/assets/imgsample-logo-1@2x.png"
              />
              <p className="font-normal text-white text-lg tracking-[0.36px] leading-[34px]">
                Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </p>
  
              {/* Social media icons */}
              <div className="flex gap-6 mt-4">
                {socialIcons.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href="#"
                      className="w-11 h-11 bg-white rounded-full flex items-center justify-center"
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
              <h3 className="font-semibold text-white text-2xl tracking-[0.48px]">
                COMPANY
              </h3>
              <nav className="flex flex-col gap-[15px] mt-4">
                {companyLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="font-semibold text-white text-lg tracking-[0.36px] hover:underline"
                  >
                    {link.title}
                  </a>
                ))}
              </nav>
            </div>
  
            {/* Important links column */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-white text-2xl tracking-[0.48px]">
                IMPORTENT LINKS
              </h3>
              <nav className="flex flex-col gap-[15px] mt-4">
                {importantLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="font-semibold text-white text-lg tracking-[0.36px] hover:underline"
                  >
                    {link.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>
  
          {/* Footer bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-4 border-t border-white/20">
            <p className="font-normal text-white text-lg tracking-[0.36px]">
              © 2022 Arihant. All Rights Reserved.
            </p>
            <div className="font-bold text-white text-lg tracking-[0.36px]">
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
  