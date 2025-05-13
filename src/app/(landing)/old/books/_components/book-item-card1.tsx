import { getImg } from "@/lib/constants";
import { OldIBook } from "@/types/db";
import Image from "next/image";
import Link from "next/link";

export const BookItem = ({ book }: { book: OldIBook }) => {
  return (
    <div data-test="book-list">
      <div
        className="mb-5 h-[385.83px] shadow-lg  "
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href={`/src/app/(landing)/old/books/${book._id}`}>
          <div>
            <Image
              className=" h-[300px] w-full object-contain "
              src={book?.img ? getImg(book.img) : "/dummy.png"}
              height={300}
              width={500}
              alt="book cover"
            />
          </div>
        </Link>
      </div>
      <div
        style={{
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          data-test="book-title"
          className="text-lg font-semibold capitalize "
          style={{ color: "darkslateblue.200" }}
        >
          {book.title}
        </div>
        <div className=" text-gray.100 block text-sm capitalize tracking-[0.02em] ">
          {book.authorName}
        </div>
      </div>
    </div>
  );
};
