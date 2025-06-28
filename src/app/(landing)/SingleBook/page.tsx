"use client";
import { KY } from "@/lib/constants/routes";
import { getQueryFromUrl } from "@/lib/functions/url";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type JSX } from "react";
import { ContentSection } from "./ContentSection";
import { BottomTabsSection } from "./bookBottomTabs";
export const bookInfo = {
  title: "Don't Make Me Think",
  author: "Steve Krug",
  year: "2000",
  edition: "Second Edition",
  rating: "5.0",
  currentlyReading: "25",
  haveRead: "119",
  publishDate: "2000",
  publisher: "New Riders Press",
  language: "English",
  pages: "216",
  location: "CS A-15",
};

const SingleBook = (): JSX.Element => {
  const [query, setQuery] = useState<Record<string, any>>(getQueryFromUrl({}));
  const router = useRouter();
  const { isLoading, data } = useFetch(
    [KY.book, query._bookId],
    `${KY.book}/${query._bookId}`,
    {},
  );
  console.log(data);
  useEffect(() => {
    setQuery(getQueryFromUrl({}));
  }, []);
  return (
    <div className="flex w-full flex-col items-center bg-white">
      <div className="w-full max-w-[1440px] bg-white">
        <div className="mx-5 h-full w-full overflow-y-auto rounded-[10px] px-6 py-10">
          <div className="h-full w-full rounded-[0px_10px_10px_0px]">
            {/* Back to results button */}
            <button
              onClick={() => router.back()}
              className="mb-8 flex items-center gap-[9px]"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <div className="text-[15px] font-normal leading-[19.3px] text-[#4c4c4c]">
                Back to results
              </div>
            </button>

            <div className="flex flex-col gap-6">
              <ContentSection book={data || {}} />
              <BottomTabsSection bookInfo={bookInfo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleBook;
