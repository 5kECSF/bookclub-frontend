'use client'
import { routes } from "@/lib/constants";
import { useAuth } from "@/lib/state/context/jotai-auth";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";



export default function Nav() {
  const { user} = useAuth();
  const pathName = usePathname()
  if ((pathName === '/books') || (pathName?.startsWith('/books?'))) return (
    <div className="flex justify-center items-center bg-slate-300/50 py-6 text-sm">
      <Link href={'/'}>HOME / BOOKS</Link>
    </div>
  )

  return (
    <div className="hidden lg:flex justify-center border-t pt-4 pb-8 bg-white max-w-[1200px] mx-auto">
      <section className="hidden  flex-row justify-center lg:flex font-semibold ml-4">
        <div className=" text-[14px] tracking-[0.08em]  text-align-center w-full flex justify-center items-center gap-6 ">
          {
            routes.map((route, i) => {
              return (
                <Link key={i} className={cn(`${pathName === route.href ? `border-b` : null}`, ` px-2`)} href={route.href}>{route.name}</Link>
              )
            })
          }
          {
            user?.role === 'ADMIN' && <Link className="text-[14px] tracking-[0.08em]  font-semibold" href={'/admin'}>ADMIN</Link>
          }

        </div>
      </section >
    </div >
  );
}
