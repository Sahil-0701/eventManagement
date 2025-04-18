import React from "react";

const MyTickets = () => {
  const tickets = [
    { id: 1, title: "Basketball Championship", date: "2025-04-21", status: "Confirmed" },
    { id: 2, title: "Tech Expo", date: "2025-04-25", status: "Pending" },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">My Tickets</h1>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="bg-white shadow p-4 rounded-lg mb-4 border">
          <h2 className="text-xl font-semibold text-gray-800">{ticket.title}</h2>
          <p className="text-gray-600">Date: {ticket.date}</p>
          <p className={`text-sm font-medium ${ticket.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>
            Status: {ticket.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyTickets;
