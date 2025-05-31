
import React, { useContext, useEffect, useState } from "react";
import FilterSection from "../components/FilterSection";
import EventList from "../components/EventList";
import { EventContext } from "../context/EventContext";
import EventCardSkeleton from "../components/EventCardSkeleton";

const sortOptions = ["Price: Low to High", "Price: High to Low"];

const sortEventsByPrice = (events, sortOrder) => {
  if (!sortOrder) return events;

  return [...events].sort((a, b) => {
    if (sortOrder === "Price: Low to High") return a.ticketPrice - b.ticketPrice;
    if (sortOrder === "Price: High to Low") return b.ticketPrice - a.ticketPrice;
    return 0;
  });
};

const Collection = () => {
  const { allEvents, loading, error, page, setPage, totalCount, limit } =
    useContext(EventContext);

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");

  const totalPages = Math.ceil(totalCount / limit);
  const skeletonItems = Array(limit).fill(null);

  useEffect(() => {
    if (Array.isArray(allEvents)) {
      const sorted = sortEventsByPrice(allEvents, selectedSort);
      setFilteredEvents(sorted);
    }
  }, [allEvents, selectedSort]);

  const showSkeletons =
    loading || !Array.isArray(allEvents) || allEvents.length === 0 || error;

  return (
    <div className="min-h-[60vh] flex flex-col md:flex-row gap-8 px-4 my-10">
      <div className="flex-shrink-0 w-full md:w-1/5 flex flex-col gap-6">
        <p className="text-gray-500 text-3xl font-medium mb-2">FILTER</p>
        <FilterSection
          title="SORT BY"
          options={sortOptions}
          selectedOption={selectedSort}
          onChange={setSelectedSort}
        />
      </div>

      <div className="flex-grow w-full md:w-4/5 flex flex-col gap-6">
        {showSkeletons ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skeletonItems.map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredEvents.map((event) => (
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

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
                >
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-3 py-1 rounded ${
                          page === pageNum
                            ? "bg-blue-600 text-white"
                            : "border hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page >= totalPages}
                  className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Collection;
