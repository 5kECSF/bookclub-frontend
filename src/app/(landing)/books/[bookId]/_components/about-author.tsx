import React from "react";
import Image from "next/image";
import { KY, getImg } from "@/lib/constants";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { IBook } from "@/types/db";
import { useParams } from "next/navigation";
import Link from "next/link";


interface Iabout {
  authorName?: string,
  authorid?: string
}

export default function About({ authorName, authorid }: Iabout) {
  const { isLoading, data: author, isError, isSuccess } = useFetch(
    [KY.author, `${authorid}`],
    `author/${authorid}`,
  );
  const { isLoading: bookLoading, data: books, isError: bookError, isSuccess: bookSucess } = useFetch(
    [KY.book, `${authorid}`],
    `book?authorId=${authorid}`,
  );

  const params = useParams()

  const displayedData = books?.data||[]
  return (
    <div className="rounded-3xs bg-white px-9 py-10  mx-3 text-xl">
      <div className="flex">
        <div className="mr-10">
          <h2 className="m-0 text-inherit leading-[128.52%] font-semibold">
            <span className="  text-coral">About</span>
            <span className="text-dimgray-200"> Author</span>
          </h2>
          <h2 className="mb-4 text-inherit leading-[128.52%] font-normal text-lg ">
            {authorName ?? 'unkown'}
          </h2>
        </div>
        <div>
          {
            isSuccess && <Image className="w-[40px] h-[40px] object-cover rounded-full"
              src={author?.img?.path ? getImg(author?.img) : ""}
              alt="" width={100} height={100} />
          }


        </div>
      </div>
      <div className="">

        <div className="text-sm leading-[128.52%] inline-block ">
          {author?.info}
        </div>
        <h3 className="my-3 text-mini font-bold ">
          Other Books
        </h3>
        <div className="grid gap-4 grid-cols-3 lg:grid-cols-5 ">
          {
            displayedData?.map((book: IBook, i:number) => {
              if (book?._id === params?.bookId) return
              return <Link key={i} href={`/books/${book?._id}`}>
                <Image
                  width={100}
                  height={100}
                  className="rounded-8xs w-[75px]  h-[99px] mr-8 object-cover"
                  alt=""
                  src={book?.img?.path ? getImg(book?.img) : ""}
                />

              </Link>


            })
          }

        </div>

      </div>

    </div>
  );
}
