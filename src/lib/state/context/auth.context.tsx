"use client";
// AuthContext.tsx
import axios, { AxiosResponse } from "axios";
import React, { createContext, useContext, useState } from "react";

import { isTokenExpired } from "@/lib/common/tokenExpires";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useLocalStorage from "@/lib/state/hooks/useLocalStorage";
import { HandleAxiosErr } from "@/lib/functions/axios.error";

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
const EmptyValue: AuthContextProps = {
  user: null,
  accessToken: null,
  login: async (): Promise<LoginResponse> => {
    return { access_token: "", user_data: null };
  },
  logout: () => {},
  refreshToken: async (): Promise<string> => {
    return "";
  },
  isTokenExpired: () => false,
  getAccessToken: async (): Promise<string> => "",
  getUser: async (): Promise<User | null> => {
    return null;
  },
  loading: false,
};

interface LoginResponse {
  access_token: string;
  user_data: User | null;
}

interface AuthContextProps {
  user: User | null;
  accessToken: string | null;
  login: (userName: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
  refreshToken: () => Promise<string>;
  isTokenExpired: (token: string | null) => boolean;
  getAccessToken: () => Promise<string>;
  getUser: () => Promise<User | null>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>(EmptyValue);

//this is the hook
export function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useLocalStorage<User | null>("user", null); // useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const login = async (
    userName: string,
    password: string,
  ): Promise<LoginResponse> => {
    setLoading(true);
    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(
        `/api/auth/login`,
        {
          info: userName,
          password,
          info_type: "m",
        },
      );
      console.log("login response--", response.data);
      const { access_token, user_data } = response.data;

      setUser(user_data);
      setAccessToken(access_token);
      setLoading(false);
      router.push("/admin");

      return response.data;
    } catch (e: any) {
      const resp = HandleAxiosErr(e);
      setLoading(false);
      toast.error(`login failed ${resp.Message}`);
      throw e;
    }
  };

  let refreshPromise: any = null;

  //==================  Refresh the token==============
  //===========================================

  const refreshToken = async (): Promise<string> => {
    if (refreshPromise) {
      console.log("Refresh in progress, waiting for result...");
      return refreshPromise;
    }

    try {
      refreshPromise = axios.post(`/api/auth/refresh`);

      const response: AxiosResponse<LoginResponse> = await refreshPromise;
      const { access_token, user_data } = response?.data;

      setAccessToken(access_token);
      setUser(user_data);

      refreshPromise = null;
      return access_token;
    } catch (error) {
      refreshPromise = null;
      // setUser(null)
      // setAccessToken(null);
      console.error("**Failed to refresh token:", error);
      throw error;
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

  const getAccessToken = async () => {
    console.log("get access token called -----");
    if (!accessToken) {
      console.log("no access token----");
      const accessT = await refreshToken();
      if (accessT) console.log("access token refreshed-", accessT);
      else console.log("Failed TO Refresh");
      return accessT;
    }

    if (isTokenExpired(accessToken)) {
      console.log("Access token expired, refreshing...");
      const accessT = await refreshToken();
      if (accessT) return accessT;
      console.log("Failed TO Refresh");
    }

    console.log("fetched token", accessToken);
    return accessToken;
  };

  const getUser = async () => {
    if (!accessToken || isTokenExpired(accessToken)) {
      await refreshToken();
    }
    return user;
  };

  const authContextValue: AuthContextProps = {
    loading,
    user,
    accessToken,
    login,
    logout,
    refreshToken,
    isTokenExpired,
    getAccessToken,
    getUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
