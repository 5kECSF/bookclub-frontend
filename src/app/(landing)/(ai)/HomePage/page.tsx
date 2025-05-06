import { Separator } from "@/components/ui/separator";
import { BookRecommendationsSection } from "./sections/BookRecommendationsSection";
import { FeaturedBooksSection } from "./sections/FeaturedBooksSection";
import { NewReleaseSection } from "./sections/NewReleaseSection";
import { FooterSection } from "../common/FooterSection";
import { GenreSelectionSection } from "./sections/GenreSelectionSection";
import { HeroSection } from "./sections/HeroSection";
import { HeaderSection } from "../common/HeaderSection";
import { CarouselSection } from "./sections/CarouselSection";

import type { JSX } from "react";
import {CategoriesSection} from "@/app/(landing)/(ai)/HomePage/sections/CategoriesSection";

const HomePage = (): JSX.Element => {
 return (
   <div className="bg-white flex flex-col items-center w-full">
     <div className="bg-white w-full max-w-[1440px] relative">
       {/* New Releases section */}
       <HeaderSection />

       {/* Recommended Books section */}
       <CarouselSection />
       {/* Categories Section */}
       <CategoriesSection/>

       {/* Genre Selection section with title */}
       <div className="w-full flex flex-col items-center mt-16">
         <h2 className="font-['Inter',Helvetica] font-semibold text-[#173f5f] text-[32px] text-center tracking-[1.87px] mb-8">
           Select Books by Genres
         </h2>
         <GenreSelectionSection />
       </div>

       {/* Featured Book section */}
       <NewReleaseSection />

       {/* Separator line */}
       <div className="w-full px-2.5 mt-8">
         <Separator className="h-[3px] bg-[#e0e0e0]" />
       </div>

       {/* Book Recommendations section */}
       <BookRecommendationsSection />

       {/* Categories section with title */}
       <FeaturedBooksSection />

       {/* Hero section */}
       <HeroSection />

       {/* Footer section */}
       <Separator className="h-[3px] bg-[#e0e0e0]" />
       <FooterSection />
     </div>
   </div>
 );
};
export default HomePage