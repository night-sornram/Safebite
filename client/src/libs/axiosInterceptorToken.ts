import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getServerSession } from "next-auth";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getServerSession(authOptions);
    if (session?.user.token) {
      config.headers.Authorization = `Bearer ${session?.user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    // if (!originalRequest) {
    //   return axiosInstance(originalRequest);
    // }

    return Promise.reject(error);
  }
);

export default axiosInstance;
