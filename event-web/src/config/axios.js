import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Request interceptor - Token from localStorage:", token);
    console.log("Request URL:", config.url);
    console.log("Request method:", config.method);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Request headers after adding token:", config.headers);
    } else {
      console.log("No token found in localStorage");
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response interceptor - Success:", {
      status: response.status,
      url: response.config.url,
      method: response.config.method,
    });
    return response;
  },
  (error) => {
    console.error("Response interceptor - Error:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      url: error.config?.url,
      method: error.config?.method,
    });

    if (error.response?.status === 401) {
      console.log(
        "Unauthorized error - Current path:",
        window.location.pathname
      );

      if (!window.location.pathname.includes("/signin")) {
        console.log("Redirecting to login page");

        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } else {
        console.log("Already on login page, not redirecting");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
