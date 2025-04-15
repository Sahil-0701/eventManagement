import React from "react";
import {
  UserCircle,
  CalendarCheck,
  Ticket,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: 1240,
    icon: <UserCircle className="w-6 h-6 text-blue-500" />,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Tickets Sold",
    value: 980,
    icon: <Ticket className="w-6 h-6 text-green-500" />,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Revenue",
    value: "₹72,500",
    icon: <DollarSign className="w-6 h-6 text-yellow-500" />,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Upcoming Events",
    value: 5,
    icon: <CalendarCheck className="w-6 h-6 text-purple-500" />,
    color: "bg-purple-100 text-purple-700",
  },
];

const pendingApprovals = [
    { id: 1, name: "Tech Expo 2025", organizer: "John Doe", date: "12 Apr 2025" },
    { id: 2, name: "Startup Summit", organizer: "Riya Kapoor", date: "18 Apr 2025" },
    { id: 3, name: "AI & Robotics Meet", organizer: "Mehul Jain", date: "20 Apr 2025" },
    { id: 4, name: "GreenTech Conference", organizer: "Neha Verma", date: "22 Apr 2025" },
    { id: 5, name: "CyberSec Forum", organizer: "Arjun Mehta", date: "25 Apr 2025" },
    { id: 6, name: "Design Thinking Bootcamp", organizer: "Priya Nair", date: "27 Apr 2025" },
    { id: 7, name: "HackVerse 2025", organizer: "Vikram Shah", date: "30 Apr 2025" },
    { id: 8, name: "Entrepreneurs Unleashed", organizer: "Sanya Mathur", date: "2 May 2025" },
    { id: 9, name: "Digital Art Showcase", organizer: "Kunal Kapoor", date: "5 May 2025" },
    { id: 10, name: "VR World Fair", organizer: "Ritika Singh", date: "7 May 2025" },
    
  ];
  
const Dashboard = () => {
  const handleApproval = (id, status) => {
    console.log(`Event ID ${id} was ${status}`); // Replace with actual API logic
    // Optional: remove from list after decision
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-purple-600 mb-2">Admin Dashboard</h1>
        <p className="text-gray-700">
          Welcome to your control panel. Here's a quick overview of the system.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl p-5 shadow-sm flex items-center justify-between ${stat.color}`}
          >
            <div>
              <p className="text-sm font-medium">{stat.title}</p>
              <p className="text-xl font-bold mt-1">{stat.value}</p>
            </div>
            {stat.icon}
          </div>
          
        ))}
      </div>

      {/* Approval Requests */}
      <div className="bg-white p-5 rounded-xl shadow-md border">
      
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-yellow-600" /> Pending Event Approvals
        </h2>

        {pendingApprovals.length === 0 ? (
          <p className="text-gray-500">No pending events at the moment.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {pendingApprovals.map((event) => (
              <li
                key={event.id}
                className="py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
              >
                <div>
                  <p className="font-medium text-gray-700">{event.name}</p>
                  <p className="text-sm text-gray-500">
                    By {event.organizer} • {event.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApproval(event.id, "accepted")}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition"
                  >
                    <CheckCircle className="w-4 h-4" /> Accept
                  </button>
                  <button
                    onClick={() => handleApproval(event.id, "rejected")}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
        )}
      </div>
    </div>
  );
};

export default Dashboard;
