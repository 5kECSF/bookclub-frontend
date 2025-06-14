"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillCaretDown, AiOutlineArrowLeft } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/state/context/jotai-auth";
// import { Dropdown, MenuProps } from "antd";
import MobileSidebar from "./mobile-side-navigation";

export default function Top({}) {
  const [input, setInput] = useState("");

  const { logout, user } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  // const items: MenuProps["items"] = [
  //   {
  //     key: "1",
  //     label: (
  //       <li
  //         onClick={() => {
  //           handleLogout;
  //         }}
  //       >
  //         Logout
  //       </li>
  //     ),
  //   },
  // ];

  const router = useRouter();
  return (
    <section className="mx-6  mt-5   flex grid-cols-1 justify-between  gap-3 sm:mx-11">
      <Button
        className="hidden bg-white font-normal md:flex"
        onClick={() => router.push("/")}
        variant={"outline"}
      >
        <AiOutlineArrowLeft className="mr-2 " />
        Back to home
      </Button>
      <Button
        className="flex bg-white md:hidden"
        onClick={() => router.push("/")}
        variant={"outline"}
      >
        <AiOutlineArrowLeft className="mr-2" />
      </Button>

      <div className="block ">
        <div className="relative flex items-center ">
          <span className="border-gray-300 absolute left-4 flex h-6 items-center border-r pr-3">
            <Search />
          </span>
          <Input
            data-test="search-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="search"
            className=" border-gray-100 w-full rounded-xl border bg-white py-2.5 pl-14 pr-4 text-sm outline-none placeholder:text-black"
          />
        </div>
      </div>
      <MobileSidebar />
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <div className="  bg-textfield border-gray-50 ml-auto hidden items-center justify-center  gap-3 rounded-full  border border-solid px-4 md:flex">
            {/* <Image
              className=" w-[30px] h-[30px] rounded-full object-cover "
              src={session?.user?.user?.avatar?.path ? getImg(session?.user?.user?.avatar) : '/dummy.png'}
              height={300}
              width={500}
              alt='book cover'
            /> */}
            <p>{user?.firstName}</p>
            <AiFillCaretDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuItem className="cursor-pointer" onSelect={handleLogout}>
            <FiLogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/*<Dropdown menu={{ items }}>*/}
      {/*  <a onClick={(e) => e.preventDefault()}>*/}

      {/*  </a>*/}
      {/*</Dropdown>*/}
    </section>
  );
}
