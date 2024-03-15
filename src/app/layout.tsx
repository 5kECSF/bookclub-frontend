"use client";

import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import {ToastContainer} from "react-toastify";
import DataProvider from "@/app/DataProvider";


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
