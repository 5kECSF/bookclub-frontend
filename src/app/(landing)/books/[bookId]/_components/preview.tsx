import React from "react";

export default function Preview() {
  return (
      <div className="mx-10 flex flex-col justify-center">
        <div className=" flex flex-row  text-xs">
          <div className="font-semibold">
            <span>{`Previews available in: `}</span>
            <span className="[text-decoration:underline] text-coral">
              English
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start text-darkslategray">
          <div className=" overflow-hidden shrink-0">
            <div className=" flex items-center ">
              <span className="[line-break:anywhere] w-full">
                <span>{`Since Don’t Make Me Think was first published in 2000, hundreds of thousands of Web designers and developers have relied on usability guru Steve Krug’s guide to help them understand the principles of intuitive navigation and information design. Witty, commonsensical, and eminently practical, it’s one of the best-loved and most...  `}</span>
                <span className="text-coral">Read more</span>
              </span>
            </div>
          </div>
        </div>
      </div>
  );
}
