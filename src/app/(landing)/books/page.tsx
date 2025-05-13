import { BreadCrumb } from "@/app/(landing)/books/_components/breadCrumb";
import { BooksState } from "@/app/(landing)/books/booksState";

const ListingPage = async (props: any) => {
  const searchParams = await props.searchParams;
  console.log("searchParams", searchParams);

  return (
    <div className="relative w-full overflow-hidden  bg-white">
      {/* Breadcrumb section */}
      <BreadCrumb />
      <BooksState urlParam={searchParams} />
    </div>
  );
};

export default ListingPage;
