import { FilterDrawer } from "@/components/admin/crud/filter-drawer";
import { InputField } from "@/components/forms/cleanInputs";
import { Filter } from "lucide-react";
import React, { useState } from "react";

interface IFilterProps {
  filterOpen: boolean;
  setFilterOpen: any;
  setQuery: any;
  children: any;
}
export const FilterLayout = ({
  filterOpen,
  setFilterOpen,
  setQuery,
  children,
}: IFilterProps) => {
  const [modifiedData, setModifiedData] = useState<any>({});
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
  };
  const handleChange = (fieldName: string, value: any) => {
    setModifiedData((prevData: any) => {
      return {
        ...prevData,
        [fieldName]: value,
      };
    });
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
      <FilterDrawer isOpen={filterOpen} setIsOpen={setFilterOpen}>
        <div className="h-[80%] overflow-y-auto">
          <InputField
            label={"Search"}
            name={"q"}
            // errors={errors}
            // register={register}
            handleChange={handleLiveChange}
            placeholder={"write name"}
          />
          {React.Children.map(children, (child) => {
            // Ensure the child is a valid React element
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                //@ts-ignore
                handleChange,
              });
            }
            return child;
          })}
          {/*<CleanSelectInput*/}
          {/*  handleChange={handleFilter}*/}
          {/*  data={ItemStatus}*/}
          {/*  name={"status"}*/}
          {/*  idx={"name"}*/}
          {/*  dispIdx={"name"}*/}
          {/*  label={"status"}*/}
          {/*  req={false}*/}
          {/*/>*/}
        </div>
        <button
          onClick={FinishFilter}
          className="mr-10 flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white"
        >
          <Filter className="h-5 w-5" />
          Filter
        </button>
      </FilterDrawer>
    </div>
  );
};
