import MainBanner from "./_components/main-banner";
import Categories from "./_components/catagory";
import SubBanner from "./_components/sub-banner";
import HomeFooter from "@/components/footer";
import Header from "@/components/header";
import Genre from "./_components/genre";
import LatestBook from "./_components/latest-book";


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
      <div className="flex m-10 justify-center items-center ">
        <div className=" p-8">
          <div className="flex justify-center">
            <div className=" text-[2rem] tracking-[1.87px] font-semibold flex  justify-center items-center">
              Still not sure?
            </div>
          </div>

          <div className="flex m-6 justify-center">
            <div className="tracking-[1.29px] leading-[1.88rem] md:w-[400px]  flex justify-center items-center">
              Jump start your book reading by quickly check through the popular
              book categories. 1000+ books are published by different authors
              everyday. Buy your favourite books on TreeBooks Today.
            </div>

          </div>

          <div className="flex justify-center">
            <button className="cursor-pointer p-0 bg-[transparent]  rounded-6xs box-border w-[12.31rem] h-[3.81rem] border-[1px] border-solid border-darkslateblue-200 flex justify-center items-center">

              <div className=" text-[1rem] tracking-[0.1em] leading-[220%] uppercase font-body-normal-14 text-darkslateblue-200 text-left">
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

