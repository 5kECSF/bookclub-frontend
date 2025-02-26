import { CssCls, InputProps } from "@/components/forms/useFormInputs";
import { FormSvg1 } from "@/components/svgs/sidebarSvgs";

export interface CleanSelectProps {
  control?: any;
  idx?: string;
  dispIdx?: string;
  data: any;
  label?: string;
  name: string;
  handleChange?: any;
  req?: boolean;
  //
  errors?: any;
  placeholder?: string;
}

export const CleanSelectInput = ({
  idx = "name",
  dispIdx = "name",
  data,
  label,
  name,
  handleChange,
  req = true,
}: CleanSelectProps) => {
  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {req && <span className="text-meta-1">*</span>}
      </label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          className={CssCls.select}
          onChange={(e: any) => {
            handleChange(name, e.target.value);
          }}
        >
          <option value="" disabled={req}>
            -- empty --
          </option>
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

export interface SelectProps extends Omit<InputProps, "register"> {
  register?: any;
  idx?: string;
  dispIdx?: string;
  data: any;
  multi?: boolean;
}

export const SelectInput = ({
  idx = "name",
  dispIdx = "name",
  data,
  label,
  name,
  register,
  handleChange,
  errors,
  req = true,
}: SelectProps) => {
  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {req && <span className="text-meta-1">*</span>}
      </label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          {...register(name)}
          className={CssCls.select}
          onChange={(e: any) => {
            handleChange(name, e.target.value);
          }}
        >
          <option className="text-red-500" key={""} value={""} >
            ---
          </option>
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
      {errors[name] && <p className="text-red">{errors[name].message}</p>}
    </div>
  );
};
