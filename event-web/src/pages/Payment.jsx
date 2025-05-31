import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaSpinner } from "react-icons/fa";
import axiosInstance from "../config/axios";

const Payment = () => {
  const navigate = useNavigate();
  const {
    getTotalPrice,
    createBooking,
    updatePaymentStatus,
    loading,
    error,
    clearCart,
  } = useCart();
  const [bookingInfo, setBookingInfo] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    cardNumber: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loadingState, setLoading] = useState(false);
  const [errorState, setError] = useState(null);

  useEffect(() => {
    const storedBookingInfo = localStorage.getItem("bookingInfo");
    const storedCartItems = localStorage.getItem("cartItems");

    if (!storedBookingInfo || !storedCartItems) {
      navigate("/collection");
      return;
    }

    try {
      const parsedBookingInfo = JSON.parse(storedBookingInfo);
      const parsedCartItems = JSON.parse(storedCartItems);
      setBookingInfo(parsedBookingInfo);
      setCartItems(parsedCartItems);
    } catch (error) {
      navigate("/collection");
    }
  }, [navigate]);

  const totalPrice = getTotalPrice();

  const validateForm = () => {
    const errors = {};
    if (!formData.cardNumber || formData.cardNumber.length !== 19) {
      errors.cardNumber = "Please enter a valid 16-digit card number";
    }
    if (!formData.name) {
      errors.name = "Please enter the name on card";
    }
    if (!formData.expiry || !/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      errors.expiry = "Please enter a valid expiry date (MM/YY)";
    }
    if (!formData.cvv || formData.cvv.length !== 3) {
      errors.cvv = "Please enter a valid 3-digit CVV";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
    } else if (name === "expiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2")
        .slice(0, 5);
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const bookings = await createBooking(cartItems);

      if (!Array.isArray(bookings) || bookings.length === 0) {
        throw new Error("No bookings were created");
      }

      localStorage.setItem("bookings", JSON.stringify(bookings));

      const paymentResults = await Promise.all(
        bookings.map(async (booking) => {
          try {
            const result = await updatePaymentStatus(booking._id, {
              paymentStatus: "completed",
              paymentDetails: {
                paymentId: `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
                paymentMethod: "card",
                paymentDate: new Date().toISOString(),
                amount: booking.totalAmount,
                cardLast4: formData.cardNumber.slice(-4),
              },
            });
            return { success: true, booking: result.booking };
          } catch (error) {
            try {
              await updatePaymentStatus(booking._id, {
                paymentStatus: "failed",
                paymentDetails: {
                  error: error.message,
                  failedAt: new Date().toISOString(),
                },
              });
            } catch (updateError) {}
            return { success: false, booking, error };
          }
        })
      );

      const failedPayments = paymentResults.filter((result) => !result.success);
      if (failedPayments.length > 0) {
        throw new Error("Some payments failed. Please try again.");
      }

      clearCart();
      localStorage.removeItem("cartItems");
      localStorage.removeItem("bookingInfo");

      navigate("/confirmation");
    } catch (err) {
      setErrorState(err.response?.data?.message || err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!bookingInfo || !cartItems.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Payment Details
            </h2>

            {errorState && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
                {errorState}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    formErrors.cardNumber ? "border-red-500" : ""
                  }`}
                />
                {formErrors.cardNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.cardNumber}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name on Card
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    formErrors.name ? "border-red-500" : ""
                  }`}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      formErrors.expiry ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.expiry && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.expiry}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      formErrors.cvv ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.cvv && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.cvv}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loadingState}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingState ? (
                    <FaSpinner className="animate-spin h-5 w-5" />
                  ) : (
                    "Complete Payment"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
