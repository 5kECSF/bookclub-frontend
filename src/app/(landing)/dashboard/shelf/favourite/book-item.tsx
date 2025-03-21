'use client'
import { Button } from '@/components/ui/button'
import { getImg } from '@/lib/constants'
import { IBook } from '@/types/db'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiFillCheckCircle, AiFillStar, AiOutlineArrowRight, AiTwotoneHeart } from 'react-icons/ai'

const BookCard2 = ({ book, category }: { book: IBook, category: string }) => {
    return (
        <Link href={`/books/${book._id}`}>
            <div className='grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-7 gap-10 h-[120px] items-center bg-white rounded px-4 md:px-0'>

                <Image
                    className=" w-[100px] h-[80px] object-contain "
                    src={book?.img ? getImg(book.img) : ''}
                    height={300}
                    width={500}
                    alt='book cover'

                />
                <div className='flex flex-row md:flex-col  gap-1 col-span-2 md:col-span-1'>
                    <h3 className='font-bold text-[13px] md:text-[16px] capitalize'>{book.title}</h3>
                    <h3 className='hidden sm:block'>{book.authorName}</h3>

                </div>
                <div className=' items-center gap-3 hidden md:flex'>
                    <span>4.5/5</span>
                    <AiFillStar className='text-yellow-400' />
                </div>
                <div className=' flex-col hidden lg:flex'>
                    <span className='pr-4 text-3xs'>category</span>
                    {category}

                </div>
                <div className=' gap-2 items-center hidden lg:flex'>
                    <AiFillCheckCircle className='text-green-800' />
                    <span>Hard copy</span>
                </div>
                {!book.availableCnt ? < div className=' hidden md:flex' >
                    <div className=' bg-red-500 rounded text-white text-sm w-fit px-2'>
                        <span>checked out</span>
                    </div>
                </div> :
                    < div className=' hidden md:flex'>
                        <div className='  bg-green-500 rounded text-sm text-white w-fit px-2'>
                            <span>In shelf</span>
                        </div>
                    </div>
                }
                <div>
                    <Button variant={'ghost'}>
                        <AiTwotoneHeart className='text-[20px]' />
                    </Button>
                </div>
            </div >
        </Link>
    )
}

export default BookCard2