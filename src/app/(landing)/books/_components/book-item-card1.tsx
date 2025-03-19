import { getImg } from "@/lib/constants";
import { IBook } from "@/types/db";
import Image from "next/image";
import Link from "next/link";

export const BookItem = ({ book }: { book: IBook }) => {

    return (
        <div data-test='book-list'>
            <div
                className="mb-5 shadow-lg h-[385.83px]  "
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Link href={`/books/${book._id}`}>
                    <div>

                        <Image
                            className=" w-full object-contain h-[300px] "
                            src={book?.img ? getImg(book.img) : ''}
                            height={300}
                            width={500}
                            alt='book cover'

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
                    data-test='book-title'
                    className="text-lg capitalize font-semibold "
                    style={{ color: "darkslateblue.200" }}
                >
                    {book.title}
                </div>
                <div className=" text-sm tracking-[0.02em] capitalize text-gray.100 block ">
                    {book.authorName}
                </div>

            </div>
        </div>
    );
}