"use client";

import "@/assets/css/style.css";
import React, { useState } from "react";
import Loader from "@/components/common/Loader";
import { ToastContainer } from "react-toastify";
import DataProvider from "@/app/DataProvider";
import "react-toastify/dist/ReactToastify.min.css";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";
import { useAuth } from "@/lib/state/context/jotai-auth";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading } = useAuth();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <DevTools />
        <DataProvider>{loading ? <Loader /> : children}</DataProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
