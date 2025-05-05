"use client";

import { useEffect, useRef, useState } from "react";

interface Option {
  [key: string]: any;
}

interface MultiSelectProps {
  options: Option[];
  label: string;
  value: string;
  placeholder?: string;
  onChange: (selectedValues: any[]) => void;
}

export default function MultiSelect({
  options,
  label,
  value,
  placeholder = "Select options...",
  onChange,
}: MultiSelectProps) {
  const [selectedValues, setSelectedValues] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle selection changes
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value,
    );
    setSelectedValues(selectedOptions);
    onChange(selectedOptions);
  };

  // Handle tag removal
  const handleRemove = (valueToRemove: any) => {
    const newSelectedValues = selectedValues.filter(
      (val) => val !== valueToRemove,
    );
    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative  my-10 w-full max-w-md" ref={dropdownRef}>
      {/* Selected Tags */}

      {/* Dropdown Trigger */}
      <button
        type="button"
        className="mt-1 w-full rounded-md border bg-white p-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={toggleDropdown}
      >
        {selectedValues.length >= 5 ? `${selectedValues.length} selected` : ""}
        {
          <div className="flex flex-wrap gap-2 rounded-md bg-white p-2">
            {selectedValues.length > 0 && selectedValues.length < 5 ? (
              selectedValues.map((val) => {
                const option = options.find((opt) => opt[value] == val);
                return (
                  <span
                    key={val}
                    className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800"
                  >
                    {option ? option[label] : val}
                    <button
                      type="button"
                      className="ml-1 text-blue-800 hover:text-blue-900"
                      onClick={() => handleRemove(val)}
                    >
                      ×
                    </button>
                  </span>
                );
              })
            ) : (
              <></>
            )}
          </div>
        }
      </button>

      {/* Dropdown Menu (Select) */}
      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-lg">
          <select
            multiple
            value={selectedValues}
            onChange={handleChange}
            className="w-full bg-transparent p-2 focus:outline-none"
            size={Math.min(options.length, 5)} // Show up to 5 options at a time
          >
            {options.map((option) => (
              <option key={option[value]} value={option[value]}>
                {option[label]}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
