import React from 'react';

const EventList = ({
  image,
  title,
  date,
  time,
  location,
  description,
  price,
  organizer,
  tags,
  attendeesCount,
  isOnline,
  registrationLink
}) => {
  return (
    <div className="flex flex-row rounded-lg overflow-hidden shadow-2xl bg-white min-h-[250px]">
      <img
        src={image}
        alt={title}
        className="w-1/3 object-cover"
      />

      <div className="p-6 flex flex-col justify-between w-2/3">
        <div>
          <div className="flex flex-wrap justify-between items-center text-gray-500 text-sm mb-2">
            <span>{date}</span>
            <span>{time}</span>
            <span>{isOnline ? 'Online' : location}</span>
          </div>

          <h3 className="text-xl font-semibold text-purple-700 mb-1 truncate">
            {title}
          </h3>

          <p className="text-gray-600 text-sm overflow-hidden mb-2">
            {description}
          </p>

          <div className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Organizer:</span> {organizer}
          </div>

          <div className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Price:</span> ₹{price}
          </div>

          <div className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Attendees:</span> {attendeesCount}
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <a href={registrationLink} target="_blank" rel="noopener noreferrer">
          <button className="w-full mt-4 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300">
            Register
          </button>
        </a>
      </div>
    </div>
  );
};

export default EventList;
