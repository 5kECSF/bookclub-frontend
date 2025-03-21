"use client"
import SingleBookLoader from "@/components/loader/single-book-loader";
import { KY } from "@/lib/constants";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { BiArrowBack } from "react-icons/bi";
import BackToResult from "./book-highlight";
import Overview from "./overview";
import PublishDate from "./publishDate";
import Preview from "./preview";
import BookDetail from "./bookDetail";
import Commmunity from "./community";
import About from "./about-author";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const BookClient = ({ bookId }: { bookId: string }) => {
    const { isLoading, data: book, isError, isSuccess, error, isFetching } = useFetch(
        [KY.book, bookId],
        `book/${bookId}`,
    );
    const router = useRouter()
    return (
        <div>
            <section className=" bg-whitesmoke-200 min-h-screen rounded-3xs m-5 px-4 py-6">
                < Button onClick={() => router.back()} className="rounded py-2 px-3  border inline-flex items-center">
                    <BiArrowBack className='m-2' />
                    Back to results
                </Button>
                {
                    isLoading ? <SingleBookLoader /> : error ? <>error happen</> :
                        <>
                            <BackToResult book={book} />
                            <Overview />
                            <PublishDate />
                            <Preview />
                            <div className="grid grid-cols-1 mt-8 mx-auto md:grid-cols-2">
                                <BookDetail />
                                <div>
                                    <About authorName={book?.authorName} authorid={book?.authorId} />
                                    <Commmunity />
                                </div>
                            </div>
                        </>

                }
            </section>
        </div>
    )
}

export default BookClient