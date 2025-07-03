/* eslint-disable @next/next/no-img-element */
import { IAuthor } from "@/app/admin/author/model-def";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { KY, PlaceHolder } from "@/lib/constants/routes";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { IBook } from "@/types/libraryTypes";
import Link from "next/link";
import React from "react";
export const AuthorDetails = ({ book }: { book: IBook }) => {
  const { isLoading, data: authorData } = useFetch<IAuthor>(
    [KY.author, `${book.authorName}`],
    `${KY.author}/${book.authorName}/name`,
    {},
  );
  const { isLoading: booksLoading, data: booksData } = useFetch(
    [KY.book, `${book.authorName}`],
    `${KY.book}`,
    { authorName: `${book.authorName}` },
  );
  // TODO filter out the current book
  const bookList = booksData?.body || [];
  const filteredBooks = bookList.filter((bk: IBook) => bk._id !== book._id);
  return (
    <Card className="h-[418px] w-[445px] overflow-hidden rounded-[10px]">
      <CardContent className="p-8">
        <div className="flex justify-between">
          <div>
            <h2 className="mb-6 text-xl">
              <span className="font-semibold text-[#f27851]">About</span>
              <span className="font-semibold text-[#4c4c4c]"> Author</span>
            </h2>
            <div className="mb-6 text-xl font-normal text-[#4c4c4c]">
              Steve Krug
            </div>
          </div>
          <img
            className="h-[101px] w-[88px]"
            alt={authorData?.name}
            src={authorData?.upload?.url || PlaceHolder.Avatar}
          />
        </div>

        <p className="mb-6 text-[13px] leading-[16.7px] text-[#4c4c4c]">
          {authorData?.bio}
        </p>

        <h3 className="mb-4 text-[15px] font-bold text-[#4c4c4c]">
          Other Books
        </h3>

        <div className="flex gap-4 overflow-x-scroll">
          {booksLoading ? (
            <AuthorBooksPlaceHolder />
          ) : (
            filteredBooks.map((bk: IBook, index: number) => (
              <React.Fragment key={index}>
                <Link href={``}>
                  <img
                    src={bk.upload?.url || PlaceHolder.Dummy}
                    key={index}
                    alt={bk.title}
                    className={
                      "h-[99px] min-h-30 w-[75px] min-w-20 rounded-[5px] border border-solid border-[#f1f1f1]  bg-cover"
                    }
                  />
                </Link>
              </React.Fragment>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export function AuthorBooksPlaceHolder() {
  return (
    <>
      {Array(7)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="h-[99px] min-h-30 w-[75px] min-w-20 rounded-[5px] border border-solid border-[#f1f1f1] bg-[url(/assets/imgframe-52.png)] bg-cover"
          />
        ))}
    </>
  );
}
export const RelatedBooksSection = ({ book }: { book: IBook }) => {
  const { isLoading: booksLoading, data: booksData } = useFetch(
    [KY.book, book.categoryName],
    `${KY.book}`,
    { categoryName: book.categoryName, genres: book?.genres },
  );
  const bookList = booksData?.body || [];
  const filteredBooks = bookList.filter((bk: IBook) => bk._id !== book._id);
  return (
    <TabsContent value="related" className="mt-6">
      <div className="flex gap-4 overflow-x-scroll">
        {booksLoading ? (
          <AuthorBooksPlaceHolder />
        ) : filteredBooks.length < 1 ? (
          <div>No related Books</div>
        ) : (
          filteredBooks.map((bk: IBook, index: number) => (
            <React.Fragment key={index}>
              <Link href={``}>
                <img
                  src={bk.upload?.url || PlaceHolder.Dummy}
                  key={index}
                  alt={bk.title}
                  className={
                    "h-[99px] min-h-45 w-[75px] min-w-30 rounded-[5px] border border-solid border-[#f1f1f1]  bg-cover"
                  }
                />
              </Link>
            </React.Fragment>
          ))
        )}
      </div>
    </TabsContent>
  );
};
