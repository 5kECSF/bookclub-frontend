
import Header from "@/components/header";
import Footer from '@/components/footer';
import BookClient from "./_components/book-client";
const DetailBookPage = ({ params }: { params: { bookId: string } }) => {

    return (
        <div className=" ">
            <Header />
            <BookClient bookId={params?.bookId} />
            <Footer />
        </div>
    );
};

export default DetailBookPage;
