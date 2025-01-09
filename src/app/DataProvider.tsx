"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { SessionProvider } from "next-auth/react";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ThemeProvider from "@/lib/state/context/ThemeContext";

const queryClient = new QueryClient();
const DataProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
};

export default DataProvider;
