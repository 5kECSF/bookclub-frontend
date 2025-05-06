import type {JSX} from "react";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

export const SideBarFilter = (): JSX.Element => {
    return (
        <div className="w-[280px] ml-[62px]">


            {/* Price filter */}
            <div className="flex flex-col gap-3.5 mb-6">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#393280] text-base leading-8">
                        Page
                    </h3>
                    <Separator
                        className="w-[17px] h-0.5"
                        orientation="horizontal"
                    />
                </div>

                <Separator className="w-full"/>

                <div className="flex flex-col gap-[21px]">
                    <div className="flex items-center gap-[27px]">
                        <div className="flex items-center gap-[9px]">
                    <span className="font-bold text-[#393280] text-base leading-8">
                      min
                    </span>
                            <Input className="w-[77px] h-[31.2px] border-[#eaeaea]"/>
                        </div>

                        <span
                            className="font-medium text-[#888888] text-lg text-center tracking-[0.72px] leading-[32.4px]">

                  </span>

                        <div className="flex items-center gap-[9px]">
                    <span className="font-bold text-[#393280] text-base leading-8">
                      max
                    </span>
                            <Input className="w-[77px] h-[31.2px] border-[#eaeaea]"/>
                        </div>
                    </div>


                </div>
            </div>

            {/* Filter accordions */}
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                    value="book-type"
                    className="border-b border-[#e0e0e0]"
                >
                    <AccordionTrigger className="py-2 font-bold text-[#393280] text-base">
                        Book type
                    </AccordionTrigger>
                    <AccordionContent>
                        {/* Book type filter content */}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem
                    value="availability"
                    className="border-b border-[#e0e0e0]"
                >
                    <AccordionTrigger className="py-2 font-bold text-[#393280] text-base">
                        Availability
                    </AccordionTrigger>
                    <AccordionContent>
                        {/* Availability filter content */}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem
                    value="genre"
                    className="border-b border-[#e0e0e0]"
                >
                    <AccordionTrigger className="py-2 font-bold text-[#393280] text-base">
                        Genre
                    </AccordionTrigger>
                    <AccordionContent>
                        {/* Genre filter content */}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem
                    value="language"
                    className="border-b border-[#e0e0e0]"
                >
                    <AccordionTrigger className="py-2 font-bold text-[#393280] text-base">
                        language
                    </AccordionTrigger>
                    <AccordionContent>
                        {/* Language filter content */}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Button className="w-full h-[41.6px] bg-[#393280] mt-8 text-white font-medium text-base">
                Filter
            </Button>
        </div>
    )
}