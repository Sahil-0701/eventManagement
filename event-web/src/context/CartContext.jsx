import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../config/axios";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToCart = (event) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === event._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === event._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...event, quantity: 1 }];
    });
  };

  const updateTicketCount = (eventId, quantity) => {
    console.log("CartContext - Updating ticket count:", { eventId, quantity });
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === eventId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (eventId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== eventId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalTickets = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.ticketPrice * item.quantity,
      0
    );
  };

  const createBooking = async (cart, bookingInfo) => {
    console.log("CartContext - createBooking called with:", {
      cart,
      bookingInfo,
    });

    if (!cart || !Array.isArray(cart)) {
      console.error("CartContext - createBooking: cart is not an array");
      return [];
    }

    try {
      setLoading(true);
      setError(null);

      console.log("CartContext - Creating bookings for items:", cart);

      const responses = await Promise.all(
        cart.map((item) => {
          console.log("CartContext - Creating booking for item:", item);
          return axiosInstance.post("/api/bookings", {
            eventId: item._id,
            quantity: item.quantity,
            bookingInfo,
          });
        })
      );

      console.log("CartContext - Booking creation responses:", responses);

      const bookings = responses.map((r) => r.data.booking);
      console.log("CartContext - Created bookings:", bookings);

      return bookings;
    } catch (error) {
      console.error("CartContext - createBooking error:", error);
      setError(error.response?.data?.message || "Failed to create bookings");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (bookingId, paymentData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.patch(
        `/api/bookings/${bookingId}/payment`,
        paymentData
      );
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to update payment status"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getUserBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/api/bookings");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch bookings");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.put(
        `/api/bookings/cancel/${bookingId}`
      );
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to cancel booking");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cart,
    loading,
    error,
    addToCart,
    updateTicketCount,
    removeFromCart,
    clearCart,
    getTotalTickets,
    getTotalPrice,
    createBooking,
    updatePaymentStatus,
    getUserBookings,
    cancelBooking,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
