"use client";

import "@/css/style.css";
import React, { useState } from "react";
import Loader from "@/components/common/Loader";
import {ToastContainer} from "react-toastify";
import DataProvider from "@/app/DataProvider";
import "react-toastify/dist/ReactToastify.min.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(false);



  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>

      <DataProvider>
        {loading ? <Loader /> : children}
      </DataProvider>
      <ToastContainer />
      </body>
    </html>
  );
}
