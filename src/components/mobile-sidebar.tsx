'use client'
import { routes } from '@/lib/constants'
import useMaxWidth from '@/lib/state/hooks/useScreeenQuery'
import { cn } from '@/lib/utils'
import { Drawer } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { Button } from './ui/Button'

const MobileSidebar = () => {
    const pathName = usePathname()

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const isGreater = useMaxWidth(1024)
    if (isGreater) return

    return (
        <div>
            <Button variant={'ghost'} onClick={showDrawer} className="block lg:hidden ">
                <AiOutlineMenu className='text-[20px] mr-2' />
            </Button>
            <Drawer placement="right" onClose={() => setOpen(false)} open={open}>
                <div className=" text-[14px] tracking-[0.08em]  w-full flex flex-col justify-center items-start gap-2 ">
                    {
                        routes.map((route, i) => {
                            return (
                                <Link key={i} className={cn(`${pathName === route.href ? `border-b` : null}`, ` px-2`)} href={route.href}>{route.name}</Link>
                            )
                        })
                    }
                </div>
            </Drawer>
        </div>
    )
}

export default MobileSidebar