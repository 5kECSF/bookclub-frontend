"use client"
// AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"


import { useRouter } from "next/router"

import { toast } from "react-toastify"
import { isTokenExpired } from "@/lib/common/tokenExpires"

interface User {
  // Define user properties
}

interface AuthContextProps {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  isTokenExpired: (token: string | null) => boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  accessToken: null,
  login: async () => {
  },
  logout: () => {
  },
  refreshToken: async () => {
  },
  isTokenExpired: () => false,
})

//this is the hook
export function useAuth() {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return authContext
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean | null>(false)
  // const router = useRouter();

  // useEffect(() => {
  //   // Check if access token exists and verify if it's expired
  //   getToken()
  // }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try{
      const response = await axios.post(`/api/auth/login`, { info: email, password, info_type: "m" })
      console.log("response.data")
      const { access_token, user_data } = response.data
      // console.log("logindata", response.data)
      toast.success(`Successfully logged In as ${user_data.email}`)
      setUser(user_data)
      setAccessToken(access_token)
      // localStorage.setItem("accessToken", access_token)
      setLoading(false)
      return response.data
    }catch (e) {
      console.log("err", e.message)
      setLoading(false)
      toast.error(`login failed ${e.message}`)
    }


  }

  const refreshToken = async (): Promise<string> => {
    try {
      const response = await axios.post(`/api/auth/refresh`)
      const { access_token, user_data } = response?.data
      console.log("the data is", response.data)
      if (user_data) {
        setUser(response?.data?.user_data)
      }
      setAccessToken(access_token)
      return access_token
    } catch (error) {
      console.error("Failed to refresh token:", error)
    }
  }


  const logout = () => {
    setUser(null)
    setAccessToken(null)
    localStorage.removeItem("accessToken")
    // router.push('/login'); // Redirect to login page after logout
  }

  const getAccessToken = async () => {
    if (!accessToken || isTokenExpired(accessToken)) {
      return await refreshToken()
    }
    return accessToken
  }

  const authContextValue = {
    loading,
    user,
    accessToken,
    login,
    logout,
    refreshToken,
    isTokenExpired,
    getAccessToken,
  }

  return <AuthContext.Provider value={authContextValue}> {children}</AuthContext.Provider>
}
