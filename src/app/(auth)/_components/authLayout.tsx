import React,  { ReactNode }  from "react";
import "@/css/style.css";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-boxdark-2">
      <div className="w-full rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:w-3/4 lg:w-2/3 xl:w-1/3">
        <div className="flex flex-wrap  items-center self-center">
          <div className="w-full border-stroke dark:border-strokedark ">
            <div className="w-full p-6 sm:p-12.5 xl:p-17.5">
              {/* <span className="mb-1.5 block font-medium">Start your Journey</span> */}
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                {title}
              </h2>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
