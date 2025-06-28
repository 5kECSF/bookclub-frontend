import { Dispatch, SetStateAction } from "react";

// Define a stricter type for query
interface Query {
  [key: string]: string | number | string[] | undefined;
}
interface DisplayKeys {
  [key: string]: string | number | string[] | undefined;
}

interface QueryChipsProps {
  query: Query;
  setQuery: Dispatch<SetStateAction<Query>>;
  removedKeys?: string[];
}

const QueryChips = ({ query, setQuery, removedKeys }: QueryChipsProps) => {
  const excludedKeys = [...(removedKeys || []), "page", "limit"];
  // Remove a key from query
  const removeQueryKey = (key: string) => {
    setQuery((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  // Remove an item from an array
  const removeArrayItem = (key: string, value: string) => {
    setQuery((prev) => ({
      ...prev,
      [key]: (prev[key] as string[]).filter((item) => item !== value),
    }));
  };

  return (
    <div className="m-5 flex flex-wrap items-center justify-center gap-4">
      {Object.entries(query)
        .filter(([key]) => !excludedKeys.includes(key) && !key.startsWith("_"))
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            // Handle array values (e.g., tags)
            return (
              <div key={key} className="flex flex-col">
                {value.length > 0 && (
                  <span className="font-bold capitalize">{key}</span>
                )}
                <div className="flex flex-col gap-2">
                  {value
                    .filter((item) => item !== "" && item != null)
                    .map((item) => (
                      <div
                        key={String(item)}
                        className="flex items-center rounded-full bg-blue-500 px-2 py-1"
                      >
                        <span className="text-white">{item}</span>
                        <button
                          onClick={() => removeArrayItem(key, String(item))}
                          className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            );
          } else if (
            (typeof value === "string" && value !== "") ||
            typeof value === "number"
          ) {
            // Handle string/number values
            return (
              <div
                key={key}
                className="flex items-center rounded-full bg-blue-400 px-2 py-1"
              >
                <span className="text-white">
                  {key}: {value}
                </span>
                <button
                  onClick={() => removeQueryKey(key)}
                  className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  ×
                </button>
              </div>
            );
          }
          return null; // Skip invalid/empty values
        })}
    </div>
  );
};

export default QueryChips;
