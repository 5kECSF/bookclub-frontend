"use client";
import { routes } from "@/lib/constants";
import useMaxWidth from "@/lib/state/hooks/useScreeenQuery";
import { cn } from "@/lib/utils";
import { Drawer } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "../ui/button";

const MobileSidebar = () => {
  const pathName = usePathname();

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const isGreater = useMaxWidth(1024);
  if (isGreater) return;

  return (
    <div>
      <Button
        variant={"ghost"}
        onClick={showDrawer}
        className="block lg:hidden "
      >
        <AiOutlineMenu className="mr-2 text-[20px]" />
      </Button>
      <Drawer placement="right" onClose={() => setOpen(false)} open={open}>
        <div className=" flex w-full  flex-col items-start justify-center gap-2 text-[14px] tracking-[0.08em] ">
          {routes.map((route, i) => {
            return (
              <Link
                key={i}
                className={cn(
                  `${pathName === route.href ? `border-b` : null}`,
                  ` px-2`,
                )}
                href={route.href}
              >
                {route.name}
              </Link>
            );
          })}
        </div>
      </Drawer>
    </div>
  );
};

export default MobileSidebar;
