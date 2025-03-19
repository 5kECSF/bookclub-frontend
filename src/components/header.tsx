"use client";
import {
  BiHeart,
  BiLogoFacebook,
  BiLogoInstagramAlt,
  BiLogoLinkedin,
  BiLogoTwitter,
  BiUser
} from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";

import Link from "next/link";
import MobileSidebar from "./mobile-sidebar";
import Nav from "./nav";
import BookSearchInput from "./search-input";


import { useAuth } from "@/lib/state/context/jotai-auth";
import { RiLoginCircleFill } from 'react-icons/ri';


const Header = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white ">
      <div className=" flex items-center justify-between w-[full]  [background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)]  h-[3rem]">
        <div className="flex ml-6">
          <div className="mr-2">
            <BsFillTelephoneFill className="text-white" />
          </div>
          <div
            className="relative tracking-[0.02em] font-semibold text-lg"
            style={{ color: "white" }}
          >
            +91 8374902234
          </div>
        </div>

        <div className="gap-5 px-5 hidden sm:flex ">
          <BiLogoFacebook className="text-white" />
          <BiLogoLinkedin className="text-white" />
          <BiLogoTwitter className="text-white" />
          <BiLogoInstagramAlt className="text-white" />
        </div>
      </div>
      <section className="flex  py-4 px-8 items-center justify-between bg-white  ">
        <div className="  hidden sm:flex">
          <div className=" relative rounded-md [background:linear-gradient(90deg,_#2979ff,_#4c589e)] text-left text-[2.25rem] text-blue-100 font-red-hat-display px-2">
            <div className="absolute z-[-100] top-[-10px] left-[-10px] bg-silver-100 rounded-full w-[60px] h-[60px] mr-2" />
            <b className="text-[2rem] flex text-white-100 text-center items-center justify-center ">
              S
            </b>
          </div>
          <div className="leading-[2.25rem] font-medium text-left text-[2.25rem] text-blue-100  ml-2 ">
            5kECSF
          </div>
        </div>
        <BookSearchInput />
        <MobileSidebar />

        <div className="hidden lg:flex gap-1 justify-end">
          {
            user ? <>
              <div className="flex gap-1  items-center">
                <BiUser />
                <Link className="right-[0rem] tracking-[0.12em] uppercase font-semibold no-underline text-black" href="/dashboard/account">
                  Account
                </Link>
              </div>
              <div className="bg-lightgray-100 w-[0.06rem] h-[1rem]" />
              <div className="flex gap-1  items-center">
                <BiHeart />
                <div className=" tracking-[0.12em] uppercase font-semibold">
                  Wishlist
                </div>
              </div>
            </>
              :
              <>
                <div className="flex gap-1  items-center">
                  <RiLoginCircleFill />
                  <Link className="right-[0rem] tracking-[0.12em] uppercase font-semibold no-underline text-black" href="/auth/login">
                    Login
                  </Link>
                </div>
                <div className="flex ml-2 gap-1  items-center">
                  <BiUser />
                  <Link className="right-[0rem] tracking-[0.12em] uppercase font-semibold no-underline text-black" href="/auth/signup">
                    Signup
                  </Link>
                </div>
              </>

          }

        </div>
      </section>

      <Nav  />

    </div>
  );
};

export default Header;
