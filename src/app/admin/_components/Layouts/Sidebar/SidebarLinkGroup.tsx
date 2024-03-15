import React, { ReactNode, useState } from "react"
import Link from "next/link"
import { DropDownSvg } from "./sidebarSvgs"

interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean) => ReactNode;
  activeCondition: boolean;
}

const SidebarLinkGroup = ({
                            children,
                            activeCondition,
                          }: SidebarLinkGroupProps) => {
  const [open, setOpen] = useState<boolean>(activeCondition)

  const handleClick = () => {
    setOpen(!open)
  }

  return <li>{children(handleClick, open)}</li>
}

export default SidebarLinkGroup

export const ItemGroup = ({ name, pathname, path, sidebarExpanded, setSidebarExpanded, children, Svg }) => {
  return (
      <SidebarLinkGroup
          activeCondition={
            pathname === `/${path}` || pathname.includes(path)
          }
      >
        {(handleClick, open) => {
          return (
              <React.Fragment>
                <Link
                    href="#"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        (pathname === `/${path}` ||
                            pathname.includes(path)) &&
                        "bg-graydark dark:bg-meta-4"
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      sidebarExpanded
                          ? handleClick()
                          : setSidebarExpanded(true)
                    }}
                >
                  <Svg />
                  {name}
                  <DropDownSvg open={open} />
                </Link>
                {/* <!-- Dropdown Menu Start --> */}
                <div
                    className={`translate transform overflow-hidden ${
                        !open && "hidden"
                    }`}
                >
                  <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">

                    {children}
                  </ul>
                </div>
                {/* <!-- Dropdown Menu End --> */}
              </React.Fragment>
          )
        }}
      </SidebarLinkGroup>
  )
}
export const ChildItems = ({ pathname, path, name }) => {
  return (
      <li>
        <Link
            href={path}
            className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                pathname === { path } &&
                "text-white"
            }`}
        >
          {name}
        </Link>
      </li>

  )
}
export const ItemWithSvg = ({ pathname, name, path, SVG }) => {
  return (
      <li>
        <Link
            href={`/${path}`}
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                pathname.includes(path) &&
                "bg-graydark dark:bg-meta-4"
            }`}
        >
          <SVG />
          {name}
        </Link>
      </li>
  )
}