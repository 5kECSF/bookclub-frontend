export const getQueryFromUrl = (queries: any) => {
  const defaultQuery = {
    page: 1,
    limit: 10,
    ...queries,
    // tags: ["a", "b", "c"],
  };
  let params: URLSearchParams;
  if (typeof window !== "undefined") {
    params = new URLSearchParams(window.location.search);
  } else {
    // Fallback for server-side without serverQuery
    params = new URLSearchParams();
  }
  const query: Record<string, any> = {};
  params.forEach((value, key) => {
    if (key in query) {
      // Handle repeated keys as arrays
      query[key] = Array.isArray(query[key])
        ? [...query[key], value]
        : [query[key], value];
    } else {
      if (value) query[key] = value.includes(",") ? value.split(",") : value;
    }
  });
  //set the default queries
  Object.entries(defaultQuery).forEach(([key, value]) => {
    if (key in query) {
    } else {
      if (value) query[key] = value;
    }
  });

  return query;
};
export const setUrl = (newQuery: Record<string, any>) => {
  const params = new URLSearchParams();
  Object.entries(newQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.length >= 1) params.set(key, value.join(",")); // Encode arrays as comma-separated values
    } else {
      if (value) params.set(key, value);
    }
  });
  window.history.replaceState(null, "", `?${params.toString()}`);
};


export function GetDateStr(date: any): string{
  if (date instanceof Date) {
    return date.toDateString()
  }else if (typeof date === 'string') {
    return new Date(date).toDateString();
  }
  else return ""
}

export function GetDateVal(date: any): Date| null{
  if (date instanceof Date) {
    return date
  }else if (typeof date === 'string') {
    return new Date(date)
  }
  else return null
}
export function IsOverdue(dueDate: Date | null): boolean {
  const givenDate=GetDateVal(dueDate)
  if(!givenDate) return false
  const currentDate = new Date();

  return givenDate < currentDate;
}