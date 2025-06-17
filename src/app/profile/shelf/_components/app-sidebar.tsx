"use client";

import { BellDot, GalleryVerticalEnd, LibraryBig, UserPen } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavUser } from "./nav-user";

// This is sample data.
const data = [
  {
    title: "My Profile",
    url: "/profile",
    icon: UserPen,
  },
  {
    title: "My Shelf",
    url: "/profile/shelf",
    icon: LibraryBig,
  },
  {
    title: "Reminders",
    url: "/profile/remainders",
    icon: BellDot,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeaderItem />
      {/* Items */}
      <SidebarContent>
        <SidebarGroupItem lable="Pages">
          {data.map((item) => (
            <SidebarItem
              key={item.title}
              item={item}
              pathname={pathName as string}
            />
          ))}
        </SidebarGroupItem>
      </SidebarContent>
      {/* Side Bar footer */}
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
export function SidebarItem({
  item,
  pathname,
}: {
  item: any;
  pathname: string;
}) {
  return (
    <SidebarMenuItem>
      <Link href={item.url}>
        <SidebarMenuButton
          className={` ${pathname == item.url && "border-b-2 border-b-red text-red"}`}
          tooltip={item.title}
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          {/* <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
}

export function SidebarHeaderItem() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <Link href="/">
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Library</span>
                <span className="truncate text-xs">Home</span>
              </div>
            </Link>

            {/* <ChevronsUpDown className="ml-auto" /> */}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

export function SidebarGroupItem({
  children,
  lable,
}: {
  children: React.ReactNode;
  lable: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{lable}</SidebarGroupLabel>
      <SidebarMenu>{children}</SidebarMenu>
    </SidebarGroup>
  );
}
