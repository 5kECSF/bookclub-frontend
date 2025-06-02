import { type JSX } from "react";
import { ContentSection } from "./ContentSection";

const SingleBook = (): JSX.Element => {
  return (
    <div className="flex w-full flex-col items-center bg-white">
      <div className="w-full max-w-[1440px] bg-white">

        <ContentSection />
      </div>
    </div>
  );
};
export default SingleBook;
