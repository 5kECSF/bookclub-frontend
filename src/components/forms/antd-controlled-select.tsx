import { InputProps } from "@/components/forms/useFormInputs";
import { Select } from "antd";
import { Controller } from "react-hook-form";

export interface MultiSelectProps extends Omit<InputProps, "register"> {
  control: any;
  register?: any;
  idx?: string;
  dispIdx?: string;
  data: any;
  multi?: boolean;
}
export interface SearchProps extends Omit<InputProps, "register"> {
  control: any;
  register?: any;
  idx?: string;
  dispIdx?: string;
  data: any;
  multi?: boolean;
  handleSearch?: any;
}

export const SingleSelectWithSearch = ({
  data,
  label,
  dispIdx = "name",
  name,
  control,
  errors,
  placeholder,
  req = true,
  idx = "name",
  handleChange,
  handleSearch,
}: SearchProps) => {
  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {req && <span className="text-meta-1">*</span>}
      </label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <Controller
          name={name}
          control={control}
          //@ts-ignore
          render={({ field }, i: number) => (
            <Select
              key={i}
              value={field.value}
              showSearch
              allowClear
              style={{ width: "100%", height: "40px" }}
              placeholder={placeholder}
              filterOption={false}
              onSearch={handleSearch}
              onChange={(e) => {
                field.onChange(e);
                // console.log("---", e)
                handleChange(name, e);
              }}
              options={data.map((item: any) => ({
                value: item[idx],
                label: item[dispIdx],
              }))}
            />
          )}
        />
      </div>
      {errors[name] && <p className="text-red">{errors[name].message}</p>}
    </div>
  );
};

//=====================   Unused =================

export const MultiSelectWithSlug = ({
  data,
  label,
  name,
  control,
  errors,
  placeholder,
  req = true,
  multi = false,
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
          //@ts-ignore
          render={({ field }, i: number) => (
            <Select
              key={i}
              value={field.value}
              mode="multiple"
              allowClear
              style={{ width: "100%", height: "40px" }}
              placeholder={placeholder}
              onChange={(e) => {
                field.onChange(e);
                // console.log("---", e)
                handleChange(name, e);
              }}
              options={data.map((item: any) => ({
                value: item.slug,
                label: item.slug,
              }))}
            />
          )}
        />
      </div>
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  );
};

export const MultiSelectWithName = ({
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
          //@ts-ignore
          render={({ field }, i: number) => (
            <Select
              key={i}
              value={field.value}
              mode="multiple"
              allowClear
              style={{ width: "100%", height: "40px" }}
              placeholder={placeholder}
              onChange={(e) => {
                field.onChange(e);
                // console.log("---", e)
                handleChange(name, e);
              }}
              options={data.map((item: any) => ({
                value: item[idx],
                label: item.name,
              }))}
            />
          )}
        />
      </div>
      {errors[name] && <p className="text-red">{errors[name].message}</p>}
    </div>
  );
};
