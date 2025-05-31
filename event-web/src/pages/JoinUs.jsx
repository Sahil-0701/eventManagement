import React from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

const JoinUs = () => {
  const handleLinkClick = (event) => {
    event.preventDefault();
    window.open(`${import.meta.env.VITE_ADMIN_PANEL}/signin`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-6 flex flex-col">
      <Link to="/">
        <div className="mb-4">
          <HiArrowSmLeft className="text-3xl text-gray-600 cursor-pointer hover:text-gray-800 transition" />
        </div>
      </Link>

      <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <p className="text-4xl sm:text-5xl font-bold text-gray-600 mb-6">
          JOIN THE <span className="text-gray-700">TRUE EVENTS COMMUNITY</span>
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mb-6">
          We're more than just a platform — we're a growing network of
          organizers, athletes, fans, and event professionals. Sign up to get
          the latest updates, access exclusive event tools, and stay ahead with
          early insights into trending events and features!
        </p>

        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
          onClick={() =>
            window.open(`${import.meta.env.VITE_ADMIN_PANEL}/signup`, "_blank")
          }
        >
          Sign Up Now
        </button>

        <p className="mt-6 text-sm text-gray-500">
          Already a member?{" "}
          <a
            href="/login"
            className="text-blue-600 underline hover:text-blue-800"
            onClick={handleLinkClick}
          >
            Sign in here
          </a>
        </p>
        <p className="mt-6 text-xs text-gray-500">
          Will Redirect to Admin Panel
        </p>
      </div>
    </div>
  );
};

export default JoinUs;
