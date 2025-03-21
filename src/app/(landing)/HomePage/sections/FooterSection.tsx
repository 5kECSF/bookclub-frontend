
export const FooterSection = (): JSX.Element => {
  // Company navigation links data
  const companyLinks = [
    "HOME",
    "ABOUT US",
    "BOOKS",
    "EBOOKS",
    "NEW RELEASE",
    "CONTACT US",
    "BLOG",
  ];

  // Latest news data
  const latestNews = [
    {
      image: "/assets/imgrectangle-22.png",
      title: "Nostrud exercitation",
      description:
        "Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: "15 April 2022",
    },
    {
      image: "/assets/imgrectangle-22-1.png",
      title: "Nostrud exercitation",
      description:
        "Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: "15 April 2022",
    },
  ];

  // Social media icons data
  const socialIcons = [
    "/assets/imgmask-group-2@2x.png",
    "/assets/imgmask-group-4@2x.png",
    "/assets/imgmask-group-3@2x.png",
    "/assets/imgmask-group-5@2x.png",
  ];

  return (
    <footer className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full py-16 px-36 bg-[#ffffff85] flex justify-center">
          <div className="w-full max-w-[1148px] relative">
            {/* Logo and company description */}
            <div className="flex flex-col">
              <img
                className="w-[83px] h-[87px] object-cover"
                alt="Sample logo"
                src="/assets/imgsample-logo-1.png"
              />
              <p className="mt-[95px] w-[368px] font-normal text-lg tracking-[0.36px] leading-[34px] text-[#173f5f] font-['Inter',Helvetica]">
                Nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>

              {/* Social Media Icons */}
              <div className="flex gap-[65px] mt-[45px]">
                {socialIcons.map((icon, index) => (
                  <img
                    key={index}
                    className="w-11 h-11"
                    alt={`Social media icon ${index + 1}`}
                    src={icon}
                  />
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div className="absolute -top-px left-[483px]">
              <h3 className="font-['Inter',Helvetica] font-semibold text-[#ed553b] text-2xl tracking-[0.48px]">
                COMPANY
              </h3>
              <div className="flex flex-col gap-[15px] mt-[67px]">
                {companyLinks.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="font-['Inter',Helvetica] font-semibold text-lg tracking-[0.06px] text-[#173f5f]"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Latest News */}
            <div className="absolute -top-px left-[775px]">
              <h3 className="font-['Inter',Helvetica] font-semibold text-[#ed553b] text-2xl tracking-[0.48px]">
                LATEST NEWS
              </h3>
              <div className="flex flex-col gap-[18px] mt-[68px]">
                {latestNews.map((news, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-[21px] w-[366px]"
                  >
                    <img
                      className="w-[100px] h-[100px] object-cover"
                      alt={`News thumbnail ${index + 1}`}
                      src={news.image}
                    />
                    <div className="w-[245px]">
                      <h4 className="font-['Inter',Helvetica] font-medium text-[#ed553b] text-lg">
                        {news.title}
                      </h4>
                      <div className="mt-[29px] flex flex-col gap-1.5">
                        <p className="font-['Inter',Helvetica] font-normal text-xs text-[#173f5f]">
                          {news.description.split(" ").slice(0, 7).join(" ")}
                        </p>
                        <p className="font-['Inter',Helvetica] font-normal text-xs text-[#173f5f]">
                          {news.description.split(" ").slice(7).join(" ")}
                        </p>
                      </div>
                      <div className="flex items-center gap-[11px] mt-[20px]">
                        <div className="w-1.5 h-1.5 bg-[#f6d55c] rounded-[3px]" />
                        <span className="font-['Inter',Helvetica] font-normal text-[#f6d55c] text-[10px] tracking-[0.55px]">
                          {news.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="absolute top-[371px] left-0 w-full flex justify-between font-['Inter',Helvetica] font-normal text-lg tracking-[0.06px] text-[#173f5f]">
              <span>© 2022 Arihant. All Rights Reserved.</span>
              <div>
                <span className="text-[#ed553b]">Privacy</span>
                <span> | Terms of Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
