
import Header from "@/components/header";
import Footer from '@/components/footer';
import BookClient from "./_components/book-client";
const DetailBookPage = async (props: { params: Promise<{ bookId: string }> }) => {
    const params = await props.params;

    return (
        <div className=" ">
            <Header />
            <BookClient bookId={params?.bookId} />
            <Footer />
        </div>
    );
};

export default DetailBookPage;
