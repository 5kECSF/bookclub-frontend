import React from "react";
export default function Commmunity() {
  return (
    <div className=" rounded-8xs bg-white-100 box-border  border-gainsboro-200 mx-3 my-2 p-5">
      <div className="flex justify-between">
        <h1 className="font-bold ">Community Reviews</h1>
        <h3 className=" [text-decoration:underline] font-bold font-inherit text-tomato">
          Feedback?
        </h3>
      </div>
      <div className="  flex flex-col box-border text-xs-2 text-dimgray-100 font-inter gap-y-3">
        <div className="flex flex-row gap-3">
          <div className=" flex flex-row items-start justify-start">
            <div className="uppercase font-semibold">Pace</div>
          </div>
          <div className=" rounded-2xl flex flex-row py-2 px-3 items-start justify-start text-xs text-darkslategray border-[1px] border-solid border-lightgray-200">
            <div className="relative font-semibold">
              <span>{`Meandering `}</span>
              <span className="text-gray-100"> 100%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <div className="flex flex-row items-start justify-start">
            <div className="relative tracking-[0.5px] uppercase font-semibold">
              Enjoyability
            </div>
          </div>
          <div className="rounded-2xl flex flex-row py-2 px-3 items-start justify-start text-xs text-darkslategray border-[1px] border-solid border-lightgray-200">
            <div className="relative font-semibold">
              <span>Interesting</span>
              <span className="text-gray-100"> 100%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className=" flex flex-row ">
            <div className="relative tracking-[0.5px] uppercase font-semibold">
              Difficulty
            </div>
          </div>
          <div className="rounded-2xl flex flex-row py-2 px-3 items-start justify-start text-xs text-darkslategray border-[1px] border-solid border-lightgray-200">
            <div className="relative font-semibold">
              <span>{`Advanced `}</span>
              <span className="text-gray-100"> 100%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="flex flex-row py-0 pr-[4.96875px] pl-0 items-start justify-start text-xs-2 text-dimgray-100">
            <b className="relative tracking-[0.5px] uppercase">Genres</b>
          </div>
          <div className=" rounded-2xl flex flex-row py-2 px-2 items-start justify-start text-xs text-darkslategray border-[1px] border-solid border-lightgray-200">
            <div className="relative font-semibold">
              <span>{`Horror `}</span>
              <span className="text-gray-100"> 66%</span>
            </div>
          </div>
          <div className="rounded-2xl flex flex-row py-2 px-3 items-start justify-start text-xs text-darkslategray border-[1px] border-solid border-lightgray-200">
            <div className="relative font-semibold">
              <span>{`Mystery `}</span>
              <span className="text-gray-100"> 33%</span>
            </div>
          </div>
        </div>
        <div className=" flex flex-row gap-3 ">
          <div className="flex flex-row items-start justify-start text-xs-2 text-dimgray-100">
            <div className="relative tracking-[0.5px] uppercase font-semibold">
              Mood
            </div>
          </div>
          <div className="rounded-2xl flex flex-row py-2 px-3 items-start justify-start text-xs text-darkslategray border-[1px] border-solid border-lightgray-200">
            <div className="relative font-semibold">
              <span>{`Ominous `}</span>
              <span className="text-gray-100"> 25%</span>
            </div>
          </div>
          <div className="rounded-2xl flex flex-row py-2 px-3 items-start justify-start text-xs text-darkslategray border-[1px] border-solid border-lightgray-200">
            <div className="relative">
              <span>
                <span className="font-semibold">Scientific</span>
                <b className="font-liberation-sans text-gray-100">{` `}</b>
              </span>
              <b className="font-liberation-sans text-gray-100">
                <span> 25%</span>
              </b>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="flex flex-row py-0 pr-[4.9375px] pl-0 items-start justify-start text-xs-2 text-dimgray-100">
            <div className="relative tracking-[0.5px] uppercase font-semibold">{`Impressions `}</div>
          </div>
          <div className="flex flex-col gap-1 md:flex-row">
          <div className=" rounded-2xl flex flex-row py-2 px-3 items-start justify-start text-xs text-darkslategray border-[1px] border-solid border-lightgray-200">
            <div className="relative font-semibold">
              <span>{`Overhyped `}</span>
              <span className="text-gray-100"> 50%</span>
            </div>
          </div>
          <div className="rounded-2xl flex flex-row py-2 px-3 items-start justify-start text-xs text-darkslategray border-[1px] border-solid border-lightgray-200">
            <div className="relative font-semibold">
              <span>{`Forgettable `}</span>
              <span className="text-gray-100"> 50%</span>
            </div>
          </div>
          </div>
        </div>
        <div className="flex flex-row gap-10">
        
            <div className=" uppercase font-semibold">{`Length `}</div>
    
          <div className=" rounded-2xl flex flex-row py-2 px-3 items-start justify-start text-xs text-darkslategray border-[1px] border-solid border-lightgray-200">
            <div className="relative font-semibold">
              <span>{`Short `}</span>
              <span className="text-gray-100"> 100%</span>
            </div>
          </div>
        </div>
      </div>
      <b className=" text-sm [text-decoration:underline]">
        Add your community review
      </b>
    </div>
  );
}
