import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getEvents } from "../services/apiService";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        if (response.success) {
          setEvents(response.data);
        } else {
          setError(response.message || "Failed to fetch events");
        }
      } catch (err) {
        setError("An error occurred while fetching events");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="flex flex-col rounded-lg overflow-hidden shadow-lg bg-white h-[400px]"
          >
            <img
              src={"/artEvent.jpg"}
              alt={event.title}
              className="w-full h-40 sm:h-48 object-cover"
            />

            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
                  <span>{event.date}</span>
                  <span>{event.time}</span>
                  <span>{event.location}</span>
                </div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2 truncate">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 overflow-hidden">
                  {event.description}
                </p>
              </div>
              <button
                onClick={() =>
                  !user
                    ? navigate("/login", {
                        state: { from: `/events/${event._id}` },
                      })
                    : navigate(`/events/${event._id}`)
                }
                className="w-full mt-4 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
              >
                {user ? "Book Ticket" : "Login to Book"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Events;
