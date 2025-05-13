"use client";

import { useFetch } from "@/lib/state/hooks/useQuery";
import Image from "next/image";

import LatestBookLoader from "@/components/loader/latest-book-loader";
import { IBook, ICategory } from "@/types/db";
import Link from "next/link";

import { getImg, KY } from "@/lib/constants";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function LatestBook() {
  const { isLoading, data, isError, isSuccess, error } = useFetch(
    [KY.latestBooks],
    `book?sort=-createdAt&limit=7`,
  );
  const { isLoading: catLoading, data: categoryData } = useFetch(
    [KY.category],
    `category`,
  );

  const bookData = data?.body || [];
  const category = (book: IBook) =>
    bookData
      ? categoryData?.body?.find(
          (cat: ICategory) => cat._id === book?.categoryId,
        )?.name
      : "";

  const slideLeft = () => {
    const slider = document.getElementById("slider2");

    if (slider?.scrollLeft) slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider2");
    console.log(slider?.scrollLeft, "before");
    if (typeof slider?.scrollLeft === "number" && slider?.scrollLeft >= 0) {
      slider.scrollLeft = slider.scrollLeft + 500;
    }
    console.log(slider?.scrollLeft, "after");
  };
  return (
    <div className="Gener text-darkslategray mt-16">
      <p className="mt-4  flex justify-center text-[24px] text-[#173F5F]">
        New Realeses Books
      </p>

      <Link
        className="font-body-normal-14 text-tomato mt-4 flex justify-center text-[10px]"
        href={"/books"}
      >
        View all products
      </Link>

      {isLoading ? (
        <LatestBookLoader count={7} />
      ) : error ? (
        JSON.stringify(error)
      ) : (
        <div className="relative mx-auto max-w-[1300px]  px-10">
          <div
            onClick={slideRight}
            className="bg-red-500 absolute right-[0px] top-1/2  z-[1000] -translate-y-1/2 cursor-pointer rounded-full sm:p-4"
          >
            <AiOutlineArrowRight className="text-[20px] text-white" />
          </div>
          <div
            onClick={slideLeft}
            className="bg-red-500 absolute left-[0px] top-1/2 z-[1000]  -translate-y-1/2 cursor-pointer rounded-full p-4 "
          >
            <AiOutlineArrowLeft className="text-[20px] text-white" />
          </div>
          <div
            id="slider2"
            className="  relative z-[100]  w-full gap-10 overflow-x-scroll scroll-smooth whitespace-nowrap"
          >
            {bookData?.map((release: IBook, i: number) => {
              return (
                <Link
                  href={`/src/app/(landing)/old/books/${release._id}`}
                  className=" rounded-3xs mx-auto  mb-5    inline-flex w-[200px]  flex-col items-start"
                  key={i}
                >
                  <Image
                    className="rounded-8xs h-[10.63rem] w-[7.69rem] "
                    alt=""
                    src={release?.img ? getImg(release.img) : "/dummy.png"}
                    height={300}
                    width={500}
                  />
                  <div className=" flex flex-col items-start justify-start gap-[0.31rem]">
                    <div className="relative inline-block h-[0.88rem] w-[8.13rem] shrink-0 text-[0.75rem] leading-[128.52%]">
                      {release.title}
                    </div>
                    <div className="">
                      {release.authorName ?? "unkown"}, {2000}
                    </div>
                  </div>
                  <div className=" bg-primary-purple-dark-10 font-inria-serif  box-border   rounded  px-2 text-black">
                    {category(release)}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* {
                isLoading ? <LatestBookLoader count={7} /> : error ? JSON.stringify(error) :
                    <div className="grid m-10  grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 ">
                        {
                            displayedData.map((release: IBook, i: number) => {
                                return (
                                    <Link
                                        href={`/books/${release._id}`}
                                        className="relative rounded-3xs    mx-auto mb-5 flex flex-col items-start"
                                        key={i}
                                    >
                                        <Image
                                            className="rounded-8xs w-[7.69rem] h-[10.63rem] "
                                            alt=""
                                            src={release?.img ? getImg(release.img) : ''}
                                            height={300}
                                            width={500}
                                        />
                                        <div className=" flex flex-col items-start justify-start gap-[0.31rem]">
                                            <div className="relative text-[0.75rem] leading-[128.52%] inline-block w-[8.13rem] h-[0.88rem] shrink-0">
                                                {release.title}
                                            </div>
                                            <div className="">
                                                {release.authorName ?? 'unkown'}, {2000}
                                            </div>

                                        </div>
                                        <div className=" rounded px-2  bg-primary-purple-dark-10   box-border  text-black font-inria-serif">
                                            {category(release)}
                                        </div>
                                    </Link>
                                );
                            })
                        }
                    </div>
            } */}
    </div>
  );
}
