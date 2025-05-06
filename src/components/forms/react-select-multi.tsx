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
}: MultiSelectProps) => {
  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {req && <span className="text-meta-1">*</span>}
      </label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              closeMenuOnSelect={false}
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
      {DisplayError(errors[name])}
      {/* {errors[name] && <p className="text-red">{errors[name].message}</p>} */}
    </div>
  );
};
