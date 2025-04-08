import React from "react";

const EventCard = ({ image, title, date, time, location, description }) => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden shadow-lg bg-white h-[400px]">
      <img
        src={image}
        alt={title}
        className="w-full h-40 sm:h-48 object-cover"
      />

      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
            <span>{date}</span>
            <span>{time}</span>
            <span>{location}</span>
          </div>
          <h3 className="text-xl font-semibold text-purple-700 mb-2 truncate">
            {title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 overflow-hidden">
            {description}
          </p>
        </div>
        <button className="w-full mt-4 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300">
          Get a Ticket
        </button>
      </div>
    </div>
  );
};

export default EventCard;
