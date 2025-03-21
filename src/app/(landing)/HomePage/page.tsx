import { Separator } from "@/components/ui/separator";
import { BookRecommendationsSection } from "./sections/BookRecommendationsSection";
import { CategoriesSection } from "./sections/CategoriesSection";
import { FeaturedBookSection } from "./sections/FeaturedBookSection";
import { FooterSection } from "./sections/FooterSection";
import { GenreSelectionSection } from "./sections/GenreSelectionSection";
import { HeroSection } from "./sections/HeroSection";
import { NewReleasesSection } from "./sections/NewReleasesSection";
import { RecommendedBooksSection } from "./sections/RecommendedBooksSection";

 const HomePage = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col items-center w-full">
      <div className="bg-white w-full max-w-[1440px] relative">
        {/* New Releases section */}
        <NewReleasesSection />

        {/* Recommended Books section */}
        <RecommendedBooksSection />

        {/* Genre Selection section with title */}
        <div className="w-full flex flex-col items-center mt-16">
          <h2 className="font-['Inter',Helvetica] font-semibold text-[#173f5f] text-[32px] text-center tracking-[1.87px] mb-8">
            Select Books by Genres
          </h2>
          <GenreSelectionSection />
        </div>

        {/* Featured Book section */}
        <FeaturedBookSection />

        {/* Separator line */}
        <div className="w-full px-2.5 mt-8">
          <Separator className="h-[3px] bg-[#e0e0e0]" />
        </div>

        {/* Book Recommendations section */}
        <BookRecommendationsSection />

        {/* Categories section with title */}
        <CategoriesSection />

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