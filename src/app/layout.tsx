"use client";

import DataProvider from "@/app/DataProvider";
import "@/assets/css/style.css";
import Loader from "@/components/common/Loader";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/lib/state/context/jotai-auth";
import { Provider } from "jotai";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";
import React from "react";
import { ToastContainer } from "react-toastify";

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
          <ToastContainer />
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
