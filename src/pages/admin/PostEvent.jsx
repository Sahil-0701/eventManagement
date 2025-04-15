import React, { useState } from "react";

const PostEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    day: "",
    location: "",
    type: "",
    description: "",
    terms: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.day) newErrors.day = "Day is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.type) newErrors.type = "Type of event is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.terms) newErrors.terms = "Terms & conditions are required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Event Submitted:", formData);

    // Reset form
    setFormData({
      title: "",
      date: "",
      day: "",
      location: "",
      type: "",
      description: "",
      terms: "",
      image: "",
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">
        Post New Event
      </h1>
      <p className="text-gray-700 mb-6">
        Fill the form below to create a new event.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        {/* Title */}
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            className={`w-full p-3 border rounded-lg ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg ${
              errors.date ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        {/* Day */}
        <div>
          <input
            type="text"
            name="day"
            value={formData.day}
            onChange={handleChange}
            placeholder="Day of the Event (e.g., Saturday)"
            className={`w-full p-3 border rounded-lg ${
              errors.day ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.day && <p className="text-red-500 text-sm">{errors.day}</p>}
        </div>

        {/* Location */}
        <div>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Event Location"
            className={`w-full p-3 border rounded-lg ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location}</p>
          )}
        </div>

        {/* Type of Event */}
        <div>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg appearance-none ${
              errors.type ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Event Type</option>
            <option value="Seminar">Seminar</option>
            <option value="Workshop">Workshop</option>
            <option value="Webinar">Webinar</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Competition">Competition</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
        </div>

        {/* Description */}
        <div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Event Description"
            rows={4}
            className={`w-full p-3 border rounded-lg ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Terms & Conditions */}
        <div>
          <textarea
            name="terms"
            value={formData.terms}
            onChange={handleChange}
            placeholder="Terms & Conditions"
            rows={3}
            className={`w-full p-3 border rounded-lg ${
              errors.terms ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition"
        >
          Post Event
        </button>
      </form>
    </div>
  );
};

export default PostEvent;
