
const CataroryLoader = ({ count }: { count: number }) => {
    const items = Array(count).fill(0);
    return (
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-10 mt-4 text-center mx-auto w-full ">
            {
                items.map((val, index) => {
                    return (
                        <div key={index} role="status"
                            className="flex flex-col rounded  animate-pulse gap-y-2 w-full items-center " >
                            <div className="rounded-3xs  h-[12.0rem] object-cover w-full border-gray-200 bg-slate-400" />
                            <div className="h-2.5 bg-slate-400 rounded-full  w-32 mb-2"></div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CataroryLoader