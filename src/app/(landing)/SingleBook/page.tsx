import React, { type JSX } from "react";
import { ContentSection } from "./ContentSection";
import { HeaderSection } from "./HeaderSection";

 const SingleBook = (): JSX.Element => {
    return (
        <div className="bg-white flex flex-col items-center w-full">
            <div className="bg-white w-full max-w-[1440px]">
                <HeaderSection />
                <ContentSection />
            </div>
        </div>
    );
};
export default SingleBook