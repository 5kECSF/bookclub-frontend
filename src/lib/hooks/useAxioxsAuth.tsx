"use client";
import { BASE_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../context/auth.context";


export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
});

const useAxiosAuth = () => {
    const {accessToken, getAccessToken} = useAuth();
//   const refreshToken = useRefreshToken();

    useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use(
            async (config) => {
                if (!config.headers["Authorization"]) {
                    // const token = await getAccessToken();
                    config.headers["Authorization"] = `Bearer {token}`;
                    // config.headers["Authorization"] = `${getAccessToken()}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosAuth.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    console.log("axios error11111111 -----")
                    prevRequest.sent = true;
                    const token = await getAccessToken();
                    prevRequest.headers["Authorization"] = `Bearer ${token}`;
                    return axiosAuth(prevRequest);
                    // await refreshToken();
                    //   signOut();
                    // prevRequest.headers[
                    //     "Authorization"
                    //     ] = `${accessToken}`;
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept);
            axiosAuth.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken, getAccessToken]);

    return axiosAuth;
};

export default useAxiosAuth;

// if (prevRequest?.sent) {
//     logout();
//     return axiosAuth(prevRequest);
// }