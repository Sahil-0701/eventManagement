import React from "react";

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-purple-600">Settings</h1>
        <p className="text-gray-600">Manage your account and platform preferences.</p>
      </div>

      {/* Account Settings */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Account Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              defaultValue="Admin User"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              defaultValue="admin@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Change Password</label>
          <input
            type="password"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="New Password"
          />
        </div>

        <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
          Save Changes
        </button>
      </div>

      {/* Platform Preferences */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Preferences</h2>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Enable Email Notifications</span>
          <input type="checkbox" defaultChecked className="h-5 w-5 text-purple-600" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Dark Mode</span>
          <input type="checkbox" className="h-5 w-5 text-purple-600" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
