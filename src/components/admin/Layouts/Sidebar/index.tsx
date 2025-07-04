import {
  DashBoardSvg,
  FormSvg,
  ProfileSvg,
  SettingsSvg,
  SvgButton,
} from "@/components/svgs/sidebarSvgs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ChildItems, ItemGroup, ItemWithSvg } from "./SidebarLinkGroup";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
const sidebarLinks = [
  { title: "Genres", url: "/admin/genre" },
  { title: "Category", url: "/admin/category" },
  { title: "Authors", url: "/admin/author" },
  { title: "Books", url: "/admin/book" },
  { title: "Users", url: "/admin/user" },
  { title: "Donations", url: "/admin/donation" },
  { title: "Book Borrowings", url: "/admin/borrow" },
];
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  // close if the esc key is pressed
  useEffect(() => {
    if (!isMounted) return;
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  //add expanded class
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [isMounted, sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER1 --> */}
      {/*<SidebarHeader ref={trigger} onClick={() => setSidebarOpen(!sidebarOpen)} ariaExpanded={sidebarOpen} />*/}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <div className="flex items-center">
            <div className="relative h-15 w-15 rounded-md p-0 [background:linear-gradient(90deg,rgba(41,121,255,1)_0%,rgba(76,88,158,1)_100%)]">
              <Image
                src="/assets/logo/logo2.png"
                alt="Logo"
                className="rounded-md object-cover"
                fill
                priority
              />
              {/*</div>*/}
            </div>

            <div className="ml-2 text-4xl font-medium leading-9 text-blue-100">
              Home
            </div>
          </div>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <SvgButton />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- ============ Dashboard --> */}
              <ItemGroup
                name={"Dashboard"}
                path={"account"}
                pathname={pathname}
                Svg={DashBoardSvg}
                setSidebarExpanded={setSidebarExpanded}
                sidebarExpanded={sidebarExpanded}
              >
                <ChildItems
                  name={"Statics"}
                  pathname={pathname}
                  path={"/admin"}
                />
              </ItemGroup>

              {/*======    Library OPERATIONS   ========*/}
              <ItemGroup
                name={"Library Operations"}
                path={"admin"}
                pathname={pathname}
                Svg={FormSvg}
                setSidebarExpanded={setSidebarExpanded}
                sidebarExpanded={sidebarExpanded}
              >
                {sidebarLinks.map((item) => (
                  <ChildItems
                    key={item.title}
                    name={item.title}
                    pathname={pathname}
                    path={item.url}
                  />
                ))}
              </ItemGroup>

              {/*======    Extra OPERATIONS   ========*/}
              {/* <ItemGroup
                name={"Extra Operations"}
                path={"admin"}
                pathname={pathname}
                Svg={FormSvg}
                setSidebarExpanded={setSidebarExpanded}
                sidebarExpanded={sidebarExpanded}
              >
                <ChildItems
                  name={"Notifications"}
                  pathname={pathname}
                  path={"/admin/notification"}
                />
                <ChildItems
                  name={"Feedback"}
                  pathname={pathname}
                  path={"/admin/feedback"}
                />
              </ItemGroup> */}

              {/*======    Extra OPERATIONS   ========*/}

              {/*<ItemWithSvg SVG={CalendarSvg} name={"Calendar"} path={"calendar"} pathname={pathname} />*/}

              <ItemWithSvg
                SVG={ProfileSvg}
                name={"Profile"}
                path={"account"}
                pathname={pathname}
              />
              <ItemWithSvg
                SVG={SettingsSvg}
                name={"Remainders"}
                path={"account/remainders"}
                pathname={pathname}
              />

              {/* <!-- Menu Item Forms --> */}
              {/*<ItemGroup name={"Forms"} path={"forms"} pathname={pathname} Svg={FormSvg}*/}
              {/*           setSidebarExpanded={setSidebarExpanded}*/}
              {/*           sidebarExpanded={sidebarExpanded}>*/}
              {/*  <ChildItems name={"Form unusedElements"} pathname={pathname}*/}
              {/*              path={"/forms/form-crud"} />*/}
              {/*  <ChildItems name={"Form Layout"} pathname={pathname}*/}
              {/*              path={"/forms/form-layout"} />*/}
              {/*</ItemGroup>*/}

              {/*<ItemWithSvg SVG={SvgTables} name={"Tables"} path={"tables"} pathname={pathname} />*/}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            {/*<h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">*/}
            {/*  OTHERS*/}
            {/*</h3>*/}

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chart --> */}
              {/*<ItemWithSvg SVG={ChartSvg} name={"Chart"} path={"chart"} pathname={pathname} />*/}
              {/*<ItemGroup name={"UI unusedElements"} path={"svgs"} pathname={pathname} Svg={UiElementsSvg}*/}
              {/*           setSidebarExpanded={setSidebarExpanded}*/}
              {/*           sidebarExpanded={sidebarExpanded}>*/}
              {/*  <ChildItems name={"Alerts"} pathname={pathname}*/}
              {/*              path={"/svgs/alerts"} />*/}
              {/*  <ChildItems name={"Buttons"} pathname={pathname}*/}
              {/*              path={"/svgs/buttons"} />*/}
              {/*</ItemGroup>*/}
              {/* <ItemGroup
                name={"Authentication"}
                path={"auth"}
                pathname={pathname}
                Svg={AuthSvg}
                setSidebarExpanded={setSidebarExpanded}
                sidebarExpanded={sidebarExpanded}
              >
                <ChildItems
                  name={"Sign In"}
                  pathname={pathname}
                  path={"/signin"}
                />
                <ChildItems
                  name={"Sign Up"}
                  pathname={pathname}
                  path={"/signup"}
                />
              </ItemGroup> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;

function SidebarHeader(props: {
  ref: React.MutableRefObject<any>;
  onClick: () => void;
  ariaExpanded: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
      <Link href="/">
        <Image
          width={176}
          height={32}
          src={"/images/logo/logo.svg"}
          alt="Logo"
        />
      </Link>

      <button
        ref={props.ref}
        onClick={props.onClick}
        aria-controls="sidebar"
        aria-expanded={props.ariaExpanded}
        className="block lg:hidden"
      >
        <SvgButton />
      </button>
    </div>
  );
}
