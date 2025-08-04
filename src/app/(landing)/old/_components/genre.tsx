"use client";
import { IGenre } from "@/app/admin/genre/model-def";
import GenreLoader from "@/components/loader/genre-loader";
import { getImg } from "@/lib/constants";
import { KY } from "@/lib/constants/routes";
import { useFetch } from "@/lib/state/hooks/useQuery";
import Image from "next/image";
import Link from "next/link";

const Genre = () => {
  const { isLoading, data, error } = useFetch(
    [KY.genre],
    `${KY.genre}`,
  );

  const displayedData = data?.body || [];

  return (
    <div className="mx-auto mt-10 md:max-w-[800px] ">
      <p className="my-8  flex justify-center text-[24px] text-[#173F5F]">
        Select Books by Genres
      </p>

      {isLoading ? (
        <GenreLoader count={6} />
      ) : error ? (
        JSON.stringify(error)
      ) : (
        <div className="grid grid-cols-2 flex-wrap sm:grid-cols-3 lg:grid-cols-6  ">
          {displayedData?.map((gener: IGenre, i: number) => {
            return (
              <Link
                href={`/books?genres=${gener.name}`}
                className="mx-auto"
                key={i}
                data-test="genre-list"
              >
                <Image
                  className=" h-[100px] w-[100px] rounded-xl object-cover shadow-lg"
                  alt=""
                  src={gener?.upload ? getImg(gener.upload) : "/dummy.png"}
                  width={500}
                  height={500}
                />
                <div data-test="genre-title" className=" ">
                  {gener.name}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Genre;
