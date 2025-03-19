'use client'
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
    [KY.category],
    `category`,
  );
  const displayedData = data?.body ||[]
  const slideLeft = () => {
    const slider = document.getElementById("slider")
    if (slider?.scrollLeft)
      slider.scrollLeft = slider.scrollLeft - 500
  }

  const slideRight = () => {
    const slider = document.getElementById("slider")
    console.log(slider?.scrollLeft)
    if (typeof slider?.scrollLeft === 'number' && slider?.scrollLeft >= 0) {
      slider.scrollLeft = slider.scrollLeft + 500
    }


  }

  return (
    <div className="  text-[1.5rem] text-darkslateblue-200 max-w-[1300px] mx-auto px-4 flex flex-col items-start  mt-10">
      <div className="w-full flex justify-between">
        <div>
          <div className=" text-left flex text-[0.88rem] text-tomato ">
            <div className="bg-tomato w-[2.01rem] h-[0.12rem] mt-2 " />
            <b className=" tracking-[0.1em]">
              Categories
            </b>
          </div>

          <div className="mb-4">
            <b className=" text-[1.4rem]  text-darkslateblue-200 ">
              Explore our Top Categories
            </b>
          </div>
        </div>
        <div className="space-x-4 flex items-center cursor-pointer">
          <span onClick={slideLeft} className="p-1 bg-red-400 rounded-full"><BsArrowLeftShort className="text-white" /></span>
          <span onClick={slideRight} className="p-1 bg-red-400 rounded-full"><BsArrowRightShort className="text-white" /></span>
        </div>

      </div>

      {
        isLoading ? <CataroryLoader count={4} /> : error ? <Loader className='animate-spin' /> :
          <div id='slider' className="  overflow-x-scroll whitespace-nowrap w-full gap-10 scroll-smooth" >
            {displayedData?.map((cat: ICategory, i:number) => {
              return (
                <Link key={i} data-test='category-list' className=" w-[400px] inline-flex gap-y-2 flex-col px-4  items-center cursor-pointer" href={`/books?categoryId=${cat._id}`}>
                  <Image
                    className="rounded-3xs  h-[12.0rem] object-cover w-full"
                    alt=""
                    width={200}
                    height={200}
                    src={cat?.img ? getImg(cat.img) : ''}
                  />

                  <div data-test='category-title' className="leading-[2rem] font-semibold ">
                    {cat?.name}
                  </div>
                </Link>
              )
            })}
          </div>
      }
    </div>
  )
}
