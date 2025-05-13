import React from 'react'
import { HiOutlineBookOpen } from 'react-icons/hi2'

const ReaderCard = ({ type, text, count }: { type: string, text: string, count: number }) => {
    return (
        <div className={`${type === 'one' ? "bg-tomato" : "bg-[#926CFF]"} lg:h-[170px] rounded-lg  lg:w-[180px] h-[100px] w-[150px] flex justify-center items-center flex-col`}>
            <div className="flex gap-5 items-center justify-center">
                <div className="bg-white rounded-md ">
                    <HiOutlineBookOpen className="p-1 text-[40px] text-tomato" />
                </div>
                <p className="text-white text-[30px] ">{count}</p>
            </div>
            <p className="text-white text-3xl flex justify-center ">
                {text}
            </p>
        </div>
    )
}

export default ReaderCard