/* eslint-disable @next/next/no-img-element */
import { FooterSection } from "@/app/(landing)/_components/common/FooterSection";
import { JSX } from "react";
import HeaderSection from "./HeaderSection";
import { SideBar } from "./NavigationSection";

export default function MyShelf({ children }: any): JSX.Element {
  return (
    <>
      {/* <div className="bg-white flex flex-row justify-center w-full min-h-screen"> */}
      {/* <div className="bg-white w-full max-w-[1920px] relative"> */}
      <div className=" h-full min-h-screen w-full max-w-[1820px]">
        {/* Main layout with navigation and content */}
        <div className="flex h-full">
          {/* Navigation sidebar */}
          <SideBar />

          <div className="flex w-full flex-col p-4">
            {/* Header section */}
            <HeaderSection />
            {children}
            <FooterSection />
            {/* <div className="footer border-red-300 sticky h-8 w-full"></div> */}
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
