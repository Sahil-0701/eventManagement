import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axios';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticketCount, setTicketCount] = useState(1);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/events/${id}`);
        setEvent(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch event details');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-purple-500 text-xl">Loading event details...</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Event not found</h2>
          <button
            onClick={() => navigate('/events')}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = async () => {
    try {
      if (!user) {
        navigate('/login');
        return;
      }

      const bookingData = {
        eventId: id,
        ticketCount,
        totalPrice: event.price * ticketCount
      };

      await api.post('/api/tickets', bookingData);
      alert('Booking successful!');
      navigate('/my-bookings');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book tickets. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h1 className="text-4xl font-bold text-white">{event.title}</h1>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Event Details</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  <span className="font-medium">Date:</span>{' '}
                  {new Date(event.startDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Time:</span>{' '}
                  {new Date(event.startDate).toLocaleTimeString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Location:</span> {event.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Price:</span> ₹{event.price}
                </p>
                <div className="text-gray-600">
                  <h3 className="font-medium mb-2">Description:</h3>
                  <p>{event.description}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book Tickets</h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="ticketCount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of Tickets
                  </label>
                  <input
                    type="number"
                    id="ticketCount"
                    min="1"
                    max={event.availableTickets}
                    value={ticketCount}
                    onChange={(e) =>
                      setTicketCount(
                        Math.max(1, Math.min(event.availableTickets, parseInt(e.target.value)))
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="text-lg font-semibold">
                  Total Price: ₹{event.price * ticketCount}
                </div>
                <button
                  onClick={handleBooking}
                  className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  {user ? 'Book Now' : 'Login to Book'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
