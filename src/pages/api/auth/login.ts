import { getRemainingTime, makeDataCooke, makeTokenCooke } from "@/lib/common/tokenExpires"
import { BASE_URL, CookieNames } from "@/lib/constants"
import { API } from "@/lib/constants/api-paths"
import { TokenResponse } from "@/types/authTypes"
import axios, { AxiosResponse } from "axios"

const secret = process.env.SECRET

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(req: any, res: any) {
  if (req.method != "POST") {
    res.status(405).json({ error: "Method Not Allowed" })
  }
  try {
    const response: AxiosResponse<TokenResponse> = await axios.post(`${BASE_URL}/${API.login}`, req.body)
    const { authToken, userData } = response?.data
    console.log("login response data--", response.data)

    const serialisedAccess = makeTokenCooke(CookieNames.AccessToken, authToken.accessToken)
    const serialisedRefresh = makeTokenCooke(CookieNames.RefreshToken, authToken.refreshToken)
    const serialisedUser = makeDataCooke(CookieNames.User, JSON.stringify(userData), getRemainingTime(authToken?.accessToken) / 1000,)

    res.setHeader("Set-Cookie", [serialisedAccess, serialisedRefresh, serialisedUser])

    res.status(201).json({
      message: "Success!",
      user_data: userData,
      access_token: authToken?.accessToken,
    })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      message: e.message,

    })
  }


}