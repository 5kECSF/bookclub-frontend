"use client";
import { Card, CardContent } from "@/components/ui/card";

import type { JSX } from "react";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { getImg, KY } from "@/lib/constants";
import { Igenre } from "@/types/db";
import Link from "next/link";
import GenreLoader from "@/components/loader/genre-loader";

export const GenreSelectionSection = (): JSX.Element => {
  // Data for genre categories to enable mapping
  const { isLoading, data, isError, isSuccess, error } = useFetch(
    [KY.genre],
    `${KY.genre}`,
  );

  const displayedData = data?.body || [];

  return (
    <div className="mt-16 flex w-full flex-col items-center gap-5">
      <h2 className="mb-8 text-center font-['Inter',Helvetica] text-[32px] font-semibold tracking-[1.87px] text-[#173f5f]">
        Select Books by Genres
      </h2>
      <section className="flex w-full flex-wrap justify-center gap-[35px] py-8 align-baseline">
        {isLoading ? (
          <GenreLoader count={6} />
        ) : (
          displayedData.map((genre: Igenre, i: number) => (
            <Link
              href={`/books?genres=${genre.name}`}
              className="mx-auto"
              key={i}
              data-test="genre-list"
            >
              <Card className="mt-5 border-none bg-transparent shadow-none">
                <CardContent className="relative p-0">
                  <div className="relative h-[136px] w-[130px] ">
                    <div className="relative -left-[25px] -top-[45px] h-[244px] w-[189px]">
                      {/*{genre.backgroundImage && (*/}
                      <img
                        className=" absolute left-0 top-[55px] h-[189px] w-[189px] object-cover"
                        alt={`.`}
                        src={"/assets/anima/image-8@2x.png"}
                      />
                      {/*)}*/}
                      <img
                        className="absolute left-[26px] top-0 h-[134px] w-[129px] rounded-2xl border-2 object-cover shadow-4"
                        alt={`${genre.name} icon`}
                        src={
                          genre?.upload ? getImg(genre.upload) : "/dummy.png"
                        }
                      />
                      <div className="font-body-normal-14px text-on-whitegrey-100 absolute left-[68px] top-[149px] whitespace-nowrap text-center text-[length:var(--body-normal-14px-font-size)] font-[number:var(--body-normal-14px-font-weight)] leading-[var(--body-normal-14px-line-height)] tracking-[var(--body-normal-14px-letter-spacing)] [font-style:var(--body-normal-14px-font-style)]">
                        {genre.name}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </section>
    </div>
  );
};
