import React from "react";

const dummyUsers = [
  {
    id: 1,
    name: "Aarav Mehta",
    email: "aarav@example.com",
    role: "Attendee",
  },
  {
    id: 2,
    name: "Simran Kaur",
    email: "simran@example.com",
    role: "Volunteer",
  },
  {
    id: 3,
    name: "Rohit Sharma",
    email: "rohit@example.com",
    role: "Organizer",
  },
];

const Users = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">User Management</h1>
      <p className="text-gray-700 mb-6">
        View registered users, assign roles, or take action.
      </p>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-purple-100 text-purple-700 uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs">
                    Promote
                  </button>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs">
                    Block
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
