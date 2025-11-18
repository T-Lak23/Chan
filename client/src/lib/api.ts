import { axiosInstance } from "./axios";

export const getStreamToken = async () => {
  const response = await axiosInstance.get("/api/user/token");
  return response.data;
};
