import { useAuth } from "@clerk/clerk-react";
import { createContext, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import type { InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        try {
          const token = await getToken();
          if (token) config.headers.Authorization = `Bearer ${token}`;
        } catch (error: any) {
          if (
            error.message.includes("auth") ||
            error.message.includes("token")
          ) {
            toast.error("Authentication failed");
          }
          console.log(error);
        }
        return config;
      },
      (error) => {
        console.log("Axios request error", error);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [getToken]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
