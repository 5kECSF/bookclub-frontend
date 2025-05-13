/* eslint-disable @next/next/no-img-element */
import {Button} from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel";

import type {JSX} from "react";
import {ArrowLeft} from "lucide-react";
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
    image: "/assets/anima/mask-group.png",
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
    image: "/assets/anima/mask-group-1.png",
  },
];
export const CarouselSection = (): JSX.Element => {

  return (
    <section className="w-full">
      {/* Featured Books Carousel */}
      <div className="w-full [background:linear-gradient(84deg,rgba(255,229,229,1)_14%,rgba(245,255,254,1)_30%,rgba(255,255,255,1)_67%,rgba(255,255,255,1)_100%)]">
        <Carousel className="w-full">
          <CarouselContent>
            {carouselItems.map((item) => (
              <SingleCarouselItem item={item} key={item.id} />
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-[51px] top-1/2 transform -translate-y-1/2 w-[49px] h-[49px] rounded-[24.36px] border border-solid border-[#ed553b] bg-white">
            <ArrowLeft color="#000000"
              className="w-[19px] h-[11px]"
              // alt="Previous"
              // src="/assets/anima/vector-15.svg"
            />
          </CarouselPrevious>

          <CarouselNext className="absolute right-[51px] top-1/2 transform -translate-y-1/2 w-[49px] h-[49px] rounded-[24.36px] border border-solid border-[#ed553b] bg-white">
            <ArrowLeft
              className="w-[19px] h-[11px] rotate-180"
              // alt="Next"
              // src="/assets/anima/vector-6.svg"
            />
          </CarouselNext>
        </Carousel>
      </div>


    </section>
  );
};

const SingleCarouselItem=({item}:any)=>{
  return(
      <CarouselItem >
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
              {/*Read More button*/}
              <Button
                  variant="outline"
                  className="mt-7 h-[61px] w-[197px] rounded-[7px] font-normal text-base tracking-[1.60px] leading-[35.2px] font-['Inter',Helvetica]"
                  style={{
                    color: item.textColor,
                    borderColor: item.borderColor,
                  }}
              >
                {item.buttonText}
                <ArrowLeft
                    className="w-20 h-[11px] rotate-180"
                    // alt="Next"
                    // src="/assets/anima/vector-6.svg"
                />
              </Button>
              {/*Bottom Dot Carousel buttons*/}
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
  )
}