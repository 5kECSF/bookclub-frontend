import { getImg } from "@/lib/constants";
import { KY } from "@/lib/constants/routes";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { OldIBook } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Iabout {
  authorName?: string;
  authorid?: string;
}

export default function About({ authorName, authorid }: Iabout) {
  const {
    isLoading,
    data: author,
    isError,
    isSuccess,
  } = useFetch([KY.author, `${authorid}`], `author/${authorid}`);
  const {
    isLoading: bookLoading,
    data: books,
    isError: bookError,
    isSuccess: bookSucess,
  } = useFetch([KY.book, `${authorid}`], `book?authorId=${authorid}`);

  const params = useParams();

  const displayedData = books?.data || [];
  return (
    <div className="rounded-3xs mx-3 bg-white px-9  py-10 text-xl">
      <div className="flex">
        <div className="mr-10">
          <h2 className="m-0 font-semibold leading-[128.52%] text-inherit">
            <span className="  text-coral">About</span>
            <span className="text-dimgray-200"> Author</span>
          </h2>
          <h2 className="mb-4 text-lg font-normal leading-[128.52%] text-inherit ">
            {authorName ?? "unkown"}
          </h2>
        </div>
        <div>
          {isSuccess && (
            <Image
              className="h-[40px] w-[40px] rounded-full object-cover"
              src={author?.img?.path ? getImg(author?.img) : ""}
              alt=""
              width={100}
              height={100}
            />
          )}
        </div>
      </div>
      <div className="">
        <div className="inline-block text-sm leading-[128.52%] ">
          {author?.info}
        </div>
        <h3 className="text-mini my-3 font-bold ">Other Books</h3>
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-5 ">
          {displayedData?.map((book: OldIBook, i: number) => {
            if (book?._id === params?.bookId) return;
            return (
              <Link key={i} href={`/src/app/(landing)/old/books/${book?._id}`}>
                <Image
                  width={100}
                  height={100}
                  className="rounded-8xs mr-8  h-[99px] w-[75px] object-cover"
                  alt=""
                  src={book?.img?.path ? getImg(book?.img) : ""}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
