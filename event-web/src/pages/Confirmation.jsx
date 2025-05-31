import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaSpinner, FaDownload } from "react-icons/fa";
import { useCart } from "../context/CartContext";

import { PDFDownloadLink } from "@react-pdf/renderer";
import TicketPDF from "../components/TicketPDF.jsx";

const Confirmation = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadBookings = async () => {
      const storedBookings = localStorage.getItem("bookings");

      if (!storedBookings) {
        if (isMounted) navigate("/collection");
        return;
      }

      try {
        const parsedBookings = JSON.parse(storedBookings);
        if (!Array.isArray(parsedBookings) || parsedBookings.length === 0) {
          if (isMounted) navigate("/collection");
          return;
        }

        if (isMounted) {
          setBookings(parsedBookings);
          clearCart();
          localStorage.removeItem("cartItems");
          localStorage.removeItem("bookingInfo");
        }
      } catch {
        if (isMounted) setError("Failed to load booking information");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadBookings();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">{error}</h2>
          <button
            onClick={() => navigate("/collection")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Events
          </button>
        </div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">No bookings found</h2>
          <button
            onClick={() => navigate("/collection")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                Booking Confirmed!
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Thank you for your booking. Here are your booking details:
              </p>
            </div>

            <div className="space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="border rounded-lg p-6 bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {booking.eventTitle}
                    </h3>
                    <PDFDownloadLink
                      document={<TicketPDF booking={booking} />}
                      fileName={`ticket-${booking.bookingReference}.pdf`}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {({ loading }) =>
                        loading ? (
                          <>
                            <FaSpinner className="mr-2 animate-spin" />
                            Preparing...
                          </>
                        ) : (
                          <>
                            <FaDownload className="mr-2" />
                            Download Ticket
                          </>
                        )
                      }
                    </PDFDownloadLink>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Booking Reference</p>
                      <p className="font-medium">{booking.bookingReference}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Number of Tickets</p>
                      <p className="font-medium">{booking.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="font-medium">
                        ${booking.totalAmount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="font-medium text-green-600">Confirmed</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ticket Number</p>
                      <p className="font-medium">{booking.ticketNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Purchase Date</p>
                      <p className="font-medium">
                        {new Date(booking.purchaseDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/collection")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Return to Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
