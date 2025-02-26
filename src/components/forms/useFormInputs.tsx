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
  inputType?: string;
  row?: number;
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
