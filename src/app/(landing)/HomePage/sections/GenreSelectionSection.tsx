import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const GenreSelectionSection = (): JSX.Element => {
  // Data for genre categories to enable mapping
  const genreCategories = [
    {
      id: 1,
      name: "Prayer",
      backgroundImage: "https://c.animaapp.com/G6uUiWA6/img/image@2x.png",
      foregroundImage: "https://c.animaapp.com/G6uUiWA6/img/image-1.png",
    },
    {
      id: 2,
      name: "Leadership",
      backgroundImage: "https://c.animaapp.com/G6uUiWA6/img/image-2@2x.png",
      foregroundImage: "https://c.animaapp.com/G6uUiWA6/img/image-3.png",
    },
    {
      id: 3,
      name: "Self-help",
      backgroundImage: "https://c.animaapp.com/G6uUiWA6/img/image-4@2x.png",
      foregroundImage: "https://c.animaapp.com/G6uUiWA6/img/image-5.png",
    },
    {
      id: 4,
      name: "giving",
      foregroundImage: "https://c.animaapp.com/G6uUiWA6/img/image-6.png",
    },
    {
      id: 5,
      name: "",
      backgroundImage: "https://c.animaapp.com/G6uUiWA6/img/image-7@2x.png",
    },
    {
      id: 6,
      name: "holispirit",
      backgroundImage: "https://c.animaapp.com/G6uUiWA6/img/image-8@2x.png",
      foregroundImage: "https://c.animaapp.com/G6uUiWA6/img/image-9.png",
    },
  ];

  return (
    <section className="flex flex-wrap justify-center gap-[35px] py-8 w-full">
      {genreCategories.map((genre) => (
        <Card key={genre.id} className="border-none shadow-none bg-transparent">
          <CardContent className="p-0 relative">
            {genre.id === 1 && (
              <div className="relative w-[130px] h-[136px]">
                <div className="relative w-[189px] h-[244px] -top-[45px] -left-[25px]">
                  {genre.backgroundImage && (
                    <img
                      className="absolute w-[189px] h-[189px] top-[55px] left-0 object-cover"
                      alt={`${genre.name} background`}
                      src={genre.backgroundImage}
                    />
                  )}
                  {genre.foregroundImage && (
                    <img
                      className="w-[129px] h-[134px] top-0 left-[26px] absolute object-cover"
                      alt={`${genre.name} icon`}
                      src={genre.foregroundImage}
                    />
                  )}
                  <div className="absolute top-[149px] left-[68px] font-body-normal-14px font-[number:var(--body-normal-14px-font-weight)] text-on-whitegrey-100 text-[length:var(--body-normal-14px-font-size)] text-center tracking-[var(--body-normal-14px-letter-spacing)] leading-[var(--body-normal-14px-line-height)] whitespace-nowrap [font-style:var(--body-normal-14px-font-style)]">
                    {genre.name}
                  </div>
                </div>
              </div>
            )}

            {genre.id === 2 && (
              <div className="relative w-[124px] h-[134px]">
                <div className="relative w-[189px] h-[200px] -top-[45px] -left-[50px]">
                  {genre.backgroundImage && (
                    <img
                      className="w-[189px] h-[189px] top-[11px] left-0 absolute object-cover"
                      alt={`${genre.name} background`}
                      src={genre.backgroundImage}
                    />
                  )}
                  {genre.foregroundImage && (
                    <img
                      className="w-[133px] h-[134px] top-0 left-[50px] absolute object-cover"
                      alt={`${genre.name} icon`}
                      src={genre.foregroundImage}
                    />
                  )}
                  <div className="absolute top-[153px] left-[74px] font-body-normal-14px font-[number:var(--body-normal-14px-font-weight)] text-on-whitegrey-100 text-[length:var(--body-normal-14px-font-size)] text-center tracking-[var(--body-normal-14px-letter-spacing)] leading-[var(--body-normal-14px-line-height)] whitespace-nowrap [font-style:var(--body-normal-14px-font-style)]">
                    {genre.name}
                  </div>
                </div>
              </div>
            )}

            {genre.id === 3 && (
              <div className="relative w-[89px] h-[89px]">
                <div className="relative w-[189px] h-[197px] -top-[42px] -left-[50px]">
                  {genre.backgroundImage && (
                    <img
                      className="w-[189px] h-[189px] top-2 left-0 absolute object-cover"
                      alt={`${genre.name} background`}
                      src={genre.backgroundImage}
                    />
                  )}
                  {genre.foregroundImage && (
                    <img
                      className="w-32 h-[131px] top-0 left-[50px] absolute object-cover"
                      alt={`${genre.name} icon`}
                      src={genre.foregroundImage}
                    />
                  )}
                  <div className="absolute top-[151px] left-[81px] font-body-normal-14px font-[number:var(--body-normal-14px-font-weight)] text-on-whitegrey-100 text-[length:var(--body-normal-14px-font-size)] text-center tracking-[var(--body-normal-14px-letter-spacing)] leading-[var(--body-normal-14px-line-height)] whitespace-nowrap [font-style:var(--body-normal-14px-font-style)]">
                    {genre.name}
                  </div>
                </div>
              </div>
            )}

            {genre.id === 4 && (
              <div className="relative w-[115px] h-[120px]">
                {genre.foregroundImage && (
                  <img
                    className="w-[138px] h-[126px] -top-[38px] left-8 absolute object-cover"
                    alt={`${genre.name} icon`}
                    src={genre.foregroundImage}
                  />
                )}
                <div className="absolute w-[62px] top-[109px] left-[70px] font-body-normal-14px font-[number:var(--body-normal-14px-font-weight)] text-on-whitegrey-100 text-[length:var(--body-normal-14px-font-size)] text-center tracking-[var(--body-normal-14px-letter-spacing)] leading-[var(--body-normal-14px-line-height)] [font-style:var(--body-normal-14px-font-style)]">
                  {genre.name}
                </div>
              </div>
            )}

            {genre.id === 5 && (
              <div className="relative w-[89px] h-[89px]">
                {genre.backgroundImage && (
                  <img
                    className="w-[189px] h-[189px] -top-[34px] -left-[50px] absolute object-cover"
                    alt="Genre background"
                    src={genre.backgroundImage}
                  />
                )}
              </div>
            )}

            {genre.id === 6 && (
              <div className="relative w-[105px] h-[103px]">
                <div className="relative w-[216px] h-[196px] -top-[41px] -left-[78px]">
                  {genre.backgroundImage && (
                    <img
                      className="w-[189px] h-[189px] top-[7px] left-7 absolute object-cover"
                      alt={`${genre.name} background`}
                      src={genre.backgroundImage}
                    />
                  )}
                  {genre.foregroundImage && (
                    <img
                      className="w-[130px] h-[131px] top-0 left-0 absolute object-cover"
                      alt={`${genre.name} icon`}
                      src={genre.foregroundImage}
                    />
                  )}
                  <div className="absolute top-[150px] left-9 font-body-normal-14px font-[number:var(--body-normal-14px-font-weight)] text-on-whitegrey-100 text-[length:var(--body-normal-14px-font-size)] text-center tracking-[var(--body-normal-14px-letter-spacing)] leading-[var(--body-normal-14px-line-height)] whitespace-nowrap [font-style:var(--body-normal-14px-font-style)]">
                    {genre.name}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
