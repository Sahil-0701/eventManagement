import React from "react";
import { useParams } from "react-router-dom";
import { events } from "../../data/eventData";


const EventDetails = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) return <p className="text-center mt-10 text-gray-500">Event not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-xl shadow" />
      <h1 className="text-3xl font-bold text-purple-700 mt-6">{event.title}</h1>
      <p className="text-gray-600 mt-2">{event.description}</p>

      <div className="mt-6 space-y-2">
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong> ₹{event.price}</p>
      </div>

      <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
        Book Ticket
      </button>
    </div>
  );
};

export default EventDetails;
