import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
// import "@/app/admin/css/satoshi.css";
import "@/css/dashboard.css";
import React from "react";
import DefaultLayout from "@/app/admin/_components/Layouts/DefaultLayout";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <DefaultLayout>{children}</DefaultLayout>
    </div>
  );
}
