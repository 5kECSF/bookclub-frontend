import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

export const PaginationComponent = () => (<Pagination className="mt-12 flex justify-center">
    <PaginationContent>
        <PaginationItem className="pr-4 mr-4 pl-2 border shadow-2">
            <PaginationPrevious
                className="w-[49px] h-[49px]   flex items-center justify-center"
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

        <PaginationItem className="pl-2">
            <PaginationNext
                className="w-[49px] h-[49px]  border  flex items-center justify-center"
                href="#"
            />
        </PaginationItem>
    </PaginationContent>
</Pagination>)