import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center  px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
        <h2 className="text-4xl font-bold text-indigo-600 mb-2 text-center">Welcome Back 💫</h2>
        <p className="text-gray-500 mb-6 text-center">Log in to your trueEvents account</p>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 mb-4 rounded border border-red-300">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <FaSpinner className="animate-spin inline mr-2" /> : null}
            {loading ? "Signing In..." : "Sign In 🚀"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
