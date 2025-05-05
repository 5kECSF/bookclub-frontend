"use client";

import React from "react";
import "@/assets/css/style.css";
import DataProvider from "@/app/DataProvider";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "jotai";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";
import { ToastContainer } from "react-toastify";
import { useAuth } from "@/lib/state/context/jotai-auth";
import Loader from "@/components/common/Loader";

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
