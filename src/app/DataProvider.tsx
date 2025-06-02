"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/lib/state/context/ThemeContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
const queryClient = new QueryClient();
const DataProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AntdRegistry>{children}</AntdRegistry>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
         <Toaster position="top-right"  />
      </ThemeProvider>

    </div>
  );
};

export default DataProvider;
