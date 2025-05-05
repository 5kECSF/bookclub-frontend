import logo from "../../public/assets/image/home/homeFooterLogo.png";

import Image from "next/image";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import Footer1 from "../../public/assets/image/home/footerImage1.png";
import Footer2 from "../../public/assets/image/home/footerImgae2.png";
export default function HomeFooter() {
  return (
    <footer className="border-t">
      <div className=" grid p-10 place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5  bg-white text-darkslateblue_100  items-start ">
        <div className="flex-col justify-start mx-0 ">
          <Image src={logo} alt="Vercel Logo" />

          <div className="max-w-[200px] ]">
            Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.{" "}
          </div>
          <div className="flex my-5 gap-10 ">
            <BsFacebook className="text-tomato text-29xl" />

            <BsInstagram className="text-tomato text-29xl" />
            <BsTwitter className="text-tomato text-29xl" />
            <BsYoutube className="text-tomato text-29xl" />
          </div>
        </div>
        <div className="h-[0.2px] w-full bg-tomato sm:hidden" />
        <div className="flex flex-col gap-y-2 text-lg">
          <b className=" text-tomato mb-5" style={{ fontSize: 32 }}>
            Company
          </b>
          <b>Home</b>
          <b>About Us</b>
          <b>Books</b>
          <b>New Releas</b>
          <b>Contact Us</b>
          <b>Blog</b>
        </div>
        <div className="h-[0.2px] w-full bg-tomato sm:hidden" />
        <div className="mr-5">
          <b className="text-tomato" style={{ fontSize: 32 }}>
            Latest news
          </b>
          <div className="flex">
            <Image className="p-2" src={Footer1} alt="Vercel Logo" priority />
            <div className="">
              <p style={{ color: "tomato", fontSize: 18 }}>
                Nostrud exercitation
              </p>
              <p style={{ fontSize: 15 }}>
                Nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.{" "}
              </p>
              <p style={{ fontSize: 9 }}>15 April 2022</p>
            </div>
          </div>

          <div className="flex">
            <Image className="p-3" src={Footer2} alt="Vercel Logo" priority />

            <div className="">
              <p style={{ color: "tomato", fontSize: 18 }}>
                Nostrud exercitation
              </p>
              <p style={{ fontSize: 15 }}>
                Nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.{" "}
              </p>
              <p style={{ fontSize: 9 }}>15 April 2022</p>
            </div>
          </div>
        </div>
        <div className="h-[0.2px] w-full bg-tomato sm:hidden" />
      </div>
      <div className="flex items-center justify-between text-sm mx-10 ">
        <p>© 2022 Arihant. All Rights Reserved.</p>
        <p> Privacy | Terms of Service</p>
      </div>
    </footer>
  );
}
