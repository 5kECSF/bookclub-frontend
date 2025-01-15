import { CssCls, InputProps } from "./useFormInputs";

export const InputField = ({
  label,
  name,
  handleChange,
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
        onChange={(e) => handleChange(name, e.target.value)}
        type={inputType}
        placeholder={placeholder}
        className={CssCls.input}
      />
    </div>
  );
};
