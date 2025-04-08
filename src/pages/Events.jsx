import React from "react";
import Navbar from "../components/Navbar";
import { FaSearch } from "react-icons/fa";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";

import { events } from "../data/eventData";

const Events = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/galaxy.jpg')" }}
    >
      <Navbar />

      <section className="bg-cover bg-center bg-opacity-60 bg-blend-overlay py-16 px-4">
        <div className="max-w-7xl mx-auto text-center mb-[5%]">
          <h2 className="text-7xl font-bold text-purple-600 mb-2">Events</h2>
          <p className="text-gray-500 text-lg">
            Seamless Sports Events, From Planning to Play
          </p>
        </div>

        <form className="flex justify-around gap-4 mt-8">
          <div className="relative w-[30%] min-w-[200px]">
            <input
              className="bg-white w-full text-2xl font-bold px-4 py-2 rounded-3xl pr-12"
              type="text"
              id="filter"
              name="filter"
              placeholder="What are you looking for?"
            />

            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600">
              <FaSearch className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <label className="text-lg text-gray-700" htmlFor="category">
              Sort by:
            </label>
            <select
              name="category"
              id="category"
              className="bg-white text-lg text-gray-700 rounded-2xl px-6 py-2 focus:outline-none shadow-sm"
            >
              <option value="upcoming">Upcoming</option>
              <option value="special">Special</option>
              <option value="early-access">Early Access</option>
            </select>
          </div>
        </form>
        <div className="w-full rounded-3xl bg-white p-5 space-y-8 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.map((eventData, index) => (
              <EventCard key={index} {...eventData} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Events;
