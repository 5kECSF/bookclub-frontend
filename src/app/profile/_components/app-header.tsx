"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

import { usePathname } from "next/navigation";

export function AccountHeader() {
  const pathName = usePathname();
  const pathStr = pathName?.split("/") || [];
  console.log(pathStr);
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky-top sticky  top-0 z-50 flex h-16 shrink-0 items-center gap-2 bg-white transition-[width,height] ease-linear">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Account</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{pathStr[pathStr?.length - 1]}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto mr-8">
        <NavUser />
      </div>
    </header>
  );
}
