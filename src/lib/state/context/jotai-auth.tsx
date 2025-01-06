"use client";

import { atom, useAtom, useSetAtom } from "jotai";

import { User, LoginResponse } from "./auth.context";
import axios, { AxiosResponse } from "axios";
import { FAIL, Resp, Succeed } from "@/lib/constants/return.const";
import { HandleAxiosErr } from "@/lib/functions/axios.error";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/lib/common/tokenExpires";
import { LoginCred } from "@/lib/state/context/zustand-auth";

export const userAtom = atom<User | null>(null);
userAtom.debugLabel = "userAtom";
export const accessTokenAtom = atom<string | null>(null);
accessTokenAtom.debugLabel = "accessToken";
export const loadingAtom = atom<boolean>(false);
loadingAtom.debugLabel = "loading";
let refreshPromise: any = null;

export const refreshTokenAtom = atom(null, async (get, set, _arg) => {
  const accessToken = get(accessTokenAtom);
  if (refreshPromise) {
    console.log("Refresh in progress, waiting for result...");
    return refreshPromise;
  }
  try {
    set(loadingAtom, true);
    refreshPromise = axios.post(`/api/auth/refresh`);
    const response: AxiosResponse<LoginResponse> = await refreshPromise;
    const { access_token, user_data } = response.data;

    set(accessTokenAtom, access_token);
    set(userAtom, user_data);
    refreshPromise = null;
    set(loadingAtom, false);

    return Succeed(access_token);
  } catch (error) {
    console.error("**Failed to refresh token:", error);
    refreshPromise = null;
    set(loadingAtom, false);
    // Clear user and token on failure
    set(userAtom, null);
    set(accessTokenAtom, null);
    let resp = HandleAxiosErr(error);
    return FAIL(`"**Failed to refresh token:"${resp.Message}`);
  }
});

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const refreshTokens = useSetAtom(refreshTokenAtom);
  const router = useRouter();

  const refreshToken = async (): Promise<Resp<string>> => {
    if (refreshPromise) {
      console.log("Refresh in progress, waiting for result...");
      return refreshPromise;
    }
    try {
      setLoading(false);
      refreshPromise = axios.post(`/api/auth/refresh`);

      const response: AxiosResponse<LoginResponse> = await refreshPromise;
      const { access_token, user_data } = response?.data;
      setAccessToken(access_token);
      setUser(user_data);
      refreshPromise = null;
      return Succeed(access_token);
    } catch (error) {
      setLoading(false);
      refreshPromise = null;
      let resp = HandleAxiosErr(error);
      console.error("**Failed to refresh token:", error);
      await logout();
      return FAIL(`"**Failed to refresh token:"${resp.Message}`);
    }
  };
  const logout = async () => {
    try {
      const response = await axios.post(`/api/auth/logout`);

      setUser(null);
      setAccessToken(null);
      console.log("logout response");
      router.push("/signin");
    } catch (err: any) {
      console.log("logout Error", err.message);
      router.push("/signin");
    }
  };
  const getAccessToken = async (): Promise<Resp<string>> => {
    console.log("get access token called -----");
    if (!accessToken) {
      console.log("no access token----");
      return await refreshToken();
    }
    if (isTokenExpired(accessToken)) {
      console.log("Access token expired, refreshing...");
      return await refreshToken();
    }
    return Succeed(accessToken);
  };
  const login = async (
    credentials: LoginCred,
  ): Promise<Resp<LoginResponse>> => {
    try {
      setLoading(true);
      const response: AxiosResponse<LoginResponse> = await axios.post(
        `/api/auth/login`,
        { info_type: "m", ...credentials },
      );
      console.log("login response--", response.data);
      const { access_token, user_data } = response?.data;
      setAccessToken(access_token);
      setUser(user_data);
      setLoading(false);
      return Succeed(response.data);
    } catch (e: any) {
      const resp = HandleAxiosErr(e);
      setLoading(false);
      return FAIL(resp.Message);
    }
  };

  return {
    user,
    setUser,
    accessToken,
    setAccessToken,
    loading,
    refreshToken,
    refreshTokens,
    logout,
    getAccessToken,
    login,
  };
};
