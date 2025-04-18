import React from "react";
import { Link } from "react-router-dom";
import { events } from "../../data/eventData";
import EventCard from "../../components/EventCard";




const UserHome = () => {
  return (
    <section className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-700">Explore Events</h1>
        <p className="mt-2 text-gray-600">Join amazing events happening around you!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  </section>
  )
}

export default UserHome
