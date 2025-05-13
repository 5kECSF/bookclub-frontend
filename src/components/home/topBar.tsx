import {BsFillTelephoneFill} from "react-icons/bs";
import {BiLogoFacebook, BiLogoInstagramAlt, BiLogoLinkedin, BiLogoTwitter} from "react-icons/bi";

export const TopBar = () => {
    return (
        <div
            className=" flex h-[3rem] w-[full] items-center  justify-between  [background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)]">
            <div className="ml-6 flex">
                <div className="mr-2">
                    <BsFillTelephoneFill className="text-white"/>
                </div>
                <div
                    className="relative text-lg font-semibold tracking-[0.02em]"
                    style={{color: "white"}}
                >
                    +91 8374902234
                </div>
            </div>

            <div className="hidden gap-5 px-5 sm:flex ">
                <BiLogoFacebook className="text-white"/>
                <BiLogoLinkedin className="text-white"/>
                <BiLogoTwitter className="text-white"/>
                <BiLogoInstagramAlt className="text-white"/>
            </div>
        </div>
    )
}