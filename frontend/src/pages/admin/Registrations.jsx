import React, { useState } from "react";

const dummyRegistrations = [
  {
    id: 1,
    user: "Aarav Mehta",
    email: "aarav@example.com",
    event: "Tech Talk 2025",
    date: "2025-04-05",
  },
  {
    id: 2,
    user: "Simran Kaur",
    email: "simran@example.com",
    event: "Cultural Night",
    date: "2025-04-02",
  },
  {
    id: 3,
    user: "Rohit Sharma",
    email: "rohit@example.com",
    event: "AI Workshop",
    date: "2025-03-30",
  },
];

const Registrations = () => {
  const [search, setSearch] = useState("");

  const filtered = dummyRegistrations.filter(
    (r) =>
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.event.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Event Registrations</h1>
      <p className="text-gray-700 mb-6">
        Track and manage who has registered for which event.
      </p>

      <input
        type="text"
        placeholder="Search by user or event..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full md:w-1/2 p-3 border rounded-lg border-gray-300"
      />

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-purple-100 text-purple-700 uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Event</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((reg) => (
              <tr key={reg.id} className="border-b">
                <td className="px-6 py-4">{reg.user}</td>
                <td className="px-6 py-4">{reg.email}</td>
                <td className="px-6 py-4">{reg.event}</td>
                <td className="px-6 py-4">{reg.date}</td>
                <td className="px-6 py-4 space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                    View
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Registrations;
