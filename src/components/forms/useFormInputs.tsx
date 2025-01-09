import { Select } from "antd";
import { Controller } from "react-hook-form";
import { Spinner } from "../spinner";

export const CssCls = {
  input:
    "w-full rounded border-[1.5px] disabled:cursor-default disabled:bg-whiter font-medium border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary",
  select:
    "relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary",
};
export interface InputProps {
  register?: any;
  errors?: any;
  //non use Form
  label: string;
  name: string;
  changeFunc: any;
  placeholder: string;
  req?: boolean;
  inputType?: string;
  row?: number;
}
export interface SelectInput extends Omit<InputProps, "register"> {
  control: any;
  register?: any;
  idx?: string;
  dispIdx?: string;
  data: any;
  multi?: boolean;
}
export const InputField = ({
  label,
  name,
  register,
  changeFunc,
  placeholder,
  errors,
  req = true,
  inputType = "text",
}: InputProps) => {
  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {req && <span className="text-meta-1">*</span>}
      </label>
      <input
        {...register(name)}
        onChange={(e) => changeFunc(name, e.target.value)}
        type={inputType}
        placeholder={placeholder}
        className={CssCls.input}
      />
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  );
};
export const TextField = ({
  label,
  name,
  register,
  changeFunc,
  placeholder,
  errors,
  req = true,
  row = 6,
}: InputProps) => {
  return (
    <div className="mb-6">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {req && <span className="text-meta-1">*</span>}
      </label>
      <textarea
        {...register(name)}
        onChange={(e) => changeFunc(name, e.target.value)}
        rows={row}
        placeholder={placeholder}
        className={CssCls.input}
      />
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  );
};
export const SelectInput = ({
  idx = "name",
  dispIdx = "name",
  data,
  label,
  name,
  register,
  changeFunc,
  errors,
  req = true,
  multi = false,
}: SelectInput) => {
  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {req && <span className="text-meta-1">*</span>}
      </label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select {...register(name)} className={CssCls.select}>
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
          onChange=
          {(e: any) => {
            changeFunc(name, e.target.value);
          }}
        </select>
        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <FormSvg1 />
        </span>
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

export const MultiSelectWithSlug = ({
  data,
  label,
  name,
  control,
  errors,
  placeholder,
  req = true,
  multi = false,
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

export function Submit({
  isLoading,
  update,
}: {
  isLoading: boolean;
  update: boolean;
}) {
  return (
    // <div className="mb-5">
    <button
      disabled={isLoading}
      type="submit"
      // value={
      //
      // }
      className={
        "mb-5 w-full cursor-pointer rounded border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90 disabled:bg-whiter disabled:hover:bg-opacity-100 dark:disabled:bg-black "
      }
    >
      {isLoading ? (
        <div>
          <Spinner />
          {update ? "Updating" : "Creating"}
        </div>
      ) : update ? (
        "Update"
      ) : (
        "Create"
      )}
    </button>
    // </div>
  );
}

export function FormSvg1() {
  return (
    <svg
      className="fill-current"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.8">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
          fill=""
        />
      </g>
    </svg>
  );
}
