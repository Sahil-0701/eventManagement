import React, { useContext, useState } from "react";
import EventList from "./EventList";
import { useEffect } from "react";
import { EventContext } from "../context/EventContext";
import EventCardSkeleton from "./EventCardSkeleton";

const UpcomingEvents = () => {
  const { allEvents, loading } = useContext(EventContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(allEvents);
  }, [allEvents]);

  return (
    <div className="my-10">
      <div className="py-8 text-center text-3xl">
        <div className="inline-flex gap-2 items-center mb-3 ">
          <p className="text-gray-500 text-5xl font-medium">
            UPCOMING <span className="text-gray-700">EVENTS</span>
          </p>
        </div>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-lg text-gray-600">
          Discover, organize, and manage events with ease. Whether you're
          hosting or attending, our platform makes it seamless.
        </p>
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
          {loading
            ? Array(4)
                .fill(null)
                .map((_, index) => <EventCardSkeleton key={index} />)
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

export default UpcomingEvents;
