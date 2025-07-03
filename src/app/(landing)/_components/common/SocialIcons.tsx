import { FacebookIcon, Instagram, Send, YoutubeIcon } from "lucide-react";

export function SocialMediaIcons() {
  return (
    <div className="mt-4 flex gap-6">
      {socialIcons.map((social, index) => {
        const IconComponent = social.icon;
        return (
          <a
            key={index}
            href={social.url}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white"
            aria-label={social.alt}
          >
            <IconComponent className="text-[#ed553b]" size={24} />
          </a>
        );
      })}
    </div>
  );
}
export const socialIcons = [
  {
    icon: Instagram,
    alt: "Instagram",
    url: "https://www.instagram.com/5kilofellowship/",
  },
  { icon: FacebookIcon, alt: "Facebook", url: "" },
  { icon: Send, alt: "Telegram", url: "https://t.me/myfellow" },
  {
    icon: YoutubeIcon,
    alt: "YouTube",
    url: "https://www.youtube.com/@5kiloevangelicalchristians237",
  },
];
