
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const communityReviews = [
    { category: "PACE", tag: "Meandering", percentage: "100%" },
    { category: "ENJOYABILITY", tag: "Interesting", percentage: "100%" },
    { category: "DIFFICULTY", tag: "Advanced", percentage: "100%" },
    {
        category: "GENRES",
        tags: [
            { name: "Horror", percentage: "66%" },
            { name: "Mystery", percentage: "33%" },
        ],
    },
    {
        category: "MOOD",
        tags: [
            { name: "Ominous", percentage: "25%" },
            { name: "Scientific", percentage: "25%" },
        ],
    },
    {
        category: "IMPRESSIONS",
        tags: [
            { name: "Overhyped", percentage: "50%" },
            { name: "Forgettable", percentage: "50%" },
        ],
    },
    { category: "LENGTH", tag: "Short", percentage: "100%" },
];

export const CommunityReview=()=>{
    return (
        <Card className="w-[507px] rounded-[5px] border border-solid border-[#dddddd]">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-[#4c4c4c] text-[22px]">
                  Community Reviews
                </h2>
                <span className="font-bold text-[#f76b56] text-[15px] underline">
                          Feedback?
                        </span>
              </div>

              <div className="flex flex-col gap-1">
                {communityReviews.map((review, index) => (
                    <div
                        key={index}
                        className="h-[29px] flex items-center"
                    >
                      <div className="w-[70px] font-semibold text-[#666666] text-[11.2px] tracking-[0.50px]">
                        {review.category}
                      </div>

                      {review.tag && (
                          <Badge className="ml-2 bg-transparent text-[#333333] border border-solid border-[#cccccc] rounded-2xl font-semibold text-xs">
                            {review.tag}{" "}
                            <span className="text-[#767676]">
                                  {" "}
                              {review.percentage}
                                </span>
                          </Badge>
                      )}

                      {review.tags &&
                          review.tags.map((tag, tagIndex) => (
                              <Badge
                                  key={tagIndex}
                                  className="ml-2 bg-transparent text-[#333333] border border-solid border-[#cccccc] rounded-2xl font-semibold text-[11px]"
                              >
                                {tag.name}{" "}
                                <span className="text-[#767676]">
                                    {" "}
                                  {tag.percentage}
                                  </span>
                              </Badge>
                          ))}
                    </div>
                ))}
              </div>

              <div className="mt-6 font-bold text-[#4c4c4c] text-sm underline">
                Add your community review
              </div>
            </CardContent>
          </Card>
    )
}