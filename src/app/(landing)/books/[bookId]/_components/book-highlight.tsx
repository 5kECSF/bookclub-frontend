
import Image from "next/image";
import { BiSolidQuoteAltLeft, BiSolidShareAlt } from 'react-icons/bi';
import { FaStickyNote } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { IBook } from "@/types/db";
import { getImg } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import BookBorrowModal from "./book-borrow-request";
import { useState } from "react";

export default function BackToResult({ book }: { book: IBook }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="grid grid-cols-1 mx-auto sm:grid-cols-2 mt-4">
      <BookBorrowModal isOpen={isOpen} setOpen={setIsOpen} book={book} />
      <div>
        <div className=" rounded-3xs  text-2xs text-darkslategray mx-auto">
          <div className="flex items-center justify-center">
            <Image
              className="object-contain w-[250px]"
              src={book?.img ? getImg(book.img) : ''}
              alt="Picture of the author"
              width={300}
              height={300}
            />
          </div>

          <div className=" flex justify-center gap-5 text-darkslategray mt-3 ">
            <div className="rounded flex flex-col gap-1">
              <BiSolidQuoteAltLeft
                className="w-3 h-3"
                style={{ color: "#333333" }}
              />
              <b className=" ">Review</b>
            </div>

            <div className="flex flex-col gap-1">
              <FaStickyNote
                className="w-3 h-3"

                style={{ color: "#333333" }}
              />
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
              <h1 className="m-0 text-inherit font-normal capitalize  ">{book?.title}</h1>
            </div>
            <p className="text-sm text-dimgray-200">By {book?.authorName ?? 'unkown'}, 2000</p>
            <p className="text-sm text-darkgray">Second Edition</p>
          </div>


          <div className="grid grid-cols-2 items-start justify-start text-dimgray-200 my-3">
            <div className=" col-span-1 ">
              <b className="inline-block mb-2">Availability</b>
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
              <b className="inline-block mb-2 ">Status</b>
              <div className="flex flex-col items-start justify-start  text-mini gap-2">
                <span className="cursor-pointer  bg-forestgreen-100  rounded-8xs text-mini font-inter text-white-100 px-2  ">
                  In-Shelf
                </span>
                <div className="flex  ">
                  <IoLocationSharp className="text-tomato" />
                  <div className="">CS A-15</div>
                </div>
                <span className="cursor-pointer  bg-dimgray-200  rounded-8xs text-mini font-inter text-white-100 px-2  ">
                  Add to List
                </span>

              </div>
            </div>
          </div>

          <div className="flex gap-x-2 mx-auto justify-start text-white ">
            <Button onClick={() => setIsOpen(true)} className="bg-coral ">
              Borrow
            </Button>
            <Button className="bg-forestgreen-200 ">
              Return book
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
}
