import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export const CategoriesSection = (): JSX.Element => {
  // Book data that can be mapped over if needed for multiple books
  const featuredBook = {
    title: "Birds Gonna Be Happy",
    author: "TIMBUR HOOD",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac.",
    price: "45.00",
    image: "/assets/anima/book.png",
  };

  // Pagination dots data
  const paginationDots = [
    { active: true, id: 1 },
    { active: false, id: 2 },
    { active: false, id: 3 },
    { active: false, id: 4 },
  ];

  return (
    <section className="w-full py-20 [background:linear-gradient(79deg,rgba(251,238,238,1)_0%,rgba(247,255,254,1)_100%)]">
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Book Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              className="max-w-full h-auto"
              alt="Book"
              src={featuredBook.image}
            />
          </div>

          {/* Book Details */}
          <div className="md:w-1/2 flex flex-col space-y-6">
            <h2 className="font-semibold text-5xl text-[#393280] [font-family:'Inter',Helvetica]">
              Featured Book
            </h2>

            <div className="w-[101px] h-0.5 bg-[#ed553b]" />

            <div className="font-medium text-[13px] text-[#888888] tracking-[2.08px] [font-family:'Inter',Helvetica]">
              BY {featuredBook.author}
            </div>

            <h3 className="font-semibold text-[28px] text-[#393280] [font-family:'Inter',Helvetica]">
              {featuredBook.title}
            </h3>

            <p className="font-normal text-base text-[#7a7a7a] tracking-[0.32px] leading-[33.3px] [font-family:'Inter',Helvetica]">
              {featuredBook.description}
            </p>

            <div className="font-bold text-[23px] text-[#ed553b] [font-family:'Inter',Helvetica]">
              $ {featuredBook.price}
            </div>

            <Button
              variant="outline"
              className="w-[197px] h-[61px] rounded-[7px] border border-solid border-[#393280] bg-transparent font-medium text-[#393280] text-base tracking-[1.60px] [font-family:'Inter',Helvetica]"
            >
              VIEW MORE
              <ChevronRightIcon className="ml-2 h-2.5 w-[13px]" />
            </Button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between w-full absolute top-1/2 -translate-y-1/2 pointer-events-none">
          <Button
            variant="outline"
            size="icon"
            className="w-[49px] h-[49px] rounded-full border border-solid border-[#ed553b] bg-white pointer-events-auto"
          >
            <ChevronLeftIcon className="h-[11px] w-[19px]" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="w-[49px] h-[49px] rounded-full border border-solid border-[#ed553b] bg-white pointer-events-auto"
          >
            <ChevronRightIcon className="h-[11px] w-[19px]" />
          </Button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-[31px] mt-12">
          {paginationDots.map((dot) => (
            <div key={dot.id} className="relative">
              {dot.active ? (
                <div className="w-[39px] h-[39px] rounded-full border border-solid border-[#ed553b] flex items-center justify-center">
                  <div className="w-[13px] h-[13px] bg-[#ed553b] rounded-full" />
                </div>
              ) : (
                <div className="w-[13px] h-[13px] bg-[#bebebe] rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
