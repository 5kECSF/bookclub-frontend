"use client";
import { Button } from "@/components/ui/button";
import { getImg } from "@/lib/constants";
import { IBook } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import { AiFillCheckCircle, AiFillStar, AiTwotoneHeart } from "react-icons/ai";

const BookCard2 = ({ book, category }: { book: IBook; category: string }) => {
  return (
    <Link href={`/src/app/(landing)/old/books/${book._id}`}>
      <div className="grid h-[120px] grid-cols-4 items-center gap-10 rounded bg-white px-4 sm:grid-cols-5 md:grid-cols-5 md:px-0 lg:grid-cols-7">
        <Image
          className=" h-[80px] w-[100px] object-contain "
          src={book?.img ? getImg(book.img) : "/dummy.png"}
          height={300}
          width={500}
          alt="book cover"
        />
        <div className="col-span-2 flex flex-row  gap-1 md:col-span-1 md:flex-col">
          <h3 className="text-[13px] font-bold capitalize md:text-[16px]">
            {book.title}
          </h3>
          <h3 className="hidden sm:block">{book.authorName}</h3>
        </div>
        <div className=" hidden items-center gap-3 md:flex">
          <span>4.5/5</span>
          <AiFillStar className="text-yellow-400" />
        </div>
        <div className=" hidden flex-col lg:flex">
          <span className="text-3xs pr-4">category</span>
          {category}
        </div>
        <div className=" hidden items-center gap-2 lg:flex">
          <AiFillCheckCircle className="text-green-800" />
          <span>Hard copy</span>
        </div>
        {!book.availableCnt ? (
          <div className=" hidden md:flex">
            <div className=" bg-red-500 w-fit rounded px-2 text-sm text-white">
              <span>checked out</span>
            </div>
          </div>
        ) : (
          <div className=" hidden md:flex">
            <div className="  w-fit rounded bg-green-500 px-2 text-sm text-white">
              <span>In shelf</span>
            </div>
          </div>
        )}
        <div>
          <Button variant={"ghost"}>
            <AiTwotoneHeart className="text-[20px]" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default BookCard2;
