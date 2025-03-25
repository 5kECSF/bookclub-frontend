"use client";

import "@/assets/css/style.css";
import React, { useState } from "react";
import Loader from "@/components/common/Loader";
// import { ToastContainer } from "react-toastify";
import DataProvider from "@/app/DataProvider";

import { DevTools } from "jotai-devtools";
import { Provider } from "jotai";
import "jotai-devtools/styles.css";
import { useAuth } from "@/lib/state/context/jotai-auth";
import { Toaster } from "@/components/ui/toaster"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading } = useAuth();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider>
          <DevTools />
          <DataProvider>{loading ? <Loader /> : children}</DataProvider>

          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
