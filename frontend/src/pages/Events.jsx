import React from "react";
import { FaSearch } from "react-icons/fa";
import EventList from "../components/EventList";
import { eventsList } from "../data/eventListData";

const Events = () => {
  return (
    <div className="min-h-screen bg-cover bg-center">
      <section className="bg-black bg-opacity-70 bg-blend-overlay py-20 px-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-extrabold text-purple-500 drop-shadow-lg mb-4">
            Events
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Seamless Sports Events, From Planning to Play
          </p>
        </div>

        {/* Search and Filter */}
        <form className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white px-6 py-4 rounded-3xl shadow-lg">
          {/* Search Input */}
          <div className="relative w-full md:w-[40%] min-w-[250px]">
            <input
              className="w-full border-2 border-gray-200 text-lg px-5 py-2 pr-12 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="text"
              id="filter"
              name="filter"
              placeholder="Search for an event..."
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-800"
              aria-label="Search"
            >
              <FaSearch className="w-5 h-5" />
            </button>
          </div>

          {/* Dropdown Filter */}
          <div className="w-full md:w-1/4">
            <select className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
              <option value="">All Tags</option>
              <option value="upcoming">Upcoming</option>
              <option value="special">Special</option>
              <option value="early-access">Early Access</option>
            </select>
          </div>
        </form>

        {/* Event List */}
        <div className="w-full bg-white bg-opacity-95 p-8 rounded-3xl shadow-2xl">
          <div className="flex flex-col gap-4">
            {eventsList.map((eventData, index) => (
              <div key={index} className="w-full">
                <EventList {...eventData} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
