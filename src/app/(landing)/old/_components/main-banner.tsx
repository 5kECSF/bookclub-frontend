"use client";
import React, { useState } from "react";

import banner1 from "../../../../../public/assets/image/home/homeBanner1.png";

import Image from "next/image";
import Link from "next/link";

export default function Banner1() {
  return (
    <section className=" text-darkslateblue-200 flex min-h-[80vh] flex-col items-center   justify-center [background:linear-gradient(78.43deg,_#fbeeee,_#f7fffe)]">
      <div className=" mx-auto flex max-w-[1300px]  flex-col justify-center px-4 py-4 sm:flex-row ">
        <div className="flex flex-1 flex-col items-start justify-center gap-y-4">
          <div>
            <p className="text-darkslateblue.200 text-[50px] font-bold">
              Hello there
            </p>
            <p style={{ fontSize: 20 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
              feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus
              ut magna velit eleifend. Amet, quis urna, a eu.
            </p>
          </div>
          ,
          <Link
            href={"/book"}
            className="rounded-lg border border-slate-800 px-4 py-2"
          >
            Read more
          </Link>
        </div>

        <div className=" flex h-[350px] items-center  justify-center sm:h-full sm:flex-1 lg:p-10">
          <Image
            className=" w-[300px] object-contain sm:w-[400px]  lg:w-full "
            src={banner1}
            alt="Picture of the author"
          />
        </div>
      </div>
    </section>
  );
}
