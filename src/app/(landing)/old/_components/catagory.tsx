"use client";
import Image from "next/image";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { KY, getImg } from "@/lib/constants";
import { Loader } from "lucide-react";
import { ICategory } from "@/types/db";
import Link from "next/link";
import CataroryLoader from "@/components/loader/catagory-loader";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

export default function Categories() {
  const { isLoading, data, isError, isSuccess, error } = useFetch(
    [KY.category, "status=active"],
    `category`,
  );
  const displayedData = data?.body || [];
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    if (slider?.scrollLeft) slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    console.log(slider?.scrollLeft);
    if (typeof slider?.scrollLeft === "number" && slider?.scrollLeft >= 0) {
      slider.scrollLeft = slider.scrollLeft + 500;
    }
  };

  return (
    <div className="  text-darkslateblue-200 mx-auto mt-10 flex max-w-[1300px] flex-col items-start px-4  text-[1.5rem]">
      <div className="flex w-full justify-between">
        <div>
          <div className=" text-tomato flex text-left text-[0.88rem] ">
            <div className="bg-tomato mt-2 h-[0.12rem] w-[2.01rem] " />
            <b className=" tracking-[0.1em]">Categories</b>
          </div>

          <div className="mb-4">
            <b className=" text-darkslateblue-200  text-[1.4rem] ">
              Explore our Top Categories
            </b>
          </div>
        </div>
        <div className="flex cursor-pointer items-center space-x-4">
          <span onClick={slideLeft} className="bg-red-400 rounded-full p-1">
            <BsArrowLeftShort className="text-white" />
          </span>
          <span onClick={slideRight} className="bg-red-400 rounded-full p-1">
            <BsArrowRightShort className="text-white" />
          </span>
        </div>
      </div>

      {isLoading ? (
        <CataroryLoader count={4} />
      ) : error ? (
        <Loader className="animate-spin" />
      ) : (
        <div
          id="slider"
          className=" flex w-full  justify-center gap-10 overflow-x-scroll scroll-smooth whitespace-nowrap"
        >
          {displayedData?.map((cat: ICategory, i: number) => {
            return (
              <Link
                key={i}
                data-test="category-list"
                className=" inline-flex w-[400px] cursor-pointer flex-col items-center  gap-y-2 px-4"
                href={`/books?categoryId=${cat._id}`}
              >
                <Image
                  className="rounded-3xs  h-[12.0rem] w-full object-cover"
                  alt=""
                  width={200}
                  height={200}
                  src={cat?.upload ? getImg(cat.upload) : "/dummy.png"}
                />

                <div
                  data-test="category-title"
                  className="font-semibold leading-[2rem] "
                >
                  {cat?.name}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
