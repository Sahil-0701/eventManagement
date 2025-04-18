import React from "react";

const dummyTeam = [
  { id: 1, name: "Riya Kapoor", role: "Volunteer" },
  { id: 2, name: "Ishan Verma", role: "Marketing" },
];

const TeamManagement = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Team Management</h1>
      <p className="text-gray-700 mb-6">View and assign roles to your team members.</p>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-purple-100 text-purple-700 uppercase">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyTeam.map((member) => (
              <tr key={member.id} className="border-b">
                <td className="px-6 py-4">{member.name}</td>
                <td className="px-6 py-4">{member.role}</td>
                <td className="px-6 py-4 space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs">
                    Promote
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                    Remove
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

export default TeamManagement;
