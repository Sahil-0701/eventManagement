import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Bookings = () => {
  const { user } = useAuth();
  const { getUserBookings } = useCart();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserBookings();
        const paidBookings = data.filter(
          (booking) => booking.paymentStatus?.toLowerCase() === "completed"
        );
        setBookings(paidBookings);
      } catch (e) {
        setError("Failed to fetch bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user,bookings?.paymentStatus]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        <p>No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Time Bookings</h1>
      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-indigo-700">{booking.eventTitle}</h2>
              <span className="text-sm font-medium text-green-600 capitalize">
                {booking.paymentStatus}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              Booking Ref: <span className="font-mono text-gray-800">{booking.bookingReference}</span>
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Ticket No: <span className="font-mono text-gray-800">{booking.ticketNumber}</span>
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Quantity: <strong>{booking.quantity}</strong>
            </p>
            <p className="text-sm text-gray-600 mb-1">Amount Paid: ₹{booking.totalAmount}</p>
            <p className="text-sm text-gray-600">
              Purchase Date: {new Date(booking.purchaseDate).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
