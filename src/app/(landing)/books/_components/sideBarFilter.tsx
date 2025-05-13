import { useState, type JSX } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CleanSelectInput } from "@/components/forms/select";
import { useFetch } from "@/lib/state/hooks/useQuery";
import { KY } from "@/lib/constants";
import { CleanMultiSearch } from "@/components/forms/cleanInputs";

const language = [
  { value: "", label: "All languages" },
  { value: "Amharic", label: "Amharic" },
  { value: "AfanOromo", label: "AfanOromo" },
  { value: "English", label: "English" },
  { value: "Tigrna", label: "Tigrna" },
];
export const SideBarFilter = ({ setQuery }: { setQuery: any }): JSX.Element => {
  return (
    <div className="ml-[62px] hidden w-[280px] lg:block">
      <FilterItems setQuery={setQuery} />
    </div>
  );
};

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setQuery: any;
}

export const DrawerElement = ({
  open,
  onOpenChange,
  setQuery,
}: DrawerProps) => {
  return (
    <Drawer open={open} direction="left" onOpenChange={onOpenChange}>
      <DrawerContent className="h-full w-1/2 px-8">
        <DrawerHeader>
          <DrawerTitle>Filter</DrawerTitle>
          <DrawerClose />
        </DrawerHeader>
        <DrawerDescription>
          Filter Based on book type, availability, genre, language.
        </DrawerDescription>
        <FilterItems setQuery={setQuery} />
      </DrawerContent>
    </Drawer>
  );
};

const FilterItems = ({ setQuery }: { setQuery: any }) => {
  const [filter, setFilter] = useState({});
  const FinishFilter = () => {
    setQuery((prevData: any) => {
      // Clean up modifiedData by filtering out keys with empty string values
      const cleanedData = Object.entries(filter).reduce(
        (acc: Record<string, any>, [key, value]) => {
          // If value is not an empty string, keep the key-value pair
          if (value !== "") {
            acc[key] = value;
          } else {
            // If value is empty, remove key from the existing prevData
            const { [key]: _, ...rest } = prevData; // Destructure to remove the key
            prevData = rest; // Update prevData by removing the key
          }
          return acc;
        },
        {},
      );

      // Now merge cleanedData into prevData (which no longer contains empty string keys)
      return {
        ...prevData,
        ...cleanedData,
      };
    });
  };
  const handleChange = (fieldName: string, value: any) => {
    setFilter((prevData: any) => {
      return {
        ...prevData,
        [fieldName]: value,
      };
    });
  };
  const { data: category } = useFetch([KY.category], `${KY.category}`, {
    limit: 100,
    status: "active",
  });
  const { data: genre } = useFetch([KY.genre, "100"], `${KY.genre}`, {
    limit: 100,
  });
  return (
    <div className="px-2 py-8">
      <>
        {/* Page filter */}
        {/*<div className="mb-6 flex w-full flex-col gap-3.5 ">*/}
        {/*  <div className="flex items-center justify-between">*/}
        {/*    <h3 className="text-base font-bold leading-8 text-[#393280]">Page</h3>*/}
        {/*    <Separator className="h-0.5 w-[17px]" orientation="horizontal" />*/}
        {/*  </div>*/}
        {/*  <Separator className="w-full" />*/}
        {/*  <div className="flex flex-col gap-[21px]">*/}
        {/*    <div className="flex items-center gap-[27px]">*/}
        {/*      <div className="flex items-center gap-[9px]">*/}
        {/*        <span className="text-base font-bold leading-8 text-[#393280]">*/}
        {/*          min*/}
        {/*        </span>*/}
        {/*        <Input className="h-[31.2px] w-[77px] border-[#eaeaea]" />*/}
        {/*      </div>*/}
        {/*      <span className="text-center text-lg font-medium leading-[32.4px] tracking-[0.72px] text-[#888888]"></span>*/}
        {/*      <div className="flex items-center gap-[9px]">*/}
        {/*        <span className="text-base font-bold leading-8 text-[#393280]">*/}
        {/*          max*/}
        {/*        </span>*/}
        {/*        <Input className="h-[31.2px] w-[77px] border-[#eaeaea]" />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </>

      {/* Filter accordions */}
      <Accordion type="multiple" className="w-full">
        {/* =========.  == BOOK Category  ================*/}
        <AccordionItem value="book-type" className="border-b border-[#e0e0e0]">
          <AccordionTrigger className="py-2 text-base font-bold text-[#393280]">
            Book Category
          </AccordionTrigger>
          <AccordionContent>
            <CleanSelectInput
              data={category?.body || []}
              name={"categoryName"}
              handleChange={handleChange}
              idx={"name"}
              dispIdx={"name"}
              label={""}
              req={false}
            />
          </AccordionContent>
        </AccordionItem>
        {/* =========.  == BOOK Genre  ================*/}
        <AccordionItem value="genre" className="border-b border-[#e0e0e0]">
          <AccordionTrigger className="py-2 text-base font-bold text-[#393280]">
            Genre
          </AccordionTrigger>
          <AccordionContent>
            <CleanMultiSearch
              handleSearch={(e: string) => {
                // setGenQ(e);
              }}
              handleChange={handleChange}
              data={genre?.body || []}
              name={"genres"}
              idx={"name"}
              filterOptions={true}
              dispIdx={"name"}
              label={"Genre"}
              req={false}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="availability"
          className="border-b border-[#e0e0e0]"
        >
          <AccordionTrigger className="py-2 text-base font-bold text-[#393280]">
            Availability
          </AccordionTrigger>
          <AccordionContent>
            {/* Availability filter content */}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="language" className="border-b border-[#e0e0e0]">
          <AccordionTrigger className="py-2 text-base font-bold text-[#393280]">
            language
          </AccordionTrigger>
          <AccordionContent className={"p-4"}>
            <RadioGroup defaultValue="">
              {language.map((val, i) => {
                return (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem value={val.value} id={val.value} />
                    <Label htmlFor={val.value}>{val.label}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/*=================.   Submit Button ==========.  */}

      <Button
        onClick={FinishFilter}
        className="mt-8 h-[41.6px] w-full bg-[#393280] text-base font-medium text-white"
      >
        Filter
      </Button>
    </div>
  );
};
