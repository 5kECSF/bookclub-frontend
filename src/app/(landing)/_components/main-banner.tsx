'use client'
import React, { useState } from "react";

import banner1 from "../../../../public/assets/image/home/homeBanner1.png";

import Image from "next/image";
import Link from "next/link";

export default function Banner1() {

  
  return (

    <section className=" flex justify-center items-center text-darkslateblue-200 [background:linear-gradient(78.43deg,_#fbeeee,_#f7fffe)]   flex-col min-h-[80vh]">

      <div className=" flex justify-center flex-col  sm:flex-row max-w-[1300px] px-4 mx-auto py-4 ">
        <div className="flex-1 flex gap-y-4 flex-col justify-center items-start">
          <div>
            <p className="text-darkslateblue.200 text-[50px] font-bold" >
              Hello there
            </p>
            <p style={{ fontSize: 20 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
              feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut
              magna velit eleifend. Amet, quis urna, a eu.
            </p>
          </div>,

          <Link href={'/book'} className='border rounded-lg px-4 py-2 border-slate-800'>
            Read more
          </Link>
        </div>

        <div className=" h-[350px] sm:h-full sm:flex-1  flex justify-center items-center lg:p-10">
          <Image
            className=" object-contain w-[300px] sm:w-[400px]  lg:w-full "
            src={banner1}
            alt="Picture of the author"
          />
        </div>
      </div>
    </section>
  );
}
