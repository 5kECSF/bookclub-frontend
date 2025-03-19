'use client'
import { Input } from '@/components/ui/Input';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from "query-string";
import { FormEvent, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Button } from './ui/Button';
import { Suspense } from 'react'

const BookSearchInput = () => {
    const router = useRouter()
    const query = useSearchParams()
    const [input, setInput] = useState(query?.get('searchText') ?? '')
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const query: { searchText: string | null, } = { searchText: input, }
        if (!input) {
            query.searchText = null

        }

        const url = qs.stringifyUrl({
            url: `${window.origin}/books`,
            query,
        }, { skipNull: true });
        router.push(url)
    }
    return (
        <form onSubmit={onSubmit} className='' data-test='search-form'>
            <div className='relative  '>
                <Input
                    data-test='search-input'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    type="text"
                    placeholder='search book'
                    className='sm:w-[400px] placeholder:text-gray-700 bg-white rounded-full'
                />
                <Button data-test='search-input-button' type='submit' className=' absolute top-0 right-0 '>
                    <AiOutlineSearch className='text-[15px]' />
                </Button>
            </div>

        </form>
    )

}
export default function Searchbar() {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <BookSearchInput />
        </Suspense>
    )
}