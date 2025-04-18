import React from 'react'

const HostSettings = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-purple-600">Host Settings</h1>
        <p className="text-gray-600">Manage your host profile and preferences.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Profile Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <input type="text" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" defaultValue="Host User" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email Address</label>
            <input type="email" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" defaultValue="host@example.com" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">New Password</label>
          <input type="password" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="Enter new password" />
        </div>

        <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default HostSettings