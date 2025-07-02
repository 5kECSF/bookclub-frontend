import { DisplayError } from "@/lib/functions/object";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { MultiSelectProps } from "./antd-controlled-select";

export const ReactMultiSelect = ({
  data,
  label,
  name,
  control,
  errors,
  placeholder,
  req = true,
  idx = "name",
  handleChange,
  cssCls,
}: MultiSelectProps) => {
  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
      zIndex: 9999, // Set a high z-index for the dropdown menu
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999, // Ensure portal also has high z-index
    }),
  };
  return (
    <div className={"mb-4.5 " + cssCls}>
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {req && <span className="text-meta-1">*</span>}
      </label>
      <div className="z-100 relative bg-transparent dark:bg-form-input">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              closeMenuOnSelect={false}
              styles={customStyles}
              value={data
                .filter((item: any) => field.value?.includes(item[idx]))
                .map((item: any) => ({
                  value: item[idx],
                  label: item.name,
                }))}
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions
                  ? selectedOptions.map((option: any) => option.value)
                  : [];
                field.onChange(selectedValues);
                handleChange(selectedValues);
              }}
              isMulti
              placeholder={placeholder}
              options={data.map((item: any) => ({
                value: item[idx],
                label: item.name,
              }))}
            />
          )}
        />
      </div>
      {/* {console.log(JSON.stringify(errors))} */}

      {errors[name] && DisplayError(errors[name])}
    </div>
  );
};
