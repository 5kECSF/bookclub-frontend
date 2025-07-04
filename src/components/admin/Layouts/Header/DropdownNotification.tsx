"use client";

import { NotificationSvg } from "@/components/svgs/header-svgs";
import { useUserNotification } from "@/lib/state/context/notification.context";
import { atomWithStorage } from "jotai/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const lastNotificationAtom = atomWithStorage("last-notice", "");
lastNotificationAtom.debugLabel = "last-notification";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const {
    unseenNotifications,
    setLatest,
    count,
    setNotifying,
    notifying,
    oldNotifications,
  } = useUserNotification();
  //effects related to notification
  useEffect(() => {
    if (!dropdownOpen) {
      setNotifying(false);
      if (unseenNotifications?.body?.length > 0) {
        setLatest(unseenNotifications.body[0].createdAt);
      }
    }
  }, [dropdownOpen, unseenNotifications, setLatest, setNotifying]);

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
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setDropdownOpen(!dropdownOpen);
        }}
        href="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <span
          className={`absolute -top-0.5 right-0 z-1 flex h-5 w-5 items-center justify-center rounded-full bg-meta-1 text-xs text-white ${
            notifying ? "inline" : "hidden"
          }`}
        >
          {count != null && count}
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
          <h5 className="text-md font-medium text-bodydark2">Notifications</h5>
        </div>

        {unseenNotifications?.count <= 0 && (
          <p className="border-t border-stroke px-4.5 py-3 dark:border-strokedark">
            No New Notification
          </p>
        )}

        <ul className="flex h-auto flex-col overflow-y-auto">
          {/* Render New Notices */}
          {unseenNotifications?.body?.map((notice: any, i: any) => {
            let path = notice?._id;

            return (
              <NotificationComponent
                notifying={true}
                key={`latest-${i}`}
                notice={notice}
                path={path}
              />
            );
          })}

          {/* Render Old Notices */}
          <h2 className="border-t border-stroke py-2 text-center text-xl dark:border-strokedark">
            ------ seen ---------
          </h2>
          {oldNotifications?.map((notice: any) => {
            let path = notice?._id;

            return (
              <NotificationComponent
                notifying={false}
                key={`old-${notice?._id}`}
                notice={notice}
                path={path}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DropdownNotification;

export function NotificationComponent({
  notice,
  path,
  notifying,
}: {
  notice: any;
  path: string;
  notifying: boolean;
}) {
  return (
    <li className=" relative mx-2 flex flex-row items-center justify-center bg-gray-2 px-4  dark:border-form-input dark:bg-meta-4">
      <Link
        className="flex w-full flex-col gap-2.5 border-t border-stroke  px-4.5 py-3 dark:border-form-input dark:bg-meta-4"
        href={` `}
        onClick={() => {
          console.log("clicked Notification", notice.title);
        }}
      >
        <div className="text-sm">
          <span className="mr-2 text-black dark:text-white">
            {notice?.title}
          </span>
        </div>
        <p>{notice?.body}</p>
        <p className="text-xs">{notice?.createdAt}</p>
      </Link>
      {notifying && (
        // <span  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-red text-xs text-white" />
        <span className=" flex h-3 w-3 items-center justify-center rounded-full bg-red text-xs text-white" />
      )}
    </li>
  );
}
