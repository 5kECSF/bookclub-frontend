import { Card, CardContent } from "@/components/ui/card";
export const AuthorDetails = () => {
  return (
    <Card className="h-[418px] w-[445px] overflow-hidden rounded-[10px]">
      <CardContent className="p-8">
        <div className="flex justify-between">
          <div>
            <h2 className="mb-6 text-xl">
              <span className="font-semibold text-[#f27851]">About</span>
              <span className="font-semibold text-[#4c4c4c]"> Author</span>
            </h2>
            <div className="mb-6 text-xl font-normal text-[#4c4c4c]">
              Steve Krug
            </div>
          </div>
          <img
            className="h-[101px] w-[88px]"
            alt="Author"
            src="/assets/imgrectangle-19-1.png"
          />
        </div>

        <p className="mb-6 text-[13px] leading-[16.7px] text-[#4c4c4c]">
          Steve Krug is a usability consultant who has more than 30 years of
          experience as a user advocate for companies like Apple, Netscape, AOL,
          Lexus, and others. Based in part on the success of his first book,
          Don&#39;t Make Me Think, he has become a highly sought-after speaker
          on usability design.
        </p>

        <h3 className="mb-4 text-[15px] font-bold text-[#4c4c4c]">
          Other Books
        </h3>

        <div className="flex gap-4">
          <div className="h-[99px] w-[75px] rounded-[5px] border border-solid border-[#f1f1f1] bg-[url(/assets/imgframe-52.png)] bg-cover" />
          <div className="h-[99px] w-[75px] rounded-[5px] border border-solid border-[#f1f1f1] bg-[url(/assets/imgframe-53.png)] bg-cover" />
        </div>
      </CardContent>
    </Card>
  );
};
