import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BookListSection } from "./sections/BookListSection";
import { FilterSection } from "./sections/FilterSection";

const SideBarFilter=(): JSX.Element=>{
return (
<div className="w-[280px] ml-[62px]">
            

            {/* Price filter */}
            <div className="flex flex-col gap-3.5 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#393280] text-base leading-8">
                  Page
                </h3>
                <Separator
                  className="w-[17px] h-0.5"
                  orientation="horizontal"
                />
              </div>

              <Separator className="w-full" />

              <div className="flex flex-col gap-[21px]">
                <div className="flex items-center gap-[27px]">
                  <div className="flex items-center gap-[9px]">
                    <span className="font-bold text-[#393280] text-base leading-8">
                      $
                    </span>
                    <Input className="w-[77px] h-[31.2px] border-[#eaeaea]" />
                  </div>

                  <span className="font-medium text-[#888888] text-lg text-center tracking-[0.72px] leading-[32.4px]">
                    to
                  </span>

                  <div className="flex items-center gap-[9px]">
                    <span className="font-bold text-[#393280] text-base leading-8">
                      $
                    </span>
                    <Input className="w-[77px] h-[31.2px] border-[#eaeaea]" />
                  </div>
                </div>

                <Button className="w-full h-[41.6px] bg-[#393280] text-white font-medium text-base">
                  Filter
                </Button>
              </div>
            </div>

            {/* Filter accordions */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="book-type"
                className="border-b border-[#e0e0e0]"
              >
                <AccordionTrigger className="py-2 font-bold text-[#393280] text-base">
                  Book type
                </AccordionTrigger>
                <AccordionContent>
                  {/* Book type filter content */}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="availability"
                className="border-b border-[#e0e0e0]"
              >
                <AccordionTrigger className="py-2 font-bold text-[#393280] text-base">
                  Availability
                </AccordionTrigger>
                <AccordionContent>
                  {/* Availability filter content */}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="genre"
                className="border-b border-[#e0e0e0]"
              >
                <AccordionTrigger className="py-2 font-bold text-[#393280] text-base">
                  Genre
                </AccordionTrigger>
                <AccordionContent>
                  {/* Genre filter content */}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="language"
                className="border-b border-[#e0e0e0]"
              >
                <AccordionTrigger className="py-2 font-bold text-[#393280] text-base">
                  language
                </AccordionTrigger>
                <AccordionContent>
                  {/* Language filter content */}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
)
}
 const ListingPage = (): JSX.Element => {
  // Book data for the listing
  const books = [
    {
      id: 1,
      title: "Simple Way Of Piece Life",
      author: "Armor Ramsey",
      price: "40.00",
      image: "https://c.animaapp.com/2jBM5N30/img/book5-4@2x.png",
      featured: true,
    },
    {
      id: 2,
      title: "Great Travel At Desert",
      author: "Sanchit Howdy",
      price: "38.00",
      image: "https://c.animaapp.com/2jBM5N30/img/book3-4@2x.png",
    },
    {
      id: 3,
      title: "The Lady Beauty Scarlett",
      author: "Arthur Doyle",
      price: "45.00",
      image: "https://c.animaapp.com/2jBM5N30/img/book16-1@2x.png",
    },
    {
      id: 4,
      title: "The Lady Beauty Scarlett",
      author: "Arthur Doyle",
      price: "45.00",
      image: "https://c.animaapp.com/2jBM5N30/img/book16-1-1@2x.png",
    },
    {
      id: 5,
      title: "Great Travel At Desert",
      author: "Sanchit Howdy",
      price: "38.00",
      image: "https://c.animaapp.com/2jBM5N30/img/book3-4-1@2x.png",
    },
    {
      id: 6,
      title: "The Lady Beauty Scarlett",
      author: "Arthur Doyle",
      price: "45.00",
      image: "https://c.animaapp.com/2jBM5N30/img/book16-1-2@2x.png",
    },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-full  relative">
        {/* Header section */}
        <div className="w-full relative">
          <div className="flex justify-end items-center gap-4 p-4 pr-6">
            <div className="mr-auto ml-[62px] font-semibold text-white text-[22px] tracking-[0.44px]">
              +91 8374902234
            </div>
            <img
              className="w-4 h-4"
              alt="Vector"
              src="https://c.animaapp.com/2jBM5N30/img/vector-2.svg"
            />
            <img
              className="w-[15px] h-4"
              alt="Vector"
              src="https://c.animaapp.com/2jBM5N30/img/vector-3.svg"
            />
            <img
              className="w-[17px] h-3.5"
              alt="Vector"
              src="https://c.animaapp.com/2jBM5N30/img/vector.svg"
            />
            <img
              className="w-3.5 h-3.5"
              alt="Vector"
              src="https://c.animaapp.com/2jBM5N30/img/vector-4.svg"
            />
          </div>

          <Separator className="w-[1316px] mx-auto my-4" />

          {/* Breadcrumb section */}
          <div className="w-full h-[98px] [background:linear-gradient(78deg,rgba(255,229,229,1)_0%,rgba(245,255,254,1)_100%)]">
            <div className="flex justify-center items-center h-full">
              <div className="font-medium text-[#393280] text-xl tracking-[0] leading-8 whitespace-nowrap">
                HOME&nbsp;&nbsp;/&nbsp;&nbsp;books
              </div>
            </div>
          </div>

          <BookListSection />
        </div>

        <div className="flex flex-row mt-4">
          {/* Filter sidebar */}
          
         <SideBarFilter/>
          {/* Main content */}
          <div className="flex-1 px-6">
            {/* Sorting and display options */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2.5">
                <Select defaultValue="alphabetically-az">
                  <SelectTrigger className="border-none shadow-none font-bold text-[#393280] text-base">
                    <span className="mr-1">Sort by :</span>
                    <SelectValue placeholder="Alphabetically, A-Z" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alphabetically-az">
                      Alphabetically, A-Z
                    </SelectItem>
                    <SelectItem value="alphabetically-za">
                      Alphabetically, Z-A
                    </SelectItem>
                    <SelectItem value="price-low-high">
                      Price, low to high
                    </SelectItem>
                    <SelectItem value="price-high-low">
                      Price, high to low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="font-bold text-[#393280] text-base leading-8">
                Showing 1 - 12 of 26 result
              </div>

              <div className="flex items-center gap-[11px]">
                <Select defaultValue="12">
                  <SelectTrigger className="border-none shadow-none font-bold text-[#393280] text-base">
                    <span className="mr-1">Show :</span>
                    <SelectValue placeholder="12" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="36">36</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <img
                  className="w-[23px] h-[23px]"
                  alt="Grid view"
                  src="https://c.animaapp.com/2jBM5N30/img/vector-8.svg"
                />
                <img
                  className="w-[29px] h-[23px]"
                  alt="List view"
                  src="https://c.animaapp.com/2jBM5N30/img/group-323@2x.png"
                />
              </div>
            </div>

            {/* Book grid */}
            <div className="grid grid-cols-3 gap-6 m-6 mb-10">
                
              {books.map((book) => (
                <div  key={book.id}>
                    <Card
                //   key={book.id}
                  className="w-full  bg-white border-[#e9e7df] shadow-[0px_4px_10px_#00000026] relative"
                >
                  <CardContent className="p-0 relative h-full">
                    <img
                      className="w-[260px] h-[351px] mx-auto mt-[21px] object-cover"
                      alt={book.title}
                      src={book.image}
                    />

                    {book.featured && (
                      <>
                        <div className="absolute w-[202px] h-[291px] top-[47px] left-[42px] bg-[#393280] opacity-10" />
                        <Button className="absolute w-[227px] h-11 top-[237px] left-[29px] bg-[#ed553b] rounded-none">
                          <span className="font-medium text-white text-base text-center tracking-[2.24px]">
                            ADD TO CART
                          </span>
                        </Button>
                      </>
                    )}
                    <Separator/>
                    <div className="flex flex-col items-center text-center mt-4" >
                        <h3 className="font-semibold text-[#393280] text-lg">
                            {book.title}
                        </h3>
                        <p className="font-normal text-[#888888] text-sm tracking-[0.28px]">
                            {book.author}
                        </p>
                        <p className="font-bold text-[#ed553b] text-[22px] tracking-[0.44px] mt-2">
                            $ {book.price}
                        </p>
                    </div>
                  </CardContent>
                    
                </Card>
                </div>
                
              ))}
            </div>

            {/* Pagination */}
            <Pagination className="mt-12 flex justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className="w-[49px] h-[49px]  flex items-center justify-center"
                    href="#"
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    className="w-[49px] h-[49px] rounded-full bg-[#ed553b] text-white font-semibold text-[22px]"
                    href="#"
                    isActive
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    className="w-[49px] h-[49px] rounded-full border border-[#e5e3da] font-normal text-[#888888] text-[22px]"
                    href="#"
                  >
                    2
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    className="w-[49px] h-[49px] rounded-full border border-[#e5e3da] font-normal text-[#888888] text-[22px]"
                    href="#"
                  >
                    3
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    className="w-[49px] h-[49px] rounded-full border border-[#ed553b] flex items-center justify-center"
                    href="#"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
           
          </div>
          
        </div>
        {/* =============  Footer ===========  */}
        <FilterSection />
      </div>
    </div>
  );
};
export default ListingPage