import React from "react";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">My Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
