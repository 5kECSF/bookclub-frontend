import { Controller } from "react-hook-form";
import { Select } from "antd";
import {CssCls, InputProps} from "@/components/forms/useFormInputs";
import {FormSvg1} from "@/components/svgs/sidebarSvgs";
import {CleanSelectProps} from "@/components/forms/select";

export interface MultiSelectProps extends Omit<InputProps, "register"> {
  control: any;
  register?: any;
  idx?: string;
  dispIdx?: string;
  data: any;
  multi?: boolean;
}
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

export const CleanMultiSelect = ({
                                     idx = "name",
                                     dispIdx = "name",
                                     data,
                                     label,
                                     name,
                                     handleChange,
                                     req = true,
                                 }: CleanSelectProps) => {
    const handleMultiChange = (e: any) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option:any) => option.value);
        handleChange(name, selectedValues);
    };
    return (
        <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
                {label} {req && <span className="text-meta-1">*</span>}
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                    className={CssCls.select}
                    onChange={handleMultiChange}
                    multiple={true}
                >
                    <option value="" disabled={req}>
                        -- empty --
                    </option>
                    {data?.length > 0 ? (
                        data.map((item: any) => (
                            <option key={item[idx]} value={item[idx]}>
                                {item[dispIdx]}
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
