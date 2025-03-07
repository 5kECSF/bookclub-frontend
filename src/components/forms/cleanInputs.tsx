import {CssCls, InputProps} from "./useFormInputs";
import {CleanSelectProps} from "@/components/forms/select";
import {Select} from "antd";
import {FormSvg1} from "@/components/svgs/sidebarSvgs";

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
export const CleanSearch = ({
                                idx = "name",
                                dispIdx = "name",
                                data,
                                label,
                                name,
                                handleChange,
                                req = true,
                                handleSearch
                            }: CleanSelectProps) => {

    return (
        <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
                {label} {req && <span className="text-meta-1">*</span>}
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
                <Select
                    // className={CssCls.select}
                    showSearch
                    filterOption={false}
                    onSearch={handleSearch}
                    style={{ width: "100%" }}
                    placeholder="Search to Select"
                    onChange={(e) => {
                        handleChange(name, e);
                    }}
                    options={[...data?.length > 0 ? (
                        data.map((item: any) => (
                            {
                                value: item[idx],
                                label: item[dispIdx]
                            }
                        ))
                    ):[]]}
                />
            </div>
        </div>
    );
};
export const CleanMultiSearch = ({
                                idx = "name",
                                dispIdx = "name",
                                data,
                                label,
                                name,
                                handleChange,
                                req = true,
                                handleSearch
                            }: CleanSelectProps) => {

    return (
        <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
                {label} {req && <span className="text-meta-1">*</span>}
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
                <Select
                    showSearch
                    mode={"multiple"}
                    filterOption={false}
                    onSearch={handleSearch}
                    style={{ width: "100%" }}
                    placeholder="Search to Select"
                    onChange={(e) => {
                        handleChange(name, e);
                    }}
                    options={[...data?.length > 0 ? (
                        data.map((item: any) => (
                            {
                                value: item[idx],
                                label: item[dispIdx]
                            }
                        ))
                    ):[]]}
                />
            </div>
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
        const selectedValues = Array.from(e.target.selectedOptions, (option: any) => option.value);
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
          <FormSvg1/>
        </span>
            </div>
        </div>
    );
};