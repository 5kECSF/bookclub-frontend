import { CarouselSection } from "@/app/(landing)/_components/sections/CarouselSection";
import { FeaturedBooksSection } from "@/app/(landing)/_components/sections/FeaturedBooksSection";
import { GenreSelectionSection } from "@/app/(landing)/_components/sections/GenreSelectionSection";
import { ContactUsSection } from "@/app/(landing)/_components/sections/ContactUsSection";
import { NewArrivalSection } from "@/app/(landing)/_components/sections/NewArrivalSection";
import { Separator } from "@/components/ui/separator";

import { CategoriesSection } from "@/app/(landing)/_components/sections/CategoriesSection";
import { AuthorsSection } from "@/app/(landing)/_components/sections/authors";
import type { JSX } from "react";

const HomePage = (): JSX.Element => {
  return (
    <div className="flex w-full flex-col items-center bg-white">
      <div className="relative w-full max-w-[1440px] bg-white">
        {/* Banner section */}
        <CarouselSection />
        {/* Categories Section */}
        <CategoriesSection />

        {/* Genre Selection section with title */}
        <GenreSelectionSection />

        {/* New Releases section */}
        <NewArrivalSection />

        {/* Separator line */}
        <div className="mt-8 w-full px-2.5">
          <Separator className="h-[3px] bg-[#e0e0e0]" />
        </div>

        {/* Book Recommendations section */}
        <AuthorsSection />

        {/* Featured Book section */}
        <FeaturedBooksSection />

        {/* Hero section */}
        <ContactUsSection />

        {/* Footer section */}
        <Separator className="h-[3px] bg-[#e0e0e0]" />
        {/*<FooterSection />*/}
      </div>
    </div>
  );
};
export default HomePage;
