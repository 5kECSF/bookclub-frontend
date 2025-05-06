"use client";
import {
  BiHeart,
  BiLogoFacebook,
  BiLogoInstagramAlt,
  BiLogoLinkedin,
  BiLogoTwitter,
  BiUser,
} from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";

import Link from "next/link";
import BookSearchInput from "../search-input";
import MobileSidebar from "./mobile-sidebar";
import Nav from "./nav";

import { useAuth } from "@/lib/state/context/jotai-auth";
import { RiLoginCircleFill } from "react-icons/ri";

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white ">
      <div className=" flex h-[3rem] w-[full] items-center  justify-between  [background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)]">
        <div className="ml-6 flex">
          <div className="mr-2">
            <BsFillTelephoneFill className="text-white" />
          </div>
          <div
            className="relative text-lg font-semibold tracking-[0.02em]"
            style={{ color: "white" }}
          >
            +91 8374902234
          </div>
        </div>

        <div className="hidden gap-5 px-5 sm:flex ">
          <BiLogoFacebook className="text-white" />
          <BiLogoLinkedin className="text-white" />
          <BiLogoTwitter className="text-white" />
          <BiLogoInstagramAlt className="text-white" />
        </div>
      </div>
      <section className="flex  items-center justify-between bg-white px-8 py-4  ">
        <div className="  hidden sm:flex">
          <div className=" font-red-hat-display relative rounded-md px-2 text-left text-[2.25rem] text-blue-100 [background:linear-gradient(90deg,_#2979ff,_#4c589e)]">
            <div className="bg-silver-100 absolute left-[-10px] top-[-10px] z-[-100] mr-2 h-[60px] w-[60px] rounded-full" />
            <b className="text-white-100 flex items-center justify-center text-center text-[2rem] ">
              S
            </b>
          </div>
          <div className="ml-2 text-left text-[2.25rem] font-medium leading-[2.25rem]  text-blue-100 ">
            5kECSF
          </div>
        </div>
        <BookSearchInput />
        <MobileSidebar />

        <div className="hidden justify-end gap-1 lg:flex">
          {user ? (
            <>
              <div className="flex items-center  gap-1">
                <BiUser />
                <Link
                  className="right-[0rem] font-semibold uppercase tracking-[0.12em] text-black no-underline"
                  href="/dashboard/account"
                >
                  Account
                </Link>
              </div>
              <div className="bg-lightgray-100 h-[1rem] w-[0.06rem]" />
              <div className="flex items-center  gap-1">
                <BiHeart />
                <div className=" font-semibold uppercase tracking-[0.12em]">
                  Wishlist
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center  gap-1">
                <RiLoginCircleFill />
                <Link
                  className="right-[0rem] font-semibold uppercase tracking-[0.12em] text-black no-underline"
                  href="/auth/login"
                >
                  Login
                </Link>
              </div>
              <div className="ml-2 flex items-center  gap-1">
                <BiUser />
                <Link
                  className="right-[0rem] font-semibold uppercase tracking-[0.12em] text-black no-underline"
                  href="/auth/signup"
                >
                  Signup
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <Nav />
    </div>
  );
};

export default Header;
