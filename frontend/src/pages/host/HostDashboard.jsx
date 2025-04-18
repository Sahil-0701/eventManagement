import React from "react";

const HostDashboard = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Host Dashboard</h1>
      <p className="text-gray-700 mb-6">Overview of your hosted events, performance, and stats.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow-md rounded-lg border-l-4 border-purple-500">
          <h2 className="text-xl font-semibold text-gray-800">Total Events</h2>
          <p className="text-2xl text-purple-600 font-bold mt-2">12</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg border-l-4 border-green-500">
          <h2 className="text-xl font-semibold text-gray-800">Total Profit</h2>
          <p className="text-2xl text-green-600 font-bold mt-2">₹ 45,000</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold text-gray-800">Team Members</h2>
          <p className="text-2xl text-yellow-600 font-bold mt-2">8</p>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
