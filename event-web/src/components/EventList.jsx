import React from "react";
import { useNavigate } from "react-router-dom";
import { getOptimizedImage } from "../helper/getOptimizedImage";

const EventList = ({
  _id,
  eventTitle,
  eventImages,
  ticketPrice,
  eventDescription,
}) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/event/${id}`);
  };

  return (
    <div
      className="shadow-lg rounded-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300 flex flex-col gap-4 bg-white cursor-pointer"
      onClick={() => handleClick(_id)}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
        <img
          src={getOptimizedImage(eventImages[0])}
          alt={`Event ${_id}`}
          loading="lazy"
          width="600"
          height="400"
          onError={(e) => {
            e.target.src = "/helper.jpg";
          }}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 truncate">
            {eventTitle}
          </h3>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3">
            {eventDescription}
          </p>
        </div>
        <div className="mt-5 text-base font-semibold text-green-700">
          ${ticketPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default EventList;
