"use client";
import { BiHeart, BiUser } from "react-icons/bi";

import Link from "next/link";
import BookSearchInput from "../search-input";
import MobileSidebar from "./mobile-sidebar";
import Nav from "./nav";

import { useAuth } from "@/lib/state/context/jotai-auth";
import { RiLoginCircleFill } from "react-icons/ri";
import { TopBar } from "@/components/home/topBar";

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white ">
      <TopBar />

      <section className="flex  items-center justify-between bg-white px-8 py-4  ">
        <div className="  hidden sm:flex">
          <div className=" font-red-hat-display relative rounded-md px-2 text-left text-[2.25rem] text-blue-100 [background:linear-gradient(90deg,_#2979ff,_#4c589e)]">
            <div className="bg-silver-100 absolute left-[-10px] top-[-10px] z-[-100] mr-2 h-[60px] w-[60px] rounded-full" />
            <b className="text-white-100 flex items-center justify-center text-center text-[2rem] ">
              5
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
                  href="/(landing)/account/account"
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
