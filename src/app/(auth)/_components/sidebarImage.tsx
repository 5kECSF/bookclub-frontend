import Link from "next/link";
import Image from "next/image";
import { SvgSignup1 } from "@/components/svgs/auth-svg";
import React from "react";

export function SidebarImage() {
  return (
    <div className="hidden w-full xl:block xl:w-1/2">
      <div className="px-26 py-17.5 text-center">
        <Link className="mb-5.5 inline-block" href="/">
          <Image
            className="hidden dark:block"
            src={"/images/logo/logo.svg"}
            alt="Logo"
            width={176}
            height={32}
          />
          <Image
            className="dark:hidden"
            src={"/images/logo/logo-dark.svg"}
            alt="Logo"
            width={176}
            height={32}
          />
        </Link>
        <p className="2xl:px-20">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
        </p>

        <span className="mt-15 inline-block">
          <SvgSignup1 />
        </span>
      </div>
    </div>
  );
}
