import { socialIcons } from "@/app/(landing)/_components/common/SocialIcons";
import { PhoneIcon } from "lucide-react";
export const TopBar = () => {
  return (
    <div className=" flex h-[3rem] w-[full] items-center  justify-between  [background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)]">
      <div className="ml-6 flex">
        <div className="mr-2">
          <PhoneIcon className="text-white" />
        </div>
        <div
          className="relative text-lg font-semibold tracking-[0.02em]"
          style={{ color: "white" }}
        >
          +251 8374902234
        </div>
      </div>

      <div className="hidden gap-5 px-5 sm:flex ">
        {socialIcons.map((social, index) => {
          const IconComponent = social.icon;
          return (
            <a key={index} href={social.url} aria-label={social.alt}>
              <IconComponent className="text-white" size={20} />
            </a>
          );
        })}
      </div>
    </div>
  );
};
