// Data for categories section
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {ArrowLeft, ArrowRight} from "lucide-react";

const categories = [
    {
        id: 1,
        title: "Higher Education",
        image: "/assets/anima/rectangle-11.png",
    },
    {
        id: 2,
        title: "Management Books",
        image: "/assets/anima/rectangle-11-1.png",
    },
    {
        id: 3,
        title: "Engineering Books",
        image: "/assets/anima/rectangle-11-2.png",
    },
];
export const CategoriesSection = () => {
    return (
        <section className="w-full">
            <div className="w-full py-16 px-20">
                <div className="mb-16">
                    <div className="flex items-center">
                        <div className="w-8 h-0.5 bg-[#ed553b]"></div>
                        <div
                            className="ml-4 font-bold text-sm tracking-[1.40px] text-[#ed553b] font-['Inter',Helvetica]">
                            Categories
                        </div>
                    </div>
                    <h2 className="mt-4 font-bold text-[32px] tracking-[0] leading-[44px] text-[#393280] font-['Inter',Helvetica]">
                        Explore our Top Categories
                    </h2>

                    <div className="flex justify-end">
                        <div className="flex gap-7">
                            <Button
                                variant="outline"
                                className="w-[49px] h-[49px] rounded-[24.36px] p-0 border-[#e5e3da]"
                            >
                                <ArrowLeft
                                    className="w-[19px] h-[11px]"
                                    // alt="Previous"
                                    // src="/assets/anima/vector-9.svg"
                                />
                            </Button>
                            <Button className="w-[49px] h-[49px] rounded-[24.36px] p-0 bg-[#ed553b]">
                                <ArrowLeft
                                    className="w-[22px] h-3.5 rotate-180"
                                    // alt="Next"
                                    // src="/assets/anima/vector-10.svg"
                                />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8 mb-12">
                    {categories.map((category) => (
                        <Card key={category.id} className="border-none shadow-none">
                            <CardContent className="p-0 flex flex-col items-center">
                                <img
                                    className="w-full h-[241px] object-cover"
                                    alt={category.title}
                                    src={category.image}
                                />
                                <h3 className="mt-8 font-semibold text-2xl text-center text-[#393280] font-['Inter',Helvetica]">
                                    {category.title}
                                </h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Button
                        variant="outline"
                        className="h-[61px] w-[197px] rounded-[7px] font-normal text-base tracking-[1.60px] leading-[35.2px] text-[#393280] border-[#393280] font-['Inter',Helvetica]"
                    >
                        VIEW MORE
                        <ArrowRight
                            className="ml-4 w-[13px] h-2.5"
                        />
                    </Button>
                </div>
            </div>
        </section>
    )
}