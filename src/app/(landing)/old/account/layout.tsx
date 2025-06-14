import SideNavigation from "@/app/(landing)/old/account/_components/side-navigation";
import Top from "@/app/(landing)/old/account/_components/top";
import Header from "@/components/home/header";
import HomeFooter from "@/components/home/footer";
import { HeaderSection } from "@/app/(landing)/_components/common/HeaderSection";
import { FooterSection } from "@/app/(landing)/_components/common/FooterSection";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center ">
      {/*<HeaderSection />*/}
      {/*<div className="fixed inset-0  z-[-200] [background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)]"></div>*/}
      <div className="flex">
        <SideNavigation />
        <div className=" mt-10 flex min-h-[calc(100vh-5rem)] flex-1 overflow-hidden  rounded-r  px-4  sm:px-10 md:pl-14  lg:pl-12">
          <div className="md:w-[200px] " />
          <div className="h-full w-full overflow-hidden rounded-r bg-slate-200 ">
            <Top />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
