import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../config/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedBookings = localStorage.getItem("bookings");

    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUser(user);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axiosInstance.defaults.headers.common["Authorization"];
      }
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }

    if (storedBookings) {
      try {
        const parsed = JSON.parse(storedBookings);
        setBookings(parsed);
      } catch (e) {
        console.warn("Error parsing stored bookings:", e);
      }
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });

      if (!response.data.success) throw new Error(response.data.message || "Login failed");

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);

    
      try {
        const bookingsResponse = await axiosInstance.get("/api/bookings");
        const paidBookings = bookingsResponse.data.filter(
          (booking) => booking.paymentStatus?.toLowerCase() === "completed"
        );

        setBookings(paidBookings);
        localStorage.setItem("bookings", JSON.stringify(paidBookings));
      } catch (bookingError) {
        console.warn("Booking fetch failed:", bookingError.message);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Login error",
      };
    }
  };

  const register = async (fullName, email, password) => {
    try {
      const response = await axiosInstance.post("/api/user/register", {
        name: fullName,
        email,
        password,
      });

      if (!response.data.success) throw new Error(response.data.message || "Registration failed");

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Registration error",
      };
    }
  };

   const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("bookings");
    localStorage.removeItem("cartItems");
    delete axiosInstance.defaults.headers.common["Authorization"];
    setUser(null);
    setBookings([]);
  };

  const value = {
    user,
    bookings,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export default AuthContext;
