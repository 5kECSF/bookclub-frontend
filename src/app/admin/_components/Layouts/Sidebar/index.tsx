import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChildItems, ItemGroup, ItemWithSvg } from "./SidebarLinkGroup"
import Image from "next/image"
import {
  AuthSvg,
  DashBoardSvg,
  FormSvg,
  ProfileSvg,
  SettingsSvg,
  SvgButton,

} from "./sidebarSvgs"

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}


const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname()

  const trigger = useRef<any>(null)
  const sidebar = useRef<any>(null)

  let storedSidebarExpanded = "true"
  const [sidebarExpanded, setSidebarExpanded] = useState(
      storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  )

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return
      if (
          !sidebarOpen ||
          sidebar.current.contains(target) ||
          trigger.current.contains(target)
      )
        return
      setSidebarOpen(false)
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
  })
  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener("keydown", keyHandler)
    return () => document.removeEventListener("keydown", keyHandler)
  })
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded")
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded")
    }
  }, [sidebarExpanded])

  return (
      <aside ref={sidebar}
             className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
                 sidebarOpen ? "translate-x-0" : "-translate-x-full"
             }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
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
          <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
            {/* <!-- Menu Group --> */}
            <div>
              <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                MENU
              </h3>

              <ul className="mb-6 flex flex-col gap-1.5">

                {/* <!-- ============ Dashboard --> */}
                <ItemGroup name={"Dashboard"} path={"dashboard"} pathname={pathname} Svg={DashBoardSvg}
                           setSidebarExpanded={setSidebarExpanded}
                           sidebarExpanded={sidebarExpanded}>
                  <ChildItems name={"Statics"} pathname={pathname}
                              path={"/"} />
                </ItemGroup>

                {/*======    Core OPERATIONS   ========*/}
                {/* <ItemGroup name={"Core Operations"} path={"admin"} pathname={pathname} Svg={FormSvg}
                           setSidebarExpanded={setSidebarExpanded}
                           sidebarExpanded={sidebarExpanded}>
                  <ChildItems name={"Domains"} pathname={pathname}
                              path={"/admin/domain"} />
                  <ChildItems name={"Learning Areas"} pathname={pathname}
                              path={"/admin/learnArea"} />
                  <ChildItems name={"Subjects"} pathname={pathname}
                              path={"/admin/subject"} />
                  <ChildItems name={"Knowledge"} pathname={pathname}
                              path={"/admin/knowledge"} />
                  <ChildItems name={"Skill"} pathname={pathname}
                              path={"/admin/skill"} />
                  <ChildItems name={"Task"} pathname={pathname}
                              path={"/admin/task"} />
                  <ChildItems name={"WorkRole"} pathname={pathname}
                              path={"/admin/workRole"} />

                </ItemGroup> */}

                {/*======    Learning OPERATIONS   ========*/}
                {/* <ItemGroup name={"Learning Operations"} path={"admin"} pathname={pathname} Svg={FormSvg}
                           setSidebarExpanded={setSidebarExpanded}
                           sidebarExpanded={sidebarExpanded}>
                  <ChildItems name={"Content"} pathname={pathname}
                              path={"/admin/content"} />
                  <ChildItems name={"Sections"} pathname={pathname}
                              path={"/admin/section"} />
                  <ChildItems name={"Courses"} pathname={pathname}
                              path={"/admin/course"} />
                  <ChildItems name={"Packages"} pathname={pathname}
                              path={"/admin/pkg"} />
                  <ChildItems name={"Groups"} pathname={pathname}
                              path={"/admin/group"} />
                  <ChildItems name={"Trainings"} pathname={pathname}
                              path={"/admin/training"} />

                </ItemGroup> 
                 */}
                 
                {/*======    Learning OPERATIONS   ========*/}
                {/* <ItemGroup name={"Assessment Operations"} path={"admin"} pathname={pathname} Svg={FormSvg}
                           setSidebarExpanded={setSidebarExpanded}
                           sidebarExpanded={sidebarExpanded}>
                  <ChildItems name={"Questions"} pathname={pathname}
                              path={"/admin/choiceQuestions"} />
                  <ChildItems name={"Quiz"} pathname={pathname}
                              path={"/admin/quiz"} />
                  <ChildItems name={"Test"} pathname={pathname}
                              path={"/admin/test"} />
                  <ChildItems name={"Exam"} pathname={pathname}
                              path={"/admin/exam"} />
                  <ChildItems name={"Flag"} pathname={pathname}
                              path={"/admin/flag"} />
                  <ChildItems name={"CtfRoom"} pathname={pathname}
                              path={"/admin/ctfRoom"} />
                  <ChildItems name={"Ctf"} pathname={pathname}
                              path={"/admin/ctf"} />
                  <ChildItems name={"WorkShop"} pathname={pathname}
                              path={"/admin/workShop"} />

                </ItemGroup> */}


                {/*<ItemWithSvg SVG={CalendarSvg} name={"Calendar"} path={"calendar"} pathname={pathname} />*/}

                <ItemWithSvg SVG={ProfileSvg} name={"Profile"} path={"profile"} pathname={pathname} />

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

                <ItemWithSvg SVG={SettingsSvg} name={"Settings"} path={"settings"} pathname={pathname} />


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
                {/*<ItemGroup name={"UI Elements"} path={"ui"} pathname={pathname} Svg={UiElementsSvg}*/}
                {/*           setSidebarExpanded={setSidebarExpanded}*/}
                {/*           sidebarExpanded={sidebarExpanded}>*/}
                {/*  <ChildItems name={"Alerts"} pathname={pathname}*/}
                {/*              path={"/ui/alerts"} />*/}
                {/*  <ChildItems name={"Buttons"} pathname={pathname}*/}
                {/*              path={"/ui/buttons"} />*/}
                {/*</ItemGroup>*/}
                <ItemGroup name={"Authentication"} path={"auth"} pathname={pathname} Svg={AuthSvg}
                           setSidebarExpanded={setSidebarExpanded}
                           sidebarExpanded={sidebarExpanded}>
                  <ChildItems name={"Sign In"} pathname={pathname}
                              path={"/signin"} />
                  <ChildItems name={"Sign Up"} pathname={pathname}
                              path={"/signup"} />
                </ItemGroup>
              </ul>
            </div>
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
  )
}

export default Sidebar


function SidebarHeader(props: { ref: React.MutableRefObject<any>, onClick: () => void, ariaExpanded: boolean }) {
  return <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
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
}
