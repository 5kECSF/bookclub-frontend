import React from "react";
import { HeaderSection } from "@/app/(landing)/_components/common/HeaderSection";
import { FooterSection } from "@/app/(landing)/_components/common/FooterSection";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderSection />
      {children}
      <FooterSection />
    </>
  );
}
