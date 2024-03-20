import React from "react";
import "@/css/style.css";

export function AuthLayout({children, title}) {
    return (
        <div className='flex  justify-center  items-center h-screen'>
            <div
                className="w-1/2  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap  items-center self-center">
                    {/*<SidebarImage />*/}

                    {/*<div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">*/}
                    <div className="w-full border-stroke dark:border-strokedark ">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">

                            <span className="mb-1.5 block font-medium">Start your Journey</span>
                            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                {title}
                            </h2>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}