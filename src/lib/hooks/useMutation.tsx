import { MTD } from "@/lib/constants";
import useAxiosAuth from "@/lib/hooks/useAxioxsAuth";
import { useMutation } from "@tanstack/react-query";
// import axios from "axios"

const errorCodes = ["ERR_BAD_REQUEST", "ERR_BAD_RESPONSE"];
export const AppHeaders = {
  MULTIPART: {
    "Content-Type": "multipart/form-data",
  },
  JSON: {
    "Content-Type": "application/json",
    // Accept: "application/json",
  },
};
interface MutationParam {
  url: string;
  method: MTD;
  headers?: any;
  body?: any;
}
export const useMutate = (
  onSuccess: () => void = () => {},
  onError: () => void = () => {},
) => {
  const axiosAuth = useAxiosAuth();
  //@ts-ignore
  return useMutation({
    mutationFn: async (data: MutationParam) => {
      try {
        const response = await axiosAuth.request({
          url: `${data.url}`,
          method: data.method,
          // headers: AppHeaders.JSON,
          headers: data.headers ? data.headers : AppHeaders.JSON,
          data: data.body,
        });
        return response?.data;
      } catch (e: any) {
        if (e.code == "ERR_NETWORK") {
          throw new Error(e.message);
        }
        if (e?.response?.data?.error){
          throw new Error(e?.response?.data?.error);
        }
        console.log("---->>", e.response?.data?.error);
        throw e
       
      }
    },
    onSuccess: onSuccess,
    onError: onError,
  });
};
