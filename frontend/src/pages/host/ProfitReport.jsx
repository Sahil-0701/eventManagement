import React from "react";

const ProfitReport = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Profit Report</h1>
      <p className="text-gray-700 mb-6">Analyze revenue from your events.</p>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Total Revenue</span>
          <span className="text-xl font-semibold text-green-600">₹ 45,000</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Expenses</span>
          <span className="text-xl font-semibold text-red-500">₹ 10,000</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Net Profit</span>
          <span className="text-xl font-semibold text-purple-600">₹ 35,000</span>
        </div>
      </div>
    </div>
  );
};

export default ProfitReport;
