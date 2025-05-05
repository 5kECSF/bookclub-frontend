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
  const [selected, setSelected] = useState<Option[]>([]);
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

  // Handle selection
  const handleSelect = (option: Option) => {
    let newSelected: Option[];
    if (selected.some((item) => item[value] === option[value])) {
      newSelected = selected.filter((item) => item[value] !== option[value]);
    } else {
      newSelected = [...selected, option];
    }
    setSelected(newSelected);
    onChange(newSelected.map((item) => item[value]));
  };

  // Handle tag removal
  const handleRemove = (optionValue: any) => {
    const newSelected = selected.filter((item) => item[value] !== optionValue);
    setSelected(newSelected);
    onChange(newSelected.map((item) => item[value]));
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 rounded-md bg-white p-2">
        {selected.length > 0 ? (
          selected.map((item) => (
            <span
              key={item[value]}
              className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800"
            >
              {item[label]}
              <button
                type="button"
                className="ml-1 text-blue-800 hover:text-blue-900"
                onClick={() => handleRemove(item[value])}
              >
                ×
              </button>
            </span>
          ))
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </div>

      {/* Dropdown Trigger */}
      <button
        type="button"
        className="mt-1 w-full rounded-md border p-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0 ? `${selected.length} selected` : "Select options"}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-lg">
          {options.map((option) => (
            <label
              key={option[value]}
              className="hover:bg-gray-100 flex cursor-pointer items-center px-4 py-2"
            >
              <input
                type="checkbox"
                checked={selected.some((item) => item[value] === option[value])}
                onChange={() => handleSelect(option)}
                className="mr-2"
              />
              {option[label]}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
