import jwt from "jsonwebtoken"
import { CookieNames } from "@/lib/constants"
import { serialize } from "cookie"

export const isTokenExpired = (token: string) => {
  try {
    // Decode the token
    const decodedToken = jwt.decode(token)

    // Check if the token has an expiration claim and if it has expired
    if (decodedToken && decodedToken?.exp && decodedToken.exp * 1000 < Date.now()) {
      return true // Token has expired
    }

    return false // Token is still valid
  } catch (error) {
    console.error("Error decoding JWT:", error)
    return true // Assume the token is expired if there is an error decoding it
  }
}


export const getExpiryDate = (token: string) => {
  try {
    // Decode the token
    const decodedToken = jwt.decode(token)
    // Check if the token has an expiration claim and if it has expired
    if (decodedToken && decodedToken?.exp) {
      return decodedToken?.exp
    }
    return -1

  } catch (error) {
    console.error("Error decoding JWT:", error)
    return true // Assume the token is expired if there is an error decoding it
  }
}
export const getRemainingTime = (token) => {
  const expiryTime = getExpiryDate(token)
  const currentTimeInSeconds = Math.floor(Date.now() / 1000)
  const refreshTokenRemainingTime = expiryTime - currentTimeInSeconds
  // Set maxAge for the cookie based on the remaining time
  return Math.max(refreshTokenRemainingTime, 0)
}

export const haveTime = (token, minutes) => {
  const expiryTIme = getExpiryDate(token)

  const now = Date.now() / 1000 // Current time in seconds
  const minutesFromNow = now + (minutes * 60) // Add 5 minutes in seconds
  return expiryTIme > minutesFromNow
}

export const makeTokenCooke = (cookieName, token) => {
  return serialize(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge: getRemainingTime(token),
  })
}

export const makeDataCooke = (cookieName, data, time) => {
  return serialize(cookieName, data, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge: time,
  })
}
