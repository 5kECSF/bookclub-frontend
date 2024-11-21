import { FormSvg1, InputProps, CssCls } from "./useFormInputs";
import { Controller } from "react-hook-form";
import { Select } from "antd";

interface SelectInput {
  control?: any;
  idx?: string;
  dispIdx?: string;
  data: any;
  label?: string;
  name: string;
  changeFunc: any;
  req?: boolean;
  //
  errors?: any;
  placeholder?: string;
}
export const SelectInput = ({
  idx = "name",
  dispIdx = "name",
  data,
  label,
  name,
  changeFunc,
  req = true,
}: SelectInput) => {
  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {req && <span className="text-meta-1">*</span>}
      </label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          className={CssCls.select}
          onChange={(e: any) => {
            changeFunc(name, e.target.value);
          }}
        >
          {data?.length > 0 ? (
            data.map((domain: any) => (
              <option key={domain[idx]} value={domain[idx]}>
                {domain[dispIdx]}
              </option>
            ))
          ) : (
            <option className="text-red-500" disabled>
              no data
            </option>
          )}
        </select>
        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <FormSvg1 />
        </span>
      </div>
    </div>
  );
};
export const InputField = ({
  label,
  name,
  changeFunc,
  placeholder,
  req = true,
  inputType = "text",
}: InputProps) => {
  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {req && <span className="text-meta-1">*</span>}
      </label>
      <input
        onChange={(e) => changeFunc(name, e.target.value)}
        type={inputType}
        placeholder={placeholder}
        className={CssCls.input}
      />
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
  changeFunc,
}: SelectInput) => {
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
                changeFunc(name, e);
              }}
              options={data.map((item: any) => ({
                value: item[idx],
                label: item.name,
              }))}
            />
          )}
        />
      </div>
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  );
};
