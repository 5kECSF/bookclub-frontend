
const GenreLoader = ({ count }: { count: number }) => {
    const items = Array(count).fill(0);
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 w-full  ">
            {
                items.map((val, i) => {
                    return (
                        <div key={i} role="status"
                            className="flex flex-col rounded  animate-pulse gap-y-2 w-full items-center " >
                            <div className="rounded-3xs  w-[100px] h-[100px] object-cover  border-gray-200 bg-slate-400" />
                            <div className="h-2.5 bg-slate-400 rounded-full  w-12 mb-2"></div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default GenreLoader