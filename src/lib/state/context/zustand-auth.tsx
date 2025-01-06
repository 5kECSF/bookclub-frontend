import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { LoginResponse, User } from "@/lib/state/context/auth.context";
import axios, { AxiosResponse } from "axios";
import { HandleAxiosErr } from "@/lib/functions/axios.error";
import { FAIL, FAILT, Resp, Succeed } from "@/lib/constants/return.const";

export interface LoginCred {
  info: string;
  password: string;
}
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  login: (credentials: LoginCred) => Promise<Resp<LoginResponse>>;
  logout: () => Promise<Resp<any>>;
  refreshAccessToken: () => Promise<Resp<string>>;
  fetchAccessToken: () => Promise<Resp<string>>;
  increase: () => void;
  loading: boolean;
  refreshPromise: any | null;
}
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        accessToken: "hola",
        loading: false,
        refreshPromise: null,
        increase: () =>
          set((state) => ({ accessToken: state.accessToken + "1" })),

        // Log in action
        login: async (credentials): Promise<Resp<LoginResponse>> => {
          try {
            set({ loading: true });
            const response: AxiosResponse<LoginResponse> = await axios.post(
              `/api/auth/login`,
              { info_type: "m", ...credentials },
            );
            console.log("login response--", response.data);
            set({
              user: response.data.user_data,
              accessToken: response.data.access_token,
              loading: false,
            });
            return Succeed(response.data);
          } catch (e: any) {
            const resp = HandleAxiosErr(e);
            set({ loading: false });
            return FAIL(resp.Message);
          }
        },

        // Log out action
        logout: async () => {
          try {
            const response = await axios.post(`/api/auth/logout`);
            set({ user: null, accessToken: null });
            return Succeed(response.data);
          } catch (err: any) {
            const resp = HandleAxiosErr(err);
            console.log("logout Error", err.message);
            set({ user: null, accessToken: null });
            // router.push("/signin");
            return FAILT(resp.Message);
          }
        },

        // Refresh token action
        refreshAccessToken: async (): Promise<Resp<string>> => {
          try {
            const { refreshPromise } = get();
            if (refreshPromise) {
              return refreshPromise;
            }
            const newPromise = axios.post(`/api/auth/refresh`);
            set({ refreshPromise: newPromise });
            const response: AxiosResponse<LoginResponse> = await newPromise;

            set({
              accessToken: response.data.access_token,
              user: response.data.user_data,
              refreshPromise: null,
            });
            return Succeed(response.data.access_token);
          } catch (error) {
            get().logout(); // Log out on failure
            const resp = HandleAxiosErr(error);
            set({ loading: false });
            return FAIL(resp.Message);
            // throw error;
          }
        },

        // Fetch token action
        fetchAccessToken: async () => {
          const { accessToken, refreshAccessToken } = get();
          if (!accessToken || isTokenExpired(accessToken)) {
            return await refreshAccessToken();
          }
          return Succeed(accessToken);
        },
      }),
      {
        name: "auth-storage", // Local storage key
      },
    ),
    { name: "AuthStore" }, // Name for devtools
  ),
);

// Utility function to check token expiry
const isTokenExpired = (token: string) => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp * 1000 < Date.now();
};

export default useAuthStore;
