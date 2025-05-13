
import React from "react";
import Header from "@/components/home/header";
import HomeFooter from "@/components/home/footer";

import BookClient from "./_components/book-client";

export interface Filter {
    categoryId?: string
    page?: number,
    searchText?: string
    language?: string,
    genres?: string
    sort?: string
}
interface BookPageProps {
    searchParams: Promise<Filter>
}
const BookPage = async (props: BookPageProps) => {
    const searchParams = await props.searchParams;

    return (
        <div className=" h-full">
            <Header />
            <BookClient searchParams={searchParams} />
            <HomeFooter />
        </div>
    );
};

export default BookPage;
