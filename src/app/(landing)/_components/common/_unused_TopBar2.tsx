import {PhoneIcon} from "lucide-react";
import React from "react";

export const TopBar2 = () => {
    return (<div className="w-full h-14 bg-[#393280]">
        <div className="container mx-auto flex justify-between items-center h-full px-[62px]">
            <div className="flex items-center gap-2">
                <PhoneIcon className="w-[15px] h-5 text-white"/>
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
    </div>)
}