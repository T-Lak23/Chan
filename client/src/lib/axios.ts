import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LOCAL_API
    : import.meta.env.VITE_PROD_API;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
