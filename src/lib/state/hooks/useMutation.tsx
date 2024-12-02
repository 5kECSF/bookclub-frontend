import { MTD } from "@/lib/constants";
import useAxiosAuth from "@/lib/state/hooks/useAxioxsAuth";
import { useMutation } from "@tanstack/react-query";
import { HandleAxiosErr } from "@/lib/functions/axios.error";
import { FAIL, Resp, Succeed } from "@/lib/constants/return.const";
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
        let Err = HandleAxiosErr(e);
        console.log("||----useMutation.err", Err);
        throw e;
      }
    },
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useMakeReq = () => {
  const axiosAuth = useAxiosAuth();

  return async (
    url: string,
    body: any,
    method: MTD,
    headers?: any,
  ): Promise<Resp<any>> => {
    try {
      const response = await axiosAuth.request({
        url: `${url}`,
        method: method,
        headers: headers ? headers : AppHeaders.JSON,
        data: body,
      });
      return Succeed(response?.data);
    } catch (e: any) {
      let Err = HandleAxiosErr(e);
      return FAIL(Err.Message, Err.Status, e);
    }
  };
};
