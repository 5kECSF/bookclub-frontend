"use client";
/* eslint-disable @next/next/no-img-element */
import { Metas } from "@/app/admin/book/add-edit-modal";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { KY, UI_ROUTES } from "@/lib/constants/routes";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { IBook } from "@/types/libraryTypes";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { JSX } from "react";
// Data for carousel slides
const carouselItems: Partial<IBook>[] = [
  {
    _id: "1",
    title: "Mere Christianity",
    desc: "Mere Christianity by C. S. Lewis delves into the basic foundations of Christianity and offers a rational and understandable explanation of the Christian faith. Lewis, using his background in literature and philosophy, addresses major subjects including morality, human nature, and the presence of God",
    upload: {
      fileName: "",
      url: "/assets/books/mere-chrstianity2.jpg",
    },
  },
  {
    _id: "2",
    title: "The Purpose Driven Life",
    desc: "The Purpose Driven Life by Rick Warren is a spiritual guide that helps readers discover their unique purpose and live a fulfilling, meaningful life.",
    upload: {
      fileName: "",
      url: "/assets/books/purpose-driven-life.png",
    },
  },
];

export const BannerSection = (): JSX.Element => {
  const { isLoading, data, isError, error, isPlaceholderData } = useFetch(
    [KY.book, Metas.Banner],
    `${KY.book}`,
    { meta: [Metas.Banner] },
  );
  const bannerBooks: IBook[] = data?.body || [];
  const bannerList = bannerBooks.length > 0 ? bannerBooks : carouselItems;
  return (
    <section className="w-full">
      {/* Featured Books Carousel */}
      <div className="w-full [background:linear-gradient(84deg,rgba(255,229,229,1)_14%,rgba(245,255,254,1)_30%,rgba(255,255,255,1)_67%,rgba(255,255,255,1)_100%)]">
        <Carousel className="w-full">
          <CarouselContent>
            {bannerList.map((item) => (
              <SingleCarouselItem item={item} key={item._id} />
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-[51px] top-1/2 h-[49px] w-[49px] -translate-y-1/2 transform rounded-[24.36px] border border-solid border-[#3bed8e] bg-white">
            <ArrowLeft
              color="#000000"
              className="h-[11px] w-[19px]"
              // alt="Previous"
              // src="/assets/anima/vector-15.svg"
            />
          </CarouselPrevious>

          <CarouselNext className="absolute right-[51px] top-1/2 h-[49px] w-[49px] -translate-y-1/2 transform rounded-[24.36px] border border-solid border-[#ed553b] bg-white">
            <ArrowLeft
              className="h-[11px] w-[19px] rotate-180"
              // alt="Next"
              // src="/assets/anima/vector-6.svg"
            />
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
};

const SingleCarouselItem = ({ item }: { item: Partial<IBook> }) => {
  return (
    <CarouselItem>
      <div className="flex h-[657px] flex-row">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-[607px] px-4 py-28">
            <div className="mb-8">
              <h2
                className="font-['Inter',Helvetica] text-6xl font-semibold leading-[87.0px] tracking-[-1.20px]"
                style={{ color: "#393280" }}
              >
                {item.title}
              </h2>
              <p
                className="font-small tx-sm mt-6 font-['Inter',Helvetica] text-[22px] leading-[39.6px] tracking-[0.88px]"
                style={{ color: "#173f5f" }}
              >
                {item.desc}
              </p>
            </div>
            {/*Read More button*/}
            {item?.categoryName && (
              <Link href={`${UI_ROUTES.BooksListing}/${item._id}`}>
                <Button
                  variant="outline"
                  className="mt-7 h-[61px] w-[197px] rounded-[7px] font-['Inter',Helvetica] text-base font-normal leading-[35.2px] tracking-[1.60px]"
                  style={{
                    color: "#393280",
                    borderColor: "#393280",
                  }}
                >
                  Read More
                  <ArrowLeft className="h-[11px] w-20 rotate-180" />
                </Button>
              </Link>
            )}
            {/*Bottom Dot Carousel buttons*/}
            {/* <div className="mt-16 flex items-center gap-[31px]">
              {[1, 2, 3, 4].map((dot) => (
                <div
                  key={dot}
                  className={`${dot === 1 ? "flex h-[39px] w-[39px] items-center justify-center rounded-[19.5px] border border-solid border-[#ed553b]" : "h-[13px] w-[13px]"}`}
                >
                  <div
                    className={`h-[13px] w-[13px] rounded-[6.5px] ${dot === 1 ? "bg-[#ed553b]" : "bg-[#bebebe]"}`}
                  />
                </div>
              ))}
            </div> */}
          </div>
        </div>
        <div className="w-[713px]">
          <img
            className="h-full w-full object-cover"
            alt="Featured book"
            src={item.upload?.url}
          />
        </div>
      </div>
    </CarouselItem>
  );
};
