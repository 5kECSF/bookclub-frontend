"use client";
import SingleBookLoader from "@/components/loader/single-book-loader";
import { Button } from "@/components/ui/button";
import { KY } from "@/lib/constants/routes";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import About from "./about-author";
import BackToResult from "./book-highlight";
import BookDetail from "./bookDetail";
import Commmunity from "./community";
import Overview from "./overview";
import Preview from "./preview";
import PublishDate from "./publishDate";

const BookClient = ({ bookId }: { bookId: string }) => {
  const {
    isLoading,
    data: book,
    isError,
    isSuccess,
    error,
    isFetching,
  } = useFetch([KY.book, bookId], `book/${bookId}`);
  const router = useRouter();
  return (
    <div>
      <section className=" bg-whitesmoke-200 rounded-3xs m-5 min-h-screen px-4 py-6">
        <Button
          onClick={() => router.back()}
          className="inline-flex items-center rounded  border px-3 py-2"
        >
          <BiArrowBack className="m-2" />
          Back to results
        </Button>
        {isLoading ? (
          <SingleBookLoader />
        ) : error ? (
          <>error happen</>
        ) : (
          <>
            <BackToResult book={book} />
            <Overview />
            <PublishDate />
            <Preview />
            <div className="mx-auto mt-8 grid grid-cols-1 md:grid-cols-2">
              <BookDetail />
              <div>
                <About
                  authorName={book?.authorName}
                  authorid={book?.authorId}
                />
                <Commmunity />
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default BookClient;
