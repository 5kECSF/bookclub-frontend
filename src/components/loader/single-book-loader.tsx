import React from "react";

const SingleBookLoader = () => {
    return (
        <div
            role="status"
            className="   animate-pulse w-full flex flex-col sm:flex-row justify-center gap-20 mt-4"
        >
            <div className="object-contain w-[300px] h-[400px] mb-4 bg-gray-300 rounded" />

            <div className="p-4  flex flex-col">
                <div className="h-2.5 bg-slate-400 rounded-full  w-56 mb-8"></div>
                <div className="h-2 bg-slate-400 rounded-full  mb-2.5"></div>
                <div className="h-2 bg-slate-400 rounded-full  mb-2.5"></div>
                <div className="h-2 bg-slate-400 rounded-full "></div>
                <div className="h-2 bg-slate-400 rounded-full  mb-2.5"></div>
                <div className="h-2 bg-slate-400 rounded-full "></div>
                <div className="h-14 bg-slate-400 rounded-full  w-56 my-8 self-center"></div>

                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default SingleBookLoader;
