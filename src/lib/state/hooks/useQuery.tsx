import useAxiosAuth from "@/lib/state/hooks/useAxioxsAuth";
import { useQuery } from "@tanstack/react-query";
const buildQuery = (params: Record<string, any>) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => queryParams.append(key, val));
    } else {
      queryParams.append(key, value);
    }
  });

  return queryParams.toString();
};

export const useFetch = (
  queryKey: string[],
  url: string,
  params = {},
  refetchInterval: number = 10000,
) => {
  //Todo Make a build query function
  const axiosAuth = useAxiosAuth();
  const defaultParams = {
    limit: 25,
    ord: "updated_at",
    dir: "desc",
    ...params,
  };
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const queryString = buildQuery(defaultParams);
        const response = await axiosAuth.get(`${url}?${queryString}`);
        console.log("rssp", response);
        return response.data;
      } catch (e: any) {
        console.log("--response.mes", e.message);
        if (e?.response) {
          //Server Responded with an error
          console.log(
            "--SERVER RESPONDED WITH ERROR",
            e.response.status,
            e.response?.data?.error,
          );
          throw new Error(e?.response?.data?.error);
        } else if (e.request) {
          //Request made but no response(network issues, timeout)
          console.log("--response.mes", e.request);
        } else {
          console.error("Request setup error:", e.message);
        }
        // throw e;
        return [];
      }
    },
    refetchInterval,
  });
};
