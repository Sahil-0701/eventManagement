import React from "react";

const CreateEvent = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Create a New Event</h1>

      <form className="space-y-4 bg-white shadow-md p-6 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Title</label>
          <input type="text" className="w-full mt-1 p-3 border rounded-lg" placeholder="Enter event title" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea className="w-full mt-1 p-3 border rounded-lg" rows="4" placeholder="Enter event details"></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" className="w-full mt-1 p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" className="w-full mt-1 p-3 border rounded-lg" placeholder="Venue" />
          </div>
        </div>

        <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
          Submit Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
