"use client";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
// import { SessionProvider } from "next-auth/react";
import React from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import AuthProvider from '@/lib/context/auth.context'
import ThemeProvider from "@/lib/context/ThemeContext";

const queryClient = new QueryClient();
const DataProvider = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
            <AuthProvider>
                <ThemeProvider>
                    <QueryClientProvider client={queryClient}>
                        {children}
                        <ReactQueryDevtools initialIsOpen={false}/>
                    </QueryClientProvider>
                </ThemeProvider>
            </AuthProvider>
        </div>

    );
};

export default DataProvider;
