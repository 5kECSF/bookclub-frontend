import React from "react";

export default function BookDetail() {
  return (
    <div className="rounded-8xs  px-3 flex flex-col bg-white-100 box-border h-fit  text-dimgray-200 border-[1px] border-solid border-gainsboro-200 font-semibold mx-3">
      <h1 className="  font-inherit">Book Details</h1>
      <div className="flex flex-col  box-border items-start justify-start gap-[13px] text-sm">
        <div className="whitespace-nowrap ">Published in</div>
        <div className="whitespace-nowrap ">United States</div>
        <div className="whitespace-nowrap mb-5">Edition Notes</div>
      </div>
      <div className="flex flex-col   text-sm">
        <div className="text-darkgray">
          <div className=" grid grid-cols-2 justify-start">
            <p>series</p>
            <p className="">Dover large print classics</p>
          </div>

          <div className=" grid grid-cols-2 justify-start ">
            <p>Gener</p>
            <p className=""> Ficition.</p>
          </div>
          <p className="text-xl">Classifications</p>
          <div className=" grid grid-cols-2 justify-start ">
            <p>Dewey</p>
            <p className=""> 823/.8</p>
          </div>

          <div className=" grid grid-cols-2 justify-start ">
            <p>Library of congress</p>
            <p className="">PR5485 .A1 2002</p>
          </div>

          <p className="text-xl">The physical object</p>
          <div className=" grid grid-cols-2 justify-start">
            <p>Pagination</p>
            <p className="">ix, 112 p.(large print) ;</p>
          </div>
          <div className="  grid grid-cols-2 justify-start">
            <p>Number of pages</p>
            <p className="">216</p>
          </div>
          <p className="text-xl">ID Numbers</p>
          <div className="  grid grid-cols-2 justify-start">
            <p>My book shelf</p>
            <p className="">OL3570252M</p>
          </div>
          <div className="  grid grid-cols-2 justify-start">
            <p>ISBN 10</p>
            <p className="">0486424715</p>
          </div>
          <div className="  grid grid-cols-2 justify-start">
            <p>LCCV</p>
            <p className="">2002073560</p>
          </div>
          <div className="  grid grid-cols-2 justify-start">
            <p>Library Thing</p>
            <p className="">12349</p>
          </div>
          <div className="  grid grid-cols-2 justify-start">
            <p>Goodreads</p>
            <p className="">690668</p>
          </div>




          
        </div>
      </div>
    </div>
  );
}
