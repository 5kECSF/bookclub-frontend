import React, { type JSX } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const HeroSection = (): JSX.Element => {
  return (
    <section className="w-full max-w-[808px] mx-auto py-16 text-center">
      <Card className="border-none shadow-none">
        <CardContent className="p-0 flex flex-col items-center gap-8">
          <h2 className="text-[32px] font-semibold text-[#173f5f] tracking-[1.87px]">
            Still not sure?
          </h2>

          <p className="text-lg font-normal text-[#173f5f] tracking-[1.29px] leading-[30px] max-w-[808px]">
            Jump start your book reading by quickly check through the popular
            book categories. 1000+ books are published by different authors
            everyday. Buy your favourite books on TreeBooks Today.
          </p>

          <Button
            variant="outline"
            className="w-[202px] h-[55px] rounded-[3px] border-[#173f5f] text-xl font-semibold text-[#173f5f] tracking-[1.17px]"
          >
            Read FAQ
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};
