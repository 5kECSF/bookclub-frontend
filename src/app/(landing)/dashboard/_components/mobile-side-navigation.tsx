'use client'
import { Button } from '@/components/ui/button'

import useMaxWidth from '@/lib/state/hooks/useScreeenQuery'
import { Drawer } from 'antd'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { data } from './side-navigation'



const MobileSidebar = () => {
    const router = useRouter()

    const [open, setOpen] = useState(false);
    const isGreater = useMaxWidth(768)
    const showDrawer = () => {
        setOpen(true);
    };
    const pathname = usePathname();
    const activePage = (href: string): boolean => {
        if (pathname)
           return (pathname === href) || pathname.includes(href);
        return false
    }
    if (isGreater) return
    return (
        <div >
            <Button variant={'ghost'} onClick={showDrawer} className="block md:hidden ">
                <AiOutlineMenu className='text-[20px] mr-2' />
            </Button>
            <Drawer placement="right" onClose={() => setOpen(false)} open={open}>
                <div className='flex flex-col  h-full'>
                    <Image className=" px-10 object-contain" src={`/assets/image/home/Logo.png`} alt="logo" />
                    <div className="flex flex-col  items-start mt-8 ">
                        {data.map((value, i) => {
                            return (
                                <Button
                                  key={i}
                                    onClick={() => {
                                        router.push(value.href)
                                        setOpen(false)
                                    }}
                                    className="flex gap-2 "
                                >
                                    <value.icon className={` ${activePage(value.href) ? `text-black` : `text-gray-500`}`} />
                                    <h4
                                        className={`p-0 m-0 text-[14px] ${activePage(value.href) ? `text-black` : `text-gray-500`
                                            }  font-Red_Hat_Display`}
                                    >
                                        {value.name}
                                    </h4>
                                </Button>
                            );
                        })}
                    </div>
                    <div
                        className={`mt-auto px-10 text-[9px] text-gray-500  font-Red_Hat_Display`}
                    >
                        <h4 className="p-0 m-0">About</h4>
                        <h4 className="p-0 m-0">Support</h4>
                        <h4 className="p-0 m-0">Term & Condition</h4>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default MobileSidebar