
const LatestBookLoader = ({ count }: { count: number }) => {
    const items = Array(count).fill(0);
    return (
        <div className="grid m-10  grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 ">
            {
                items.map((val, i) => {
                    return (
                        <div key={i} role="status"
                            className="flex flex-col rounded  animate-pulse  w-full items-start " >
                            <div className="rounded-3xs w-[7.69rem] h-[10.63rem]  object-cover border-gray-200 bg-slate-400 " />
                            <div className="h-1 bg-slate-400 rounded-full w-16 my-1"></div>
                            <div className="h-2.5 bg-slate-400 rounded-full  w-32 mb-2"></div>
                            <div className="h-2.5 bg-slate-400 rounded-full w-24 mb-2"></div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default LatestBookLoader