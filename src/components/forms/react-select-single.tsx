import { FC } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { SearchProps } from "./multi-select";

interface Item {
  _id: string; // Based on idx="_id"
  title: string; // Based on dispIdx="title"
  [key: string]: any; // Allow other properties
}

interface ExtendedSearchProps extends SearchProps {
  data: Item[];
  idx?: string;
  dispIdx?: string;
  handleChange: (name: string, value: string | null) => void;
  handleSearch?: (value: string) => void;
}

export const SingleSelectWithSearch: FC<SearchProps> = ({
  data,
  label,
  dispIdx = "title",
  name,
  control,
  errors,
  placeholder,
  req = true,
  idx = "_id",
  handleChange,
  handleSearch,
}) => {
  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {req && <span className="text-meta-1">*</span>}
      </label>
      <div className="relative  bg-transparent dark:bg-form-input">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              value={
                data
                  .filter((item: any) => item[idx] === field.value)
                  .map((item: any) => ({
                    value: item[idx],
                    label: item[dispIdx],
                  }))[0] || null
              }
              options={data.map((item: any) => ({
                value: item[idx],
                label: item[dispIdx],
              }))}
              isClearable={true}
              placeholder={placeholder}
              onChange={(selectedOption) => {
                const value = selectedOption ? selectedOption.value : null;
                field.onChange(value);
                handleChange(name, value);
              }}
              onInputChange={(inputValue) => {
                if (handleSearch) {
                  handleSearch(inputValue); // Updates bookQ, triggering useFetch
                }
              }}
              filterOption={null} // Disable default filtering since handleSearch fetches data
              isLoading={data.length === 0 && !!field.value} // Show loading state when data is empty but a search is in progress
              //   styles={{
              //     control: (provided) => ({
              //       ...provided,
              //       width: "100%",
              //       height: "40px",
              //       minHeight: "40px",
              //     }),
              //     menu: (provided) => ({
              //       ...provided,
              //       zIndex: 10000,
              //     }),
              //     menuPortal: (provided) => ({
              //       ...provided,
              //       zIndex: 10000, // Ensure portal z-index matches if using menuPortal
              //     }),
              //   }}
            />
          )}
        />
      </div>
      {errors[name] && <p className="text-red">{errors[name].message}</p>}
    </div>
  );
};
