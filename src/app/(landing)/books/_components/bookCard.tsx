/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getImg } from "@/lib/constants";
import { UI_ROUTES } from "@/lib/constants/routes";
import { IBook } from "@/types/libraryTypes";
import Link from "next/link";

export const BookCard = ({ book }: { book: IBook }) => {
  return (
    <div>
      <Link href={`${UI_ROUTES.BooksListing}/${book._id}`}>
        <Card className="relative  w-full border-[#e9e7df] bg-white shadow-[0px_4px_10px_#00000026]">
          <CardContent className="relative h-full p-0">
            <img
              className="mx-auto mt-[21px] h-[351px] w-11/12 object-cover"
              alt={book.title}
              src={getImg(book.upload)}
            />

            {(book?.availableCnt || 0) > 0 && (
              <>
                <div className="absolute left-[42px] top-[47px] h-[291px] w-[202px] bg-[#393280] opacity-10" />
                <Button className="absolute left-[29px] top-[237px] h-11 w-[227px] rounded-none bg-[#ed553b]">
                  <span className="text-center text-base font-medium tracking-[2.24px] text-white">
                    Request TO Borrow
                  </span>
                </Button>
              </>
            )}
            <Separator />
            <div className="mt-4 flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold text-[#393280]">
                {book.title}
              </h3>
              <p className="text-sm font-normal tracking-[0.28px] text-[#888888]">
                {book.authorName}
              </p>
              <p className="mt-2 text-[22px] font-bold tracking-[0.44px] text-[#ed553b]">
                {book?.page}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};
