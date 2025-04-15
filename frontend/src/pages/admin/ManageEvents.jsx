import React, { useState, useEffect } from "react";

const dummyEvents = [
  {
    id: 1,
    title: "Tech Fest 2025",
    date: "2025-05-20",
    location: "Main Auditorium",
    image:
      "https://images.unsplash.com/photo-1725027090555-40b031f52b01?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Cultural Night",
    date: "2025-06-05",
    location: "Open Grounds",
    image:
      "https://images.unsplash.com/photo-1742205309355-70e063aa1865?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Startup Pitch Day",
    date: "2025-07-15",
    location: "Seminar Hall 3",
    image:
      "https://images.unsplash.com/photo-1743090597684-8929e6b86b74?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Replace this with real API fetch later
    setEvents(dummyEvents);
  }, []);

  const handleEdit = (id) => {
    console.log("Edit event ID:", id);
    // Navigate to edit page or open modal
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this event?");
    if (confirm) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Manage Events</h1>
      <p className="text-gray-700 mb-6">View, edit, or delete previously created events.</p>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{event.title}</td>
                  <td className="py-3 px-4">{event.date}</td>
                  <td className="py-3 px-4">{event.location}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(event.id)}
                      className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEvents;
