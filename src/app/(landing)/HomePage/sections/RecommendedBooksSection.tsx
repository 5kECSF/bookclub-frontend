/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const RecommendedBooksSection = (): JSX.Element => {
  // Data for carousel slides
  const carouselItems = [
    {
      id: 1,
      title: "Ipsum Dolor Si",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.",
      buttonText: "READ MORE",
      textColor: "#173f5f",
      borderColor: "#173f5f",
      active: true,
      image: "https://c.animaapp.com/G6uUiWA6/img/mask-group.png",
    },
    {
      id: 2,
      title: "Ipsum Dolor Si",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.",
      buttonText: "READ MORE",
      textColor: "#393280",
      borderColor: "#393280",
      active: false,
      image: "https://c.animaapp.com/G6uUiWA6/img/mask-group-1.png",
    },
  ];

  // Data for categories section
  const categories = [
    {
      id: 1,
      title: "Higher Education",
      image: "https://c.animaapp.com/G6uUiWA6/img/rectangle-11.png",
    },
    {
      id: 2,
      title: "Management Books",
      image: "https://c.animaapp.com/G6uUiWA6/img/rectangle-11-1.png",
    },
    {
      id: 3,
      title: "Engineering Books",
      image: "https://c.animaapp.com/G6uUiWA6/img/rectangle-11-2.png",
    },
  ];

  return (
    <section className="w-full">
      {/* Featured Books Carousel */}
      <div className="w-full [background:linear-gradient(84deg,rgba(255,229,229,1)_14%,rgba(245,255,254,1)_30%,rgba(255,255,255,1)_67%,rgba(255,255,255,1)_100%)]">
        <Carousel className="w-full">
          <CarouselContent>
            {carouselItems.map((item) => (
              <CarouselItem key={item.id}>
                <div className="flex flex-row h-[657px]">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-[607px] px-4 py-28">
                      <div className="mb-8">
                        <h2
                          className="font-semibold text-6xl tracking-[-1.20px] leading-[87.0px] font-['Inter',Helvetica]"
                          style={{ color: item.textColor }}
                        >
                          {item.title}
                        </h2>
                        <p
                          className="mt-6 font-medium text-[22px] tracking-[0.88px] leading-[39.6px] font-['Inter',Helvetica]"
                          style={{ color: item.textColor }}
                        >
                          {item.description}
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        className="mt-7 h-[61px] w-[197px] rounded-[7px] font-normal text-base tracking-[1.60px] leading-[35.2px] font-['Inter',Helvetica]"
                        style={{
                          color: item.textColor,
                          borderColor: item.borderColor,
                        }}
                      >
                        {item.buttonText}
                        <img
                          className="ml-4 w-[13px] h-2.5"
                          alt="Vector"
                          src={
                            item.id === 1
                              ? "https://c.animaapp.com/G6uUiWA6/img/vector-5.svg"
                              : "https://c.animaapp.com/G6uUiWA6/img/vector-13.svg"
                          }
                        />
                      </Button>

                      <div className="flex items-center gap-[31px] mt-16">
                        {[1, 2, 3, 4].map((dot) => (
                          <div
                            key={dot}
                            className={`${dot === 1 ? "w-[39px] h-[39px] border border-solid border-[#ed553b] rounded-[19.5px] flex items-center justify-center" : "w-[13px] h-[13px]"}`}
                          >
                            <div
                              className={`w-[13px] h-[13px] rounded-[6.5px] ${dot === 1 ? "bg-[#ed553b]" : "bg-[#bebebe]"}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-[713px]">
                    <img
                      className="h-full w-full object-cover"
                      alt="Featured book"
                      src={item.image}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-[51px] top-1/2 transform -translate-y-1/2 w-[49px] h-[49px] rounded-[24.36px] border border-solid border-[#ed553b] bg-white">
            <img
              className="w-[19px] h-[11px]"
              alt="Previous"
              src="https://c.animaapp.com/G6uUiWA6/img/vector-15.svg"
            />
          </CarouselPrevious>

          <CarouselNext className="absolute right-[51px] top-1/2 transform -translate-y-1/2 w-[49px] h-[49px] rounded-[24.36px] border border-solid border-[#ed553b] bg-white">
            <img
              className="w-[19px] h-[11px] rotate-180"
              alt="Next"
              src="https://c.animaapp.com/G6uUiWA6/img/vector-6.svg"
            />
          </CarouselNext>
        </Carousel>
      </div>

      {/* Categories Section */}
      <div className="w-full py-16 px-20">
        <div className="mb-16">
          <div className="flex items-center">
            <div className="w-8 h-0.5 bg-[#ed553b]"></div>
            <div className="ml-4 font-bold text-sm tracking-[1.40px] text-[#ed553b] font-['Inter',Helvetica]">
              Categories
            </div>
          </div>
          <h2 className="mt-4 font-bold text-[32px] tracking-[0] leading-[44px] text-[#393280] font-['Inter',Helvetica]">
            Explore our Top Categories
          </h2>

          <div className="flex justify-end">
            <div className="flex gap-7">
              <Button
                variant="outline"
                className="w-[49px] h-[49px] rounded-[24.36px] p-0 border-[#e5e3da]"
              >
                <img
                  className="w-[19px] h-[11px]"
                  alt="Previous"
                  src="https://c.animaapp.com/G6uUiWA6/img/vector-9.svg"
                />
              </Button>
              <Button className="w-[49px] h-[49px] rounded-[24.36px] p-0 bg-[#ed553b]">
                <img
                  className="w-[22px] h-3.5"
                  alt="Next"
                  src="https://c.animaapp.com/G6uUiWA6/img/vector-10.svg"
                />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-12">
          {categories.map((category) => (
            <Card key={category.id} className="border-none shadow-none">
              <CardContent className="p-0 flex flex-col items-center">
                <img
                  className="w-full h-[241px] object-cover"
                  alt={category.title}
                  src={category.image}
                />
                <h3 className="mt-8 font-semibold text-2xl text-center text-[#393280] font-['Inter',Helvetica]">
                  {category.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            className="h-[61px] w-[197px] rounded-[7px] font-normal text-base tracking-[1.60px] leading-[35.2px] text-[#393280] border-[#393280] font-['Inter',Helvetica]"
          >
            VIEW MORE
            <img
              className="ml-4 w-[13px] h-2.5"
              alt="Vector"
              src="https://c.animaapp.com/G6uUiWA6/img/vector-11.svg"
            />
          </Button>
        </div>
      </div>
    </section>
  );
};
