import React from "react";
import banner3 from "../../../../public/assets/image/home/homeBanner3.png";
import Image from "next/image";


export default function Banner2() {
  return (
    <div className=" text-[1.44rem] text-darkslateblue-200 ">
      <div className=" [background:linear-gradient(78.43deg,_#fbeeee,_#f7fffe)]  max-h-[1100px] ">
        <div className="flex flex-col justify-center item-center md:flex-row ">


          <Image
            className="w-[300px] object-contain sm:w-[400px] mx-auto "
            src={banner3}
            alt="Picture of the author"

          />


          <div className="gridTwo md:flex-col md:justify-center md:my-auto px-5">
            <div className="text-[3rem] capitalize font-semibold ">
              Featured book
            </div>
            <div className="bg-tomato w-[6.31rem] h-[0.13rem]" />
            <div className=" text-[0.81rem] tracking-[0.16em] my-4 uppercase font-medium text-gray-100">
              By Timbur Hood
            </div>
            <div className=" text-[1.75rem] my-4 capitalize font-semibold">
              Birds gonna be happy
            </div>
            <div
              className=" text-[1rem] tracking-[0.02em] leading-[208%] text-gray-200 inline-block ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
              feugiat amet, libero ipsum enim pharetra hac.
            </div>
            <div className="tracking-[0.02em] bold my-8 capitalize text-tomato">
              $ 45.00
            </div>

            <button
              className="cursor-pointer px-10 py-2 bg-[transparent]  rounded-6xs box-border border-[1px] border-solid border-darkslateblue-200 ">
              <div
                className="text-[1rem] tracking-[0.1em] leading-[220%] uppercase font-medium font-body-normal-14 text-darkslateblue-200 text-left">
                View more
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

