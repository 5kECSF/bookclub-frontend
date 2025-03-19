
import React from "react";
import Header from "@/components/header";
import HomeFooter from "@/components/footer";

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
    searchParams: Filter
}
const BookPage = ({ searchParams }: BookPageProps) => {

    return (
        <div className=" h-full">
            <Header />
            <BookClient searchParams={searchParams} />
            <HomeFooter />
        </div>
    );
};

export default BookPage;
