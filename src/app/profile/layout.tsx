import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AccountHeader } from "./_components/app-header";
import { AppSidebar } from "./_components/app-sidebar";
export default function Page({
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
