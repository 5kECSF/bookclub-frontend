import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NotificationSvg } from "@/components/svgs/header-svgs";

const notificationLst = [
  {
    id: "1",
    title: "Edit your information in a swipe",
    body:
      "Sint\n" +
      "occaecat cupidatat non proident, sunt in culpa qui officia deserunt\n" +
      "mollit anim.",
    date: "12 May, 2025",
  },
  {
    id: "2",
    title: "It is a long established fact",
    body: "reader will be distracted by the readable.",
    date: "12 Jan, 2025",
  },
  {
    id: "3",
    title: "There are many variations",
    body:
      "Sint\n" +
      "occaecat cupidatat non proident, sunt in culpa qui officia deserunt\n" +
      "mollit anim.",
    date: "01 Dec, 2024",
  },
];
interface Props {
  id: string;
  title: string;
  body: string;
  date: string;
}
function Notification({ id, title, body, date }: Props) {
  return (
    <li>
      <Link
        className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
        href={`/notifications/${id}`}
      >
        <p className="text-sm">
          <span className="text-black dark:text-white">{title}</span> {body}
        </p>

        <p className="text-xs">{date}</p>
      </Link>
    </li>
  );
}

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

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
        href="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <span
          className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
            notifying === false ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>

        <NotificationSvg />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          {notificationLst.map((noti) => (
            <Notification
              id={noti.id}
              title={noti.title}
              date={noti.date}
              body={noti.body}
              key={noti.id}
            />
          ))}
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
