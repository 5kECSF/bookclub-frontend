"use client"
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { Search } from "lucide-react";


import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillCaretDown, AiOutlineArrowLeft } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/state/context/jotai-auth";
import { Dropdown, MenuProps } from "antd";
import MobileSidebar from "./mobile-side-navigation";


export default function Top({}) {
  const [input, setInput] = useState("")

  const { logout, user } = useAuth();
  const handleLogout = async () => {
    await logout()

  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <li onClick={() => { handleLogout }}>
          Logout
        </li>
      ),
    },

  ]

  const router = useRouter()
  return (
    <section className="flex  justify-between   mt-5 sm:mx-11 mx-6  grid-cols-1 gap-3">
      <Button className="bg-white font-normal hidden md:flex" onClick={() => router.push('/')} variant={'outline'}><AiOutlineArrowLeft className="mr-2 " />Back to home</Button>
      <Button className="bg-white flex md:hidden" onClick={() => router.push('/')} variant={'outline'}><AiOutlineArrowLeft className="mr-2" /></Button>


      <div className="block ">
        <div className="relative flex items-center ">
          <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
            <Search />
          </span>
          <Input
            data-test='search-input'
            value={input}
            onChange={e => setInput(e.target.value)}
            type="text"
            placeholder='search'
            className=' w-full pl-14 pr-4 py-2.5 rounded-xl bg-white text-sm placeholder:text-black outline-none border border-gray-100'
          />
        </div>
      </div>
      <MobileSidebar />
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <div className="  hidden md:flex px-4 gap-3 bg-textfield rounded-full  items-center justify-center  border border-gray-50 border-solid ml-auto">
            {/* <Image
              className=" w-[30px] h-[30px] rounded-full object-cover "
              src={session?.user?.user?.avatar?.path ? getImg(session?.user?.user?.avatar) : ''}
              height={300}
              width={500}
              alt='book cover'
            /> */}
            <p>{user?.fName}</p>
            <AiFillCaretDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuItem className="cursor-pointer" onSelect={handleLogout}>
            <FiLogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>

        </a>
      </Dropdown>


    </section>
  );
}
