import { Separator } from "@/components/ui/separator";

export const BreadCrumb = () => {
  return (
    <>
      <div className="h-[98px] w-full [background:linear-gradient(78deg,rgba(255,229,229,1)_0%,rgba(245,255,254,1)_100%)]">
        <div className="flex h-full items-center justify-center">
          <div className="whitespace-nowrap text-xl font-medium leading-8 tracking-[0] text-[#393280]">
            HOME&nbsp;&nbsp;/&nbsp;&nbsp;books
          </div>
        </div>
      </div>
      <Separator className="mx-auto my-4 w-[1316px]" />
    </>
  );
};
