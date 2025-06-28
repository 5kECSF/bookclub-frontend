import { EmailSvg, PassowrdSvg } from "@/components/svgs/auth-svg";
import { HTMLInputTypeAttribute, useEffect } from "react";
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
  handleChange?: any;
  placeholder: string;
  req?: boolean;
  inputType?: HTMLInputTypeAttribute;
  row?: number;
  disabled?: boolean;
}
export const InputField = ({
  label,
  name,
  register,
  handleChange,
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
        onChange={(e) => handleChange(name, e.target.value)}
        type={inputType}
        placeholder={placeholder}
        className={CssCls.input}
      />
      {errors[name] && <p className="text-red">{errors[name].message}</p>}
    </div>
  );
};

export const IntInputField = ({
  label,
  name,
  register,
  handleChange,
  placeholder,
  errors,
  req = true,
}: InputProps) => {
  useEffect(() => {
    register(name, {
      setValueAs: (value: any) => parseInt(value, 10),
    });
  }, [register, name]);
  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {req && <span className="text-meta-1">*</span>}
      </label>
      <input
        {...register(name)}
        onChange={(e) => {
          const intValue = parseInt(e.target.value, 10);
          handleChange(name, intValue);
        }}
        type="number"
        placeholder={placeholder}
        className={CssCls.input}
        required={req}
      />
      {console.log("errors:", errors)}
      {errors[name] && <p className="text-red">{errors[name].message}</p>}
    </div>
  );
};

export const DateInputField = ({
  label,
  name,
  register,
  handleChange,
  placeholder,
  errors,
  req = true,
  inputType = "text",
}: InputProps) => {
  useEffect(() => {
    register(name, {
      setValueAs: (value: any) => {
        if (!value) return null;
        const date = new Date(value);
        return isNaN(date.getTime()) ? null : date;
      },
    });
  }, [register, name]);
  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {req && <span className="text-meta-1">*</span>}
      </label>
      <input
        {...register(name)}
        onChange={(e) => {
          const intValue = parseInt(e.target.value, 10);
          handleChange(name, intValue);
        }}
        type={inputType}
        placeholder={placeholder}
        className={CssCls.input}
        required={req}
      />
      {console.log("errors:", errors)}
      {errors[name] && <p className="text-red">{errors[name].message}</p>}
    </div>
  );
};

export function EmailField({ register, errors, name }: any) {
  return (
    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Email
      </label>
      <div className="relative">
        <input
          {...register(name)}
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />

        <span className="absolute right-4 top-4">
          <EmailSvg />
        </span>
        {errors[name] && <p className="text-red">{errors[name].message}</p>}
      </div>
    </div>
  );
}
export function PasswordField({
  register,
  errors,
  placeHolder,
  label,
  name,
}: any) {
  return (
    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        {label}
      </label>
      <div className="relative">
        <input
          {...register(name)}
          type="password"
          required
          placeholder={placeHolder}
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />

        <span className="absolute right-4 top-4">
          <PassowrdSvg />
        </span>
        {errors[name] && <p className="text-red">{errors[name].message}</p>}
      </div>
    </div>
  );
}
export const TextAreaField = ({
  label,
  name,
  register,
  handleChange,
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
        onChange={(e) => handleChange(name, e.target.value)}
        rows={row}
        placeholder={placeholder}
        className={CssCls.input}
      />
      {errors[name] && <p className="text-red">{errors[name].message}</p>}
    </div>
  );
};
export const DatePickerField = ({
  label,
  name,
  register,
  handleChange,
  placeholder,
  errors,
  req = true,
}: InputProps) => {
  return (
    <div className="mb-6">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {req && <span className="text-meta-1">*</span>}
      </label>
      <input
        type="date"
        {...register(name)}
        onChange={(e) => handleChange(name, e.target.value)}
        placeholder={placeholder}
        className={CssCls.input}
      />
      {errors[name] && <p className="text-red">{errors[name].message}</p>}
    </div>
  );
};

export function Submit2({
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

export function Submit({
  isLoading,
  update,
  text,
}: {
  isLoading: boolean;
  update?: boolean;
  text?: string;
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
        "mb-5 w-full cursor-pointer rounded border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90 disabled:bg-whiter disabled:hover:bg-opacity-100 dark:bg-black dark:disabled:bg-black "
      }
    >
      {isLoading ? (
        <div>
          <Spinner />
          {text ? text : update ? "Updating" : "Creating"}
        </div>
      ) : text ? (
        text
      ) : update ? (
        "Update"
      ) : (
        "Create"
      )}
    </button>
    // </div>
  );
}
