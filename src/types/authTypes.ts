import { User } from "@/lib/state/context/auth.context";

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  sessionId?: string;
  expiresIn?: number;
}
export interface TokenResponse {
  authToken: AuthToken;
  userData: User;
}
