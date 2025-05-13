import { Separator } from "@/components/ui/separator";
import { FeaturedBooksSection } from "@/app/(landing)/_components/sections/FeaturedBooksSection";
import { NewReleaseSection } from "@/app/(landing)/_components/sections/NewReleaseSection";
import { GenreSelectionSection } from "@/app/(landing)/_components/sections/GenreSelectionSection";
import { HeroSection } from "@/app/(landing)/_components/sections/HeroSection";
import { CarouselSection } from "@/app/(landing)/_components/sections/CarouselSection";

import type { JSX } from "react";
import { CategoriesSection } from "@/app/(landing)/_components/sections/CategoriesSection";
import { AuthorsSection } from "@/app/(landing)/_components/sections/authors";

const HomePage = (): JSX.Element => {
  return (
    <div className="flex w-full flex-col items-center bg-white">
      <div className="relative w-full max-w-[1440px] bg-white">
        {/* New Releases section */}
        {/*<HeaderSection />*/}

        {/* Recommended Books section */}
        <CarouselSection />
        {/* Categories Section */}
        <CategoriesSection />

        {/* Genre Selection section with title */}
        <GenreSelectionSection />

        {/* Featured Book section */}
        <NewReleaseSection />

        {/* Separator line */}
        <div className="mt-8 w-full px-2.5">
          <Separator className="h-[3px] bg-[#e0e0e0]" />
        </div>

        {/* Book Recommendations section */}
        <AuthorsSection />

        {/* Categories section with title */}
        <FeaturedBooksSection />

        {/* Hero section */}
        <HeroSection />

        {/* Footer section */}
        <Separator className="h-[3px] bg-[#e0e0e0]" />
        {/*<FooterSection />*/}
      </div>
    </div>
  );
};
export default HomePage;
