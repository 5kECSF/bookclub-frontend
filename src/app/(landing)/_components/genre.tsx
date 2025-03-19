'use client'
import GenreLoader from '@/components/loader/genre-loader';
import { KY, getImg } from '@/lib/constants';
import { useFetch } from '@/lib/state/hooks/useQuery';
import { Igenre } from '@/types/db';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Genre = () => {
    const { isLoading, data, isError, isSuccess, error } = useFetch(
        [KY.genre],
        `${KY.genre}`,

    );

    const displayedData = data?.body||[]

    return (
        <div className="mt-10 md:max-w-[800px] mx-auto ">
            <p className="text-[24px]  flex justify-center my-8 text-[#173F5F]">
                Select Books by Genres
            </p>


            {
                isLoading ? <GenreLoader count={6} /> : error ? JSON.stringify(error) :
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6  ">
                        {displayedData?.map((gener: Igenre, i: number) => {
                            return (
                                <Link href={`/books?genres=${gener.name}`} className="mx-auto" key={i} data-test='genre-list' >
                                    <Image
                                        className=" rounded-xl w-[100px] h-[100px] object-cover shadow-lg"
                                        alt=""
                                        src={gener?.img ? getImg(gener.img) : ''}
                                        width={500}
                                        height={500}
                                    />
                                    <div data-test='genre-title' className=" ">
                                        {gener.name}
                                    </div>
                                </Link>
                            );
                        })
                        }
                    </div >
            }

        </div>

    )
}

export default Genre