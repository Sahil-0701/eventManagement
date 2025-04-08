import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { events } from "../data/eventData"; // replace with user-specific events later

const UserDashboard = () => {
  const [sortOption, setSortOption] = useState("date");

  // Sorting Function
  const sortEvents = (events, option) => {
    switch (option) {
      case "alphabetical":
        return [...events].sort((a, b) => a.title.localeCompare(b.title));
      case "newest":
        return [...events].sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest -> Descending
      default: // date
        return [...events].sort((a, b) => new Date(a.date) - new Date(b.date)); // Date -> Ascending
    }
  };

  const sortedEvents = sortEvents(events, sortOption);

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/galaxy.jpg')" }}>
      <Navbar />

      <section className="py-16 px-6 bg-white bg-opacity-90">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-purple-600 font-bold text-center mb-4">
            Your Events
          </h2>
          <p className="text-gray-600 text-center mb-10 text-lg">
            These are the events you’ve registered for.
          </p>

          {/* Dropdown Filter */}
          <div className="text-center mb-6">
            <label htmlFor="sort" className="text-lg text-gray-700 mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              name="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white text-lg text-gray-700 rounded-2xl px-6 py-2 focus:outline-none shadow-sm"
            >
              <option value="date">Date</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Event Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedEvents.map((event, index) => (
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
                  <h3 className="text-xl font-bold text-purple-700">{event.title}</h3>
                  <p className="text-gray-600 text-sm">{event.date} • {event.location}</p>
                  <p className="text-gray-700 text-sm">{event.description.slice(0, 60)}...</p>
                </div>
                <div className="p-4">
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                    View Details
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

export default UserDashboard;
