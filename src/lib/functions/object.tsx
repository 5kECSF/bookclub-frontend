import { ReactElement } from "react";

export const isEmptyObject = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length === 0;
};

//
export const DisplayErrors = (obj: Record<string, any>) => {
  const data = Object.entries(obj).map(
    ([key, val]) => `${key}: ${val.message}`,
  );
  return data.map((item, idx) => (
    <li key={idx} className="text-red">
      {item}
    </li>
  ));
};
export const DisplayError = (obj: any): ReactElement => {
  if (Array.isArray(obj)) {
    return DisplayError(obj[0]);
  } else if (typeof obj === "string") {
    return <li className="text-red">{obj}</li>;
  } else if (typeof obj === "object" && obj !== null) {
    if (obj.message) {
      return <li className="text-red">{obj.message}</li>;
    } else {
      return <li className="text-red">{JSON.stringify(obj)}</li>;
    }
  } else {
    return <li className="text-red">{JSON.stringify(obj)}</li>;
  }
};
