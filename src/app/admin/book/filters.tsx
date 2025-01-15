import { useState } from "react";
import { FilterWrapper } from "@/components/admin/crud/filter-wrapper";
import { InputField } from "@/components/forms/cleanInputs";
import { Filter } from "lucide-react";
import { TBookDto } from "@/app/admin/book/model";
import {
  CleanSelectInput,
  CleanSelectProps,
  SelectInput,
} from "@/components/forms/select";

interface IFilter {
  filterOpen: boolean;
  setFilterOpen: any;
  setQuery: any;
}
export const Filters = ({ filterOpen, setFilterOpen, setQuery }: IFilter) => {
  const [modifiedData, setModifiedData] = useState<Partial<TBookDto>>({});
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
            data={[{ name: "a" }, { name: "b" }]}
            name={"name"}
            idx={"name"}
            dispIdx={"name"}
            label={"items"}
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
