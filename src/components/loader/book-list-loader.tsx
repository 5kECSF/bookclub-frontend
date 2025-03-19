
const BookLoader = ({ count }: { count: number }) => {
    const items = Array(count).fill(0);
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 w-full gap-4 md:gap-8 lg:gap-12  pb-10">
            {
                items.map((val, i) => {
                    return (
                        <div key={i} role="status"
                            className="flex flex-col rounded  animate-pulse  w-full items-center " >
                            <div className="rounded-3xs  w-full  h-[385.83px] object-cover border-gray-200 bg-gray-200 mb-4" />
                            <div className="h-2.5 bg-gray-200 rounded-full  w-32 my-2"></div>
                            <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2"></div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BookLoader