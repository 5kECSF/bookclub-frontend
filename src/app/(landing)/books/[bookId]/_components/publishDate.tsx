import React from "react";

export default function PublishDate() {
    return (
      <div className=" grid grid-cols-2  box-border items-start justify-start  text-center text-[10.52px] p-3 gap-2 lg:flex lg:flex-row lg:justify-center">
        <div className="rounded-8xs bg-white-100 flex flex-col items-center justify-center border-[1px] border-solid gap-2 border-gainsboro-200 lg:w-[200px] lg:h-[40px]">
          <div className=" font-semibold">Publish Date</div>
          <div className=" text-smi-8 font-semibold text-darkslategray">
            2000
          </div>
        </div>

        <section className=" rounded-8xs bg-white-100 flex flex-col  items-center justify-center  text-center text-[10.52px] gap-2 text-dimgray-100 font-inter border-[1px] border-solid border-gainsboro-200 lg:w-[200px] lg:h-[40px]">
          <div className=" font-semibold">Publisher</div>
          <div className=" text-2xs-8 font-semibold text-coral">
            New Riders Press
          </div>
        </section>
        <section className="rounded-8xs bg-white-100 flex flex-col items-center justify-center gap-2  text-center text-[10.52px] text-dimgray-100 font-inter border-[1px] border-solid border-gainsboro-200 lg:w-[200px] lg:h-[40px]">
          <div className="font-semibold">Language</div>
          <div className="text-2xs-8 font-semibold text-coral">
            English
          </div>
        </section>
        <div className="rounded-8xs bg-white-100 flex flex-col  items-center justify-center border-[1px] gap-2 border-solid border-gainsboro-200 lg:w-[200px] lg:h-[40px]">
          <div className=" font-semibold">Pages</div>
          <div className=" text-smi-8 font-semibold text-darkslategray">
            216
          </div>
        </div>
      </div>
    );
}
