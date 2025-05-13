import React from "react";
import banner3 from "../../../../../public/assets/image/home/homeBanner3.png";
import Image from "next/image";

export default function Banner2() {
  return (
    <div className=" text-darkslateblue-200 text-[1.44rem] ">
      <div className=" max-h-[1100px]  [background:linear-gradient(78.43deg,_#fbeeee,_#f7fffe)] ">
        <div className="item-center flex flex-col justify-center md:flex-row ">
          <Image
            className="mx-auto w-[300px] object-contain sm:w-[400px] "
            src={banner3}
            alt="Picture of the author"
          />

          <div className="gridTwo px-5 md:my-auto md:flex-col md:justify-center">
            <div className="text-[3rem] font-semibold capitalize ">
              Featured book
            </div>
            <div className="bg-tomato h-[0.13rem] w-[6.31rem]" />
            <div className=" text-gray-100 my-4 text-[0.81rem] font-medium uppercase tracking-[0.16em]">
              By Timbur Hood
            </div>
            <div className=" my-4 text-[1.75rem] font-semibold capitalize">
              Birds gonna be happy
            </div>
            <div className=" text-gray-200 inline-block text-[1rem] leading-[208%] tracking-[0.02em] ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
              feugiat amet, libero ipsum enim pharetra hac.
            </div>
            <div className="bold text-tomato my-8 capitalize tracking-[0.02em]">
              $ 45.00
            </div>

            <button className="rounded-6xs border-darkslateblue-200 box-border cursor-pointer  border-[1px] border-solid bg-[transparent] px-10 py-2 ">
              <div className="font-body-normal-14 text-darkslateblue-200 text-left text-[1rem] font-medium uppercase leading-[220%] tracking-[0.1em]">
                View more
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
