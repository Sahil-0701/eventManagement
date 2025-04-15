import React from "react";

const dummySchedule = [
  {
    id: 1,
    title: "Inauguration Ceremony",
    time: "09:00 AM",
    date: "2025-05-20",
    location: "Auditorium Hall",
  },
  {
    id: 2,
    title: "Tech Expo Stalls Open",
    time: "10:30 AM",
    date: "2025-05-20",
    location: "Expo Grounds",
  },
  {
    id: 3,
    title: "AI Workshop",
    time: "02:00 PM",
    date: "2025-05-20",
    location: "Lab 2, Block C",
  },
  {
    id: 4,
    title: "Cultural Performances",
    time: "06:00 PM",
    date: "2025-05-20",
    location: "Open Stage",
  },
];

const Schedule = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Event Schedule</h1>
      <p className="text-gray-700 mb-6">
        View and manage event schedules, timeslots, and agendas.
      </p>

      <div className="space-y-4">
        {dummySchedule.map((slot) => (
          <div
            key={slot.id}
            className="bg-white shadow-md rounded-lg p-4 border-l-4 border-purple-500 relative"
          >
            <div className="absolute left-0 top-4 -ml-3 w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
            <div className="ml-6">
              <h2 className="text-xl font-semibold text-gray-800">{slot.title}</h2>
              <p className="text-gray-600 text-sm">
                📅 {slot.date} | 🕒 {slot.time} | 📍 {slot.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
