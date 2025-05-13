import React, { type JSX } from "react";
import { ContentSection } from "./ContentSection";
import { HeaderSection } from "@/app/(landing)/_components/common/HeaderSection";

const SingleBook = (): JSX.Element => {
  return (
    <div className="flex w-full flex-col items-center bg-white">
      <div className="w-full max-w-[1440px] bg-white">
        <HeaderSection />
        <ContentSection />
      </div>
    </div>
  );
};
export default SingleBook;
