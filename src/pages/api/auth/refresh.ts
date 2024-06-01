/* eslint-disable import/no-anonymous-default-export */

import { parse } from "cookie"
import { BASE_URL, CookieNames } from "@/lib/constants"
import {
  getExpiryDate,
  getRemainingTime,
  haveTime,
  isTokenExpired,
  makeDataCooke,
  makeTokenCooke,
} from "@/lib/common/tokenExpires"
import axios from "axios"
import { API } from "@/lib/constants/api-paths"



export default async function(req: any, res: any) {
  if (req.method != "POST") {
    res.status(405).json({ error: "Method Not Allowed" })
  }

  try {

    const cookies = parse(req.headers.cookie || "")
    const refreshToken = cookies[CookieNames.RefreshToken]
    const access_token = cookies[CookieNames.AccessToken]
    const user = cookies[CookieNames.User]

    if (!refreshToken) {
      res.status(403).json({ message: "No Refresh Token!", status: "NOT_FOUND" })
      return
    }
    
    if (haveTime(access_token, 2)) {
      console.log("access token have time")
      res.status(200).json({ message: "Access Token Is Still Valid!", access_token, user: JSON.parse(user) })
      return
    }
    /**
     * if the refresh token have expired return not authorized, redirect user to login
     */

    if (isTokenExpired(refreshToken)) {
      res.status(403).json({ message: "Refresh Token expired!", status: "NOT_AUTHORIZED" })
    }

    const response = await axios.post(`${BASE_URL}/${API.refresh}`, { token: refreshToken })

    const { auth_tokens, user_data } = response?.data?.body
    if (auth_tokens) {
      const serialisedAccess = makeTokenCooke(CookieNames.AccessToken, auth_tokens?.access_token)
      const serialisedRefresh = makeTokenCooke(CookieNames.RefreshToken, auth_tokens?.refresh_token)
      const serialisedUser = makeDataCooke(CookieNames.User, JSON.stringify(user_data), getRemainingTime(auth_tokens?.access_token),)

      res.setHeader("Set-Cookie", [serialisedAccess, serialisedRefresh, serialisedUser])

      res.status(200).json({
        message: "Success!",
        user_data,
        access_token: auth_tokens?.access_token,
      })
    } else {
      res.json({ message: "No Refresh Token!", status: "NOT_FOUND" }).status(404)
    }
  } catch (e: any) {
    console.error("Error refreshing token:", e?.response?.data)
    res.status(500).json({ message: e.response.data.error, error: e.message })
  }

}
