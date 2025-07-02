"use client";
import CataroryLoader from "@/components/loader/catagory-loader";
import { Card, CardContent } from "@/components/ui/card";
import { getImg } from "@/lib/constants";
import { KY } from "@/lib/constants/routes";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { ICategory } from "@/types/db";
import { Loader } from "lucide-react";
import Link from "next/link";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const CategoriesSection = () => {
  const { isLoading, data, isError, isSuccess, error } = useFetch(
    [KY.category, "status=active"],
    `${KY.category}`,
    {
      status: "active",
    },
  );
  const displayedData = data?.body || [];
  // const slideLeft = () => {
  //   const slider = document.getElementById("slider");
  //   if (slider?.scrollLeft) slider.scrollLeft = slider.scrollLeft - 500;
  // };
  //
  // const slideRight = () => {
  //   const slider = document.getElementById("slider");

  //   if (typeof slider?.scrollLeft === "number" && slider?.scrollLeft >= 0) {
  //     slider.scrollLeft = slider.scrollLeft + 500;
  //   }
  // };
  return (
    <section className="w-full">
      <div className="w-full px-20 py-16">
        <div className="mb-16">
          <div className="flex items-center">
            <div className="h-0.5 w-8 bg-[#ed553b]"></div>
            <div className="ml-4 font-['Inter',Helvetica] text-sm font-bold tracking-[1.40px] text-[#ed553b]">
              Categories
            </div>
          </div>
          <h2 className="mt-4 font-['Inter',Helvetica] text-[32px] font-bold leading-[44px] tracking-[0] text-[#393280]">
            Explore our Top Categories
          </h2>
          <>
            {/*<div className="flex justify-end">*/}
            {/*  <div className="flex gap-7">*/}
            {/*    <Button*/}
            {/*      onClick={slideLeft}*/}
            {/*      variant="outline"*/}
            {/*      className="h-[49px] w-[49px] rounded-[24.36px] border-[#e5e3da] p-0"*/}
            {/*    >*/}
            {/*      <ArrowLeft className="h-[11px] w-[19px]" />*/}
            {/*    </Button>*/}
            {/*    <Button*/}
            {/*      onClick={slideRight}*/}
            {/*      className="h-[49px] w-[49px] rounded-[24.36px] bg-[#ed553b] p-0"*/}
            {/*    >*/}
            {/*      <ArrowRight className="h-3.5 w-[22px] " />*/}
            {/*    </Button>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </>
        </div>

        {isLoading ? (
          <CataroryLoader count={4} />
        ) : error ? (
          <Loader className="animate-spin" />
        ) : (
          <Carousel className="w-full max-w-[1200px]  gap-8">
            <CarouselContent className="  gap-8">
              {/*<div*/}
              {/*  id="slider"*/}
              {/*  className="mb-12 flex justify-center gap-8 overflow-x-scroll scroll-smooth whitespace-nowrap"*/}
              {/*>*/}
              {displayedData.map((category: ICategory, i: number) => (
                <CarouselItem key={i} className="m-2 md:basis-1/3 lg:basis-1/4">
                  <Link
                    data-test="category-list"
                    className="inline-flex cursor-pointer flex-col items-center  px-2"
                    href={`/books?categoryName=${category.name}`}
                  >
                    <Card className="rounded-l border-none shadow-card">
                      <CardContent className="flex flex-col items-center rounded-xl p-0 ">
                        <img
                          className="h-[241px] w-full rounded-xl object-cover shadow-4"
                          alt={category.name}
                          src={
                            category?.upload
                              ? getImg(category.upload)
                              : "/dummy.png"
                          }
                        />
                        <h3 className="mt-8 text-center font-['Inter',Helvetica] text-2xl font-semibold text-[#393280]">
                          {category.name}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
              {/*</div>*/}
            </CarouselContent>
            <CarouselPrevious className="h-[39px] w-[39px] rounded-[19.5px]" />
            <CarouselNext className="h-[39px] w-[39px] rounded-[19.5px]" />
          </Carousel>
        )}

        {/*<div className="flex justify-center">*/}
        {/*    <Button*/}
        {/*        variant="outline"*/}
        {/*        className="h-[61px] w-[197px] rounded-[7px] font-normal text-base tracking-[1.60px] leading-[35.2px] text-[#393280] border-[#393280] font-['Inter',Helvetica]"*/}
        {/*    >*/}
        {/*        VIEW MORE*/}
        {/*        <ArrowRight*/}
        {/*            className="ml-4 w-[13px] h-2.5"*/}
        {/*        />*/}
        {/*    </Button>*/}
        {/*</div>*/}
      </div>
    </section>
  );
};
