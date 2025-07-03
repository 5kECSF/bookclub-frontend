import HomeFooter from "@/components/home/old/footer";
import Header from "@/components/home/old/header";
import Categories from "./_components/catagory";
import Genre from "./_components/genre";
import LatestBook from "./_components/latest-book";
import MainBanner from "./_components/main-banner";
import SubBanner from "./_components/sub-banner";

export default function Home() {
  return (
    <main className=" min-h-screen  w-full ">
      {/*<Layout/>*/}
      <Header />
      <MainBanner />
      <Categories />
      <Genre />
      <LatestBook />
      <SubBanner />
      <div className="m-10 flex items-center justify-center ">
        <div className=" p-8">
          <div className="flex justify-center">
            <div className=" flex items-center justify-center text-[2rem]  font-semibold tracking-[1.87px]">
              Still not sure?
            </div>
          </div>

          <div className="m-6 flex justify-center">
            <div className="flex items-center justify-center  leading-[1.88rem] tracking-[1.29px] md:w-[400px]">
              Jump start your book reading by quickly check through the popular
              book categories. 1000+ books are published by different authors
              everyday. Buy your favourite books on TreeBooks Today.
            </div>
          </div>

          <div className="flex justify-center">
            <button className="rounded-6xs border-darkslateblue-200 box-border  flex h-[3.81rem] w-[12.31rem] cursor-pointer items-center justify-center border-[1px] border-solid bg-[transparent] p-0">
              <div className=" font-body-normal-14 text-darkslateblue-200 text-left text-[1rem] uppercase leading-[220%] tracking-[0.1em]">
                READ FAQ
              </div>
            </button>
          </div>
        </div>
      </div>
      <HomeFooter />
    </main>
  );
}
