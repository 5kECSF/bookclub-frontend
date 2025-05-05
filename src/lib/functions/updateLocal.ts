import { KY, MTD } from "@/lib/constants";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Define types for the data structure used in the query cache
interface QueryData<T> {
  count: number;
  body: T[];
}

interface NewData<T> {
  body: T;
}

// Define a generic type for entities that have an id property
interface Identifiable {
  _id?: string | number | undefined;
}

export const updateAfterDelete = <T extends Identifiable>(
  key: KY,
  queryClient: QueryClient,
  id: T["_id"],
) => {
  queryClient.setQueryData<QueryData<T>>([key], (prevData) => {
    if (!prevData) return { count: 0, body: [] };

    return {
      count: prevData.count ? prevData.count - 1 : 0,
      body: prevData.body?.filter((item) => item._id !== id),
    };
  });
};

export const updateLocalData = <T extends Identifiable>(
  method: MTD,
  key: KY,
  queryClient: QueryClient,
  reset: () => void,
  newData: T,
  id?: T["_id"],
) => {
  try {
    console.log("local data", newData);

    if (method == MTD.POST) {
      queryClient.setQueryData<QueryData<T>>([key], (prevData: any) => {
        console.log("prev Data", prevData);
        let count = prevData?.count || 0;
        let data = prevData?.body || [];
        return {
          ...prevData,
          count: count + 1,
          body: [...data, newData],
        };
      });
      reset();
    } else {
      const currentData = queryClient.getQueryData<QueryData<T>>([key]); // { count: number, body: T[] } | undefined
      if (!currentData) return;

      const updatedData = currentData.body.map((item) => {
        if (item._id === id) {
          return { ...item, ...newData };
        }
        return item;
      });
      queryClient.setQueryData<QueryData<T>>([key], {
        ...currentData,
        body: updatedData,
      });
    }
  } catch (e: any) {
    console.log("===>>>//", e);
    toast.error(e.message);
  }
};
