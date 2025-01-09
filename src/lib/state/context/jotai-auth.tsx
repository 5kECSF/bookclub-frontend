"use client";

import { atom, useAtom } from "jotai";

import axios, { AxiosResponse } from "axios";
import { FAIL, Resp, Succeed } from "@/lib/constants/return.const";
import { HandleAxiosErr } from "@/lib/functions/axios.error";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/lib/common/tokenExpires";
import { useEffect } from "react";

export interface User {
  id: string;
  fName: string;
  lName: string;
  userName?: string;
  email?: string;
  avatar: string;
  roleId: number;
  role: string;
}

export interface LoginResp {
  access_token: string;
  user_data: User | null;
}

export const userAtom = atom<User | null>(null);
userAtom.debugLabel = "user";
export const accessTokenAtom = atom<string | null>(null);
accessTokenAtom.debugLabel = "accessToken";
export const loadingAtom = atom<boolean>(false);
loadingAtom.debugLabel = "loading";
let refreshPromise: any = null;

export interface LoginCred {
  info: string;
  password: string;
}

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      refreshToken().then((r) => {});
    }
  }, [user]);

  const refreshToken = async (): Promise<Resp<string>> => {
    if (refreshPromise) {
      console.log("Refresh in progress, waiting for result...");
      return refreshPromise;
    }
    try {
      setLoading(false);
      refreshPromise = axios.post(`/api/auth/refresh`);

      const response: AxiosResponse<LoginResp> = await refreshPromise;
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
    // console.log("get access token called -----");
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
  const login = async (credentials: LoginCred): Promise<Resp<LoginResp>> => {
    try {
      setLoading(true);
      const response: AxiosResponse<LoginResp> = await axios.post(
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
    logout,
    getAccessToken,
    login,
  };
};
