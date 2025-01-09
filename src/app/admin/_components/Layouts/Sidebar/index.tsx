import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ChildItems, ItemGroup, ItemWithSvg } from "./SidebarLinkGroup";
import {
  AuthSvg,
  DashBoardSvg,
  FormSvg,
  ProfileSvg,
  SettingsSvg,
  SvgButton,
} from "@/components/svgs/sidebarSvgs";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

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
          <Image
            width={176}
            height={32}
            src={"/images/logo/logo.svg"}
            alt="Logo"
          />
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
                path={"dashboard"}
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
                <ChildItems
                  name={"Genres"}
                  pathname={pathname}
                  path={"/admin/genre"}
                />
                <ChildItems
                  name={"Category"}
                  pathname={pathname}
                  path={"/admin/category"}
                />
                <ChildItems
                  name={"Books"}
                  pathname={pathname}
                  path={"/admin/book"}
                />
                <ChildItems
                  name={"Authors"}
                  pathname={pathname}
                  path={"/admin/author"}
                />
                <ChildItems
                  name={"Borrow History"}
                  pathname={pathname}
                  path={"/admin/borrow"}
                />
                <ChildItems
                  name={"Donations"}
                  pathname={pathname}
                  path={"/admin/donation"}
                />
              </ItemGroup>

              {/*======    Extra OPERATIONS   ========*/}
              <ItemGroup
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
              </ItemGroup>

              {/*======    Extra OPERATIONS   ========*/}

              {/*<ItemWithSvg SVG={CalendarSvg} name={"Calendar"} path={"calendar"} pathname={pathname} />*/}

              <ItemWithSvg
                SVG={ProfileSvg}
                name={"Profile"}
                path={"profile"}
                pathname={pathname}
              />

              {/* <!-- Menu Item Forms --> */}
              {/*<ItemGroup name={"Forms"} path={"forms"} pathname={pathname} Svg={FormSvg}*/}
              {/*           setSidebarExpanded={setSidebarExpanded}*/}
              {/*           sidebarExpanded={sidebarExpanded}>*/}
              {/*  <ChildItems name={"Form Elements"} pathname={pathname}*/}
              {/*              path={"/forms/form-elements"} />*/}
              {/*  <ChildItems name={"Form Layout"} pathname={pathname}*/}
              {/*              path={"/forms/form-layout"} />*/}
              {/*</ItemGroup>*/}

              {/*<ItemWithSvg SVG={SvgTables} name={"Tables"} path={"tables"} pathname={pathname} />*/}

              <ItemWithSvg
                SVG={SettingsSvg}
                name={"Settings"}
                path={"settings"}
                pathname={pathname}
              />
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
              {/*<ItemGroup name={"UI Elements"} path={"svgs"} pathname={pathname} Svg={UiElementsSvg}*/}
              {/*           setSidebarExpanded={setSidebarExpanded}*/}
              {/*           sidebarExpanded={sidebarExpanded}>*/}
              {/*  <ChildItems name={"Alerts"} pathname={pathname}*/}
              {/*              path={"/svgs/alerts"} />*/}
              {/*  <ChildItems name={"Buttons"} pathname={pathname}*/}
              {/*              path={"/svgs/buttons"} />*/}
              {/*</ItemGroup>*/}
              <ItemGroup
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
              </ItemGroup>
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
