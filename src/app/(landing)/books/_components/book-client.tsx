'use client'
import GridView from './book-list'
import FilterSide from "./filter";
import { Filter } from '../page';
import { BsGrid3X2GapFill } from 'react-icons/bs';
import { BiMenu } from 'react-icons/bi';
import { useState } from 'react';
import {ArrowDown} from "lucide-react"
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import qs, { StringifiableRecord } from "query-string";
import { useRouter } from 'next/navigation';




const BookClient = ({ searchParams }: { searchParams: Filter }) => {
    const activeSort = searchParams.sort ? searchParams.sort.includes('-') ? 'Z-A' : 'A-Z' : 'A-Z'
    const router = useRouter()

    const handleClick = (val: string) => {
        const isDescending = val === 'A-Z' ? false : true
        const current = qs.parse(searchParams ? searchParams.toString() : '');
        const query: Filter = {
            ...current,
            sort: `${isDescending ? '-' : ""}title`,

        };


        const url = qs.stringifyUrl({
            url: `${window.location.href}`,
            query: query as StringifiableRecord,
        }, { skipNull: true });
        router.push(url)
    }



    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <li onClick={() => handleClick('A-Z')}>
                    A-Z
                </li>
            ),
        },
        {
            key: '2',
            label: (
                <li onClick={() => handleClick('Z-A')}>
                    Z-A
                </li>
            ),

        },
    ]


    const [grid, setGrid] = useState(true)
    return (
        <div className="max-w-[1400px] mx-auto px-8 sm:px-4 mt-4 min-h-[60vh]">
            <div className=" md:col-span-2 ">
                <div className="flex  items-center justify-between mb-8 mt-4 lg:mt-0 ">
                    <FilterSide />
                    <div className='text-blue-600'>
                        <span className='hidden sm:inline-block'>Sort by{" "}</span>
                        <Dropdown menu={{ items }}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    Title-{activeSort}
                                    <ArrowDown />
                                </Space>
                            </a>
                        </Dropdown>

                    </div>
                    <div className='flex gap-2 text-[30px] items-center'>
                        <BsGrid3X2GapFill onClick={() => setGrid(true)} className={`${grid ? `text-red-600` : ``} cursor-pointer`} />
                        <BiMenu onClick={() => setGrid(false)} className={`${!grid ? `text-red-600` : ``} cursor-pointer`} />
                    </div>
                </div>
                <GridView displayGrid={grid} searchParams={searchParams} />
            </div>
        </div>
    )
}


export default BookClient