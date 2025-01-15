import { useState } from "react";
import { TCategoryDto } from "@/app/admin/category/model";
import { FilterWrapper } from "@/components/admin/crud/filter-wrapper";
import { InputField } from "@/components/forms/cleanInputs";
import { Filter } from "lucide-react";
import { ItemStatus } from "@/lib/constants";
import { CleanSelectInput } from "@/components/forms/select";

interface IFilter {
  filterOpen: boolean;
  setFilterOpen: any;
  setQuery: any;
}
export const Filters = ({ filterOpen, setFilterOpen, setQuery }: IFilter) => {
  const [modifiedData, setModifiedData] = useState<Partial<TCategoryDto>>({});
  // Function to handle field changes
  const handleLiveChange = (fieldName: string, value: any) => {
    setQuery((prevData: any) => {
      // If the value is empty, remove the key from the state
      if (value === "") {
        const { [fieldName]: _, ...rest } = prevData; // Remove the field
        return rest;
      }
      // Otherwise, update the field with the new value
      return {
        ...prevData,
        [fieldName]: value,
      };
    });

    console.log("modifiedData", modifiedData);
  };
  const handleFilter = (fieldName: string, value: any) => {
    setModifiedData((prevData: any) => {
      // If the value is empty, remove the key from the state
      // if (value === "") {
      //   const { [fieldName]: _, ...rest } = prevData; // Remove the field
      //   return rest;
      // }
      // Otherwise, update the field with the new value
      return {
        ...prevData,
        [fieldName]: value,
      };
    });
    console.log("modifiedData", modifiedData);
  };

  const FinishFilter = () => {
    setQuery((prevData: any) => {
      // Clean up modifiedData by filtering out keys with empty string values
      const cleanedData = Object.entries(modifiedData).reduce(
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
  return (
    <div>
      <FilterWrapper isOpen={filterOpen} setIsOpen={setFilterOpen}>
        <div>
          <InputField
            label={"Search"}
            name={"q"}
            // errors={errors}
            // register={register}
            handleChange={handleLiveChange}
            placeholder={"write name"}
          />
          <CleanSelectInput
            handleChange={handleFilter}
            data={ItemStatus}
            name={"status"}
            idx={"name"}
            dispIdx={"name"}
            label={"status"}
            req={false}
          />
        </div>
        <button
          onClick={FinishFilter}
          className="mr-10 flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white"
        >
          <Filter className="h-5 w-5" />
          Filter
        </button>
      </FilterWrapper>
    </div>
  );
};
