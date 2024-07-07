import "flatpickr/dist/flatpickr.min.css";

// import "@/app/admin/css/satoshi.css";
import DefaultLayout from "@/app/admin/_components/Layouts/DefaultLayout";
import "@/css/dashboard.css";
import React from "react";

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
