"use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import withAuthorization from "@/lib/functions/withAuthorization";
import { AccountHeader } from "./shelf/_components/app-header";
import { AppSidebar } from "./shelf/_components/app-sidebar";
function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AccountHeader />
        {/* Content Div */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default withAuthorization(Page, []);
