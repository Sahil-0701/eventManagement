import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { events } from "../data/eventData";

const AdminDashboard = () => {
  const [eventList, setEventList] = useState(events);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [errorFields, setErrorFields] = useState({
    title: false,
    date: false,
    location: false,
    description: false,
  });

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePostEvent = () => {
    let isError = false;
    const updatedErrorFields = {
      title: false,
      date: false,
      location: false,
      description: false,
    };
    if (!newEvent.title) {
      updatedErrorFields.title = true;
      isError = true;
    }
    if (!newEvent.date) {
      updatedErrorFields.date = true;
      isError = true;
    }
    if (!newEvent.location) {
      updatedErrorFields.location = true;
      isError = true;
    }
    if (!newEvent.description) {
      updatedErrorFields.description = true;
      isError = true;
    }

    // If there's an error, set the error state and prevent posting the event
    if (isError) {
      setError("Please fill out all required fields.");
      setErrorFields(updatedErrorFields);
      return;
    }

    // Clear the error if validation passes
    setError("");
    setErrorFields({
      title: false,
      date: false,
      location: false,
      description: false,
    });

    // Post the event
    setEventList([...eventList, { ...newEvent, id: eventList.length + 1 }]);
    setNewEvent({
      title: "",
      date: "",
      location: "",
      description: "",
      image: "",
    });
  };

  const handleDeleteEvent = (id) => {
    setEventList(eventList.filter((event) => event.id !== id));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/galaxy.jpg')" }}
    >
      <Navbar />

      {/* Admin Dashboard Section */}
      <section className="py-16 px-6 bg-white bg-opacity-90">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-purple-600 font-bold text-center mb-4">
            Admin Dashboard
          </h2>
          <p className="text-gray-600 text-center mb-10 text-lg">
            Manage events, users, and all admin-related tasks here.
          </p>

          {/* Event Management - Post New Event */}
          <div className="mb-10">
            <h3 className="text-2xl text-purple-600 font-semibold">
              Post New Event
            </h3>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4 mt-6">
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleEventChange}
                className={`w-full p-3 rounded-md border ${
                  errorFields.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Event Title"
              />
              <input
                type="text"
                name="date"
                value={newEvent.date}
                onChange={handleEventChange}
                className={`w-full p-3 rounded-md border ${
                  errorFields.date ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Event Date : dd-mm-yyyy"
              />
              <input
                type="text"
                name="location"
                value={newEvent.location}
                onChange={handleEventChange}
                className={`w-full p-3 rounded-md border ${
                  errorFields.location ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Event Location"
              />
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleEventChange}
                className={`w-full p-3 rounded-md border ${
                  errorFields.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Event Description"
              />
              <input
                type="text"
                name="image"
                value={newEvent.image}
                onChange={handleEventChange}
                className="w-full p-3 rounded-md border border-gray-300"
                placeholder="Event Image URL / empty"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
              {/* Error message */}
              <button
                onClick={handlePostEvent}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Post Event
              </button>
            </div>
          </div>

          {/* Existing Events */}
          <h3 className="text-2xl text-purple-600 font-semibold mb-6">
            Manage Events
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {eventList.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-bold text-purple-700">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {event.date} • {event.location}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {event.description.slice(0, 60)}...
                  </p>
                </div>
                <div className="p-4 space-x-4">
                  <button className="w-full bg-purple-600 text-white py-2 my-2 rounded-lg hover:bg-purple-700">
                    View Details
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
