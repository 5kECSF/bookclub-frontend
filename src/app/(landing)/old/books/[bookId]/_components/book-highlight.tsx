import { Button } from "@/components/ui/button";
import { getImg } from "@/lib/constants";
import { OldIBook } from "@/types/db";
import Image from "next/image";
import { useState } from "react";
import { BiSolidQuoteAltLeft, BiSolidShareAlt } from "react-icons/bi";
import { FaStickyNote } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import BookBorrowModal from "./book-borrow-request";

export default function BackToResult({ book }: { book: OldIBook }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mx-auto mt-4 grid grid-cols-1 sm:grid-cols-2">
      <BookBorrowModal isOpen={isOpen} setOpen={setIsOpen} book={book} />
      <div>
        <div className=" rounded-3xs  text-2xs text-darkslategray mx-auto">
          <div className="flex items-center justify-center">
            <Image
              className="w-[250px] object-contain"
              src={book?.img ? getImg(book.img) : "/dummy.png"}
              alt="Picture of the author"
              width={300}
              height={300}
            />
          </div>

          <div className=" text-darkslategray mt-3 flex justify-center gap-5 ">
            <div className="flex flex-col gap-1 rounded">
              <BiSolidQuoteAltLeft
                className="h-3 w-3"
                style={{ color: "#333333" }}
              />
              <b className=" ">Review</b>
            </div>

            <div className="flex flex-col gap-1">
              <FaStickyNote className="h-3 w-3" style={{ color: "#333333" }} />
              <b className="">Notes</b>
            </div>

            <div className="flex flex-col ">
              <BiSolidShareAlt />

              <b className="">Share</b>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className=" p-4">
          <div className=" flex flex-col items-start justify-start gap-[5px] text-[28px]">
            <div className="flex flex-col items-start justify-start ">
              <h1 className="m-0 font-normal capitalize text-inherit  ">
                {book?.title}
              </h1>
            </div>
            <p className="text-dimgray-200 text-sm">
              By {book?.authorName ?? "unkown"}, 2000
            </p>
            <p className="text-darkgray text-sm">Second Edition</p>
          </div>

          <div className="text-dimgray-200 my-3 grid grid-cols-2 items-start justify-start">
            <div className=" col-span-1 ">
              <b className="mb-2 inline-block">Availability</b>
              <div className="flex flex-col gap-2">
                <div className="flex">
                  <input className="cursor-pointer " type="radio" />
                  <p className="inline-block">Hard Copy</p>
                </div>

                <div className="flex">
                  <input className="cursor-pointer " type="radio" />
                  <p>E-book</p>
                </div>
                <div className="flex">
                  <input className="cursor-pointer" type="radio" />
                  <p>Audio</p>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <b className="mb-2 inline-block ">Status</b>
              <div className="text-mini flex flex-col items-start  justify-start gap-2">
                <span className="bg-forestgreen-100  rounded-8xs  text-mini font-inter text-white-100 cursor-pointer px-2  ">
                  In-Shelf
                </span>
                <div className="flex  ">
                  <IoLocationSharp className="text-tomato" />
                  <div className="">CS A-15</div>
                </div>
                <span className="bg-dimgray-200  rounded-8xs  text-mini font-inter text-white-100 cursor-pointer px-2  ">
                  Add to List
                </span>
              </div>
            </div>
          </div>

          <div className="mx-auto flex justify-start gap-x-2 text-white ">
            <Button onClick={() => setIsOpen(true)} className="bg-coral ">
              Borrow
            </Button>
            <Button className="bg-forestgreen-200 ">Return book</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
