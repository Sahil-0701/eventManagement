import React, { useContext, useState, useEffect } from "react";
import EventList from "./EventList";
import { EventContext } from "../context/EventContext";
import EventCardSkeleton from "./EventCardSkeleton";

const BestSeller = () => {
  const { allEvents, loading } = useContext(EventContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (Array.isArray(allEvents)) {
      const filteredEvents = allEvents.filter(
        (event) => event.isFeatured === true
      );
      setEvents(filteredEvents);
    }
  }, [allEvents]);

  const showSkeletons =
    loading || !Array.isArray(allEvents) || allEvents.length === 0;

  return (
    <div className="my-10">
      <div className="py-8 text-center text-3xl">
        <div className="inline-flex gap-2 items-center mb-3 ">
          <p className="text-gray-500 text-5xl font-medium">
            FEATURED <span className="text-gray-700">EVENTS</span>
          </p>
        </div>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-lg text-gray-600">
          Discover our most popular events that have captured the hearts of our
          community.
        </p>
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {showSkeletons
            ? Array.from({ length: 4 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))
            : events.map((event) => (
                <EventList
                  key={event._id}
                  _id={event._id}
                  eventTitle={event.eventTitle}
                  eventImages={event.eventImages}
                  ticketPrice={event.ticketPrice}
                  eventDescription={event.eventDescription}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
