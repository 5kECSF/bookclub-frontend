"use client";
import axios from "axios";
import {useEffect} from "react";
import {BASE_URL} from "@/lib/constants";
import {useAuth} from "../context/auth.context";


export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
});
const useAxiosAuth = () => {
    const {accessToken} = useAuth();
//   const refreshToken = useRefreshToken();

    useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    // config.headers["Authorization"] = `${accessToken}`;
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
                    prevRequest.sent = true;
                    // await refreshToken();
                    //   signOut();
                    // prevRequest.headers[
                    //     "Authorization"
                    //     ] = `${accessToken}`;
                    return axiosAuth(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept);
            axiosAuth.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken]);

    return axiosAuth;
};

export default useAxiosAuth;
