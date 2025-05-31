import React, { useContext, useMemo } from "react";
import EventList from "./EventList";
import { EventContext } from "../context/EventContext";
import EventCardSkeleton from "./EventCardSkeleton";

const AllTimeCollection = () => {
  const { allEventsFull, loading } = useContext(EventContext);

  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);

  
  const topPricedEvents = useMemo(() => {
    if (!Array.isArray(allEventsFull)) return [];

    return allEventsFull
      .filter((event) => {
        const eventDate = new Date(event.eventDate);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      })
      .sort((a, b) => b.ticketPrice - a.ticketPrice)
      .slice(0, 8); 
  }, [allEventsFull, today]);

  const showSkeletons =
    loading || !Array.isArray(allEventsFull) || allEventsFull.length === 0;

  return (
    <div className="my-10">
   <div className="py-8 text-center text-3xl">
  <div className="inline-flex gap-2 items-center mb-3">
    <p className="text-gray-500 text-5xl font-medium">
      PREMIER <span className="text-gray-700">EVENTS</span>
    </p>
  </div>
  <p className="w-3/4 m-auto text-xs sm:text-sm md:text-lg text-gray-600">
    Discover the most exclusive and high-value upcoming events curated just for you.
  </p>
</div>

      <div className="mt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {showSkeletons
            ? Array.from({ length: 4 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))
            : topPricedEvents.map((event) => (
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

export default AllTimeCollection;
