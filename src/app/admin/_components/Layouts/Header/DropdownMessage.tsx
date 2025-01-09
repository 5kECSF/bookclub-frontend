import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageSvg } from "@/components/svgs/header-svgs";

const usrList = [
  {
    id: "1",
    img: "/images/user/user-01.png",
    name: "Mariya Desoja",
    msg: "I like your confidence 💪",
    href: `/messages/{}`,
    time: "2min ago",
  },
  {
    id: "2",
    img: "/images/user/user-02.png",
    name: "abebe Desoja",
    msg: "hellow there",
    href: `/messages/{}`,
    time: "10min ago",
  },
  {
    id: "3",
    img: "/images/user/user-03.png",
    name: "kena Desoja",
    msg: "holla amigo",
    href: `/messages/{}`,
    time: "1 hr ago",
  },
];
interface ImsgProps {
  img: string;
  name: string;
  msg: string;
  time: string;
  href: string;
}

function UserMsg({ img, name, msg, time, href }: ImsgProps) {
  return (
    <li>
      <Link
        className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
        href={href}
      >
        <div className="h-12.5 w-12.5 rounded-full">
          <Image
            width={112}
            height={112}
            src={img}
            alt="User"
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </div>

        <div>
          <h6 className="text-sm font-medium text-black dark:text-white">
            {name}
          </h6>
          <p className="text-sm">{msg}</p>
          <p className="text-xs">{time}</p>
        </div>
      </Link>
    </li>
  );
}

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        href="#"
      >
        <span
          className={`absolute -right-0.5 -top-0.5 z-1 h-2 w-2 rounded-full bg-meta-1 ${
            notifying === false ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>

        <MessageSvg />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Messages</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          {usrList.map((item) => (
            <UserMsg
              key={item.id}
              img={item.img}
              name={item.name}
              msg={item.msg}
              href={`/message/${item.id}`}
              time={item.time}
            />
          ))}
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </li>
  );
};

export default DropdownMessage;
