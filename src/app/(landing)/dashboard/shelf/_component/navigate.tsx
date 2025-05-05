'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navigate() {
  const path = usePathname()
  const favouriteActive = path?.includes('favourite')
  const allBookActive = path === '/dashboard/shelf'
  return (
    <div className="grid grid-cols-2 md:flex md:gap-10 lg:gap-20">
      <Link href={'/dashboard/shelf'} className={`${allBookActive ? `text-red-700` : `text-gray-100`}`}>All books</Link>
      <Link href={'/dashboard/shelf/favourite'} className={`${favouriteActive ? `text-red-700` : `text-gray-100`}`}>Favourite</Link>
      <Link href={'/dashboard/shelf/favourite'} className="text-gray-100">Borrowed Books</Link>
      <Link href={'/dashboard/shelf/favourite'} className="text-gray-100">Read Books</Link>
    </div >
  );
}
