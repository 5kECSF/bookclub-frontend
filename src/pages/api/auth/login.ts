import { BASE_URL, CookieNames } from "@/lib/constants"
import { getRemainingTime, makeDataCooke, makeTokenCooke } from "@/lib/common/tokenExpires"
import axios from "axios"
import { API } from "@/lib/constants/api-paths"

const secret = process.env.SECRET

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(req: any, res: any) {
  if (req.method != "POST") {
    res.status(405).json({ error: "Method Not Allowed" })
  }
  try {
    const response = await axios.post(`${BASE_URL}/${API.login}`, req.body)
    const { auth_tokens, user_data } = response?.data
    console.log("login response data--", response.data)

    const serialisedAccess = makeTokenCooke(CookieNames.AccessToken, auth_tokens?.access_token)
    const serialisedRefresh = makeTokenCooke(CookieNames.RefreshToken, auth_tokens?.refresh_token)
    const serialisedUser = makeDataCooke(CookieNames.User, JSON.stringify(user_data), getRemainingTime(auth_tokens?.access_token) / 1000,)

    res.setHeader("Set-Cookie", [serialisedAccess, serialisedRefresh, serialisedUser])

    res.status(201).json({
      message: "Success!",
      user_data,
      access_token: auth_tokens?.access_token,
    })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      message: e.message,

    })
  }


}