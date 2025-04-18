import React from "react";

const MyEvents = () => {
  const events = [
    { id: 1, name: "Startup Pitch", status: "Approved" },
    { id: 2, name: "Hackathon 2025", status: "Pending" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">My Events</h1>
      <p className="text-gray-700 mb-6">Manage all your created events.</p>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{event.name}</h2>
              <p className={`text-sm ${event.status === "Approved" ? "text-green-600" : "text-yellow-600"}`}>
                Status: {event.status}
              </p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm">
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
