import React from "react";

const QueryChips = ({ query, setQuery }: { query: any; setQuery: any }) => {
  // Function to remove a key from query
  const removeQueryKey = (key: string) => {
    setQuery((prev: any) => {
      const { [key]: _, ...rest } = prev; // Remove key from query object
      return rest;
    });
  };

  // Function to remove an item from an array (in case of tags, for example)
  const removeArrayItem = (key: string, value: string) => {
    setQuery((prev: any) => ({
      ...prev,
      [key]: prev[key].filter((item: string) => item !== value),
    }));
  };

  return (
    <div className="m-5 flex flex-wrap items-center justify-center space-x-4">
      {Object.entries(query)
        .filter(
          ([key]) => key !== "page" && key !== "limit" && !key.startsWith("_"),
        ) // Exclude page, limit, and keys starting with "_"
        .map(([key, value]) => {
          // If the value is an array, handle it differently
          if (Array.isArray(value)) {
            return (
              <div key={key} className="flex flex-col ">
                <span className="font-bold">{value.length > 0 && key}</span>
                <div className="flex flex-col  space-y-2">
                  {value
                      .filter((item) => item.trim() !== "")
                      .map((item) => (
                          <div
                              key={item}
                              className="flex items-center space-x-1 rounded-full bg-blue-500"
                          >
                            <span className="pl-2 text-white">{item}</span>

                            <button
                                onClick={() => removeArrayItem(key, item)}
                                className="m-0 flex h-5 w-5 items-center justify-center rounded-full text-slate-50"
                            >
                              &times;
                            </button>
                          </div>
                      ))}
                </div>
              </div>
            );
          } else if (typeof value === "string" || typeof value === "number") {
            // If the value is not an array, just render the chip
            return (
              <div
                key={key}
                className="flex items-center space-x-1 rounded-full bg-blue-400"
              >
                <span className=" py-1 pl-2 text-white">
                  {key}: {value}
                </span>
                <button
                  onClick={() => removeQueryKey(key)}
                  className="flex h-6 w-6 items-center justify-center rounded-full  text-slate-50"
                >
                  &times;
                </button>
              </div>
            );
          }
        })}
    </div>
  );
};

export default QueryChips;
