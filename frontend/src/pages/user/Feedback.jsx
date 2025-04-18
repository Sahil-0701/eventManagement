import React, { useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for your feedback!");
    setFeedback("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">We Value Your Feedback</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border border-gray-300 p-4 rounded-lg resize-none min-h-[150px]"
          placeholder="Share your thoughts..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Feedback;
