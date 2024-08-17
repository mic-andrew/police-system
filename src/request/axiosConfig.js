import axios from "axios";
import { toast } from "react-toastify";

const CORE_BACKEND_URL = import.meta.env.VITE_CORE_BACKEND_URL;

const instance = axios.create({
  baseURL: CORE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use((config) => {
  console.log(CORE_BACKEND_URL);
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // If the data is FormData, remove the Content-Type header
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response, // Just return response if successful
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error(
        error.response ||
          error.response.message ||
          "Session expired. Please login again"
      );
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default instance;
