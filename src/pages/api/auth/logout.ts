import { BASE_URL, CookieNames } from "@/lib/constants"
import { destroyCooke } from "@/lib/common/tokenExpires"
import axios from "axios"
import { API } from "@/lib/constants/api-paths"
import { parse } from "cookie"

const secret = process.env.SECRET

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(req: any, res: any) {
  if (req.method != "POST") {
    res.status(405).json({ error: "Method Not Allowed" })
    return;
  }
  
  try {
    // Clear cookies by setting them to expire immediately
    const cookies = parse(req.headers.cookie || "");
    const refreshToken = cookies[CookieNames.RefreshToken];
    
    const response = await axios.post(`${BASE_URL}/${API.logout}`, {
      token: refreshToken,
    })

    console.log("logout response data==", response?.data)
    
    const serialisedAccess = destroyCooke(CookieNames.AccessToken)
    const serialisedRefresh = destroyCooke(CookieNames.RefreshToken)
    const serialisedUser = destroyCooke(CookieNames.User)

    res.setHeader("Set-Cookie", [serialisedAccess, serialisedRefresh, serialisedUser])

    res.status(200).json({
      message: "Success!",
    });
  } catch (e) {
    console.error("Error occurred during logout:", e)
    res.status(500).json({ message: "Internal Server Error" })
  }
}
