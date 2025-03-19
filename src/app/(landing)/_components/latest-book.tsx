'use client'
import Image from "next/image";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { KY, getImg } from "@/lib/constants";

import { IBook, ICategory } from "@/types/db";
import Link from "next/link";
import LatestBookLoader from "@/components/loader/latest-book-loader";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function LatestBook() {

    const { isLoading, data, isError, isSuccess, error } = useFetch(
        [KY.latestBooks],
        `book?sort=-createdAt&limit=7`,
    );
    const { isLoading: catLoading, data: categoryData, } = useFetch(
        [KY.category],
        `category`,

    );

    const bookData = data?.body||[]
    const category = (book: IBook) => bookData ? categoryData?.body?.find((cat: ICategory) => cat._id === book?.categoryId)?.name : ''

    const slideLeft = () => {
        const slider = document.getElementById("slider2")

        if (slider?.scrollLeft)
            slider.scrollLeft = slider.scrollLeft - 500
    }

    const slideRight = () => {
        const slider = document.getElementById("slider2")
        console.log(slider?.scrollLeft, 'before')
        if (typeof slider?.scrollLeft === 'number' && slider?.scrollLeft >= 0) {
            slider.scrollLeft = slider.scrollLeft + 500
        }
        console.log(slider?.scrollLeft, "after")


    }
    return (
        <div className="Gener text-darkslategray mt-16">

            <p className="text-[24px]  flex justify-center mt-4 text-[#173F5F]">
                New Realeses Books
            </p>

            <Link className="text-[10px] font-body-normal-14 flex justify-center mt-4 text-tomato" href={'/books'}>
                View all products
            </Link>

            {
                isLoading ? <LatestBookLoader count={7} /> : error ? JSON.stringify(error) :
                    <div className="relative max-w-[1300px] mx-auto  px-10">
                        <div onClick={slideRight} className="absolute sm:p-4 bg-red-500 rounded-full  top-1/2 -translate-y-1/2 z-[1000] right-[0px] cursor-pointer">
                            <AiOutlineArrowRight className="text-[20px] text-white" />
                        </div>
                        <div onClick={slideLeft} className="absolute top-1/2 p-4 bg-red-500 rounded-full  -translate-y-1/2 z-[1000] left-[0px] cursor-pointer ">
                            <AiOutlineArrowLeft className="text-[20px] text-white" />
                        </div>
                        <div id='slider2' className="  overflow-x-scroll whitespace-nowrap  w-full gap-10 scroll-smooth relative z-[100]" >

                            {
                                bookData?.map((release: IBook, i: number) => {
                                    return (
                                        <Link
                                            href={`/books/${release._id}`}
                                            className=" w-[200px] inline-flex  rounded-3xs    mx-auto mb-5  flex-col items-start"
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
                                    )
                                })

                            }

                        </div>

                    </div>

            }




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
    )
}

