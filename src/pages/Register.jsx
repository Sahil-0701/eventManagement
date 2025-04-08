import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();  // Initialize useNavigate hook for redirection

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !role) {
      setError("Please fill out all fields.");
      return;
    }

    // Email format validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password strength check (example: at least 6 characters)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Clear previous error messages
    setError("");

    // Simulate successful registration (this could be a backend call in real apps)
    console.log("Registered with:", { name, email, password, role });

    // Set success message and redirect after a delay
    setSuccessMessage("Registration successful! Redirecting to login...");
    setTimeout(() => {
      navigate("/login");  // Redirect to the login page after successful registration
    }, 2000);  // Wait 2 seconds before redirect
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-black/50"
      style={{ backgroundImage: "url('/galaxy.jpg')" }}
    >
      <Navbar />
      <div className="flex justify-center items-center py-10 px-2">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl p-10 shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Register
          </h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm text-gray-800 mb-1">
                Full Name
              </label>
              <input
                className="h-12 px-4 rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm text-gray-800 mb-1">
                Email Address
              </label>
              <input
                className="h-12 px-4 rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-800 mb-1">
                Role
              </label>
              <div className="flex gap-6">
                <label className="flex items-center space-x-2 text-gray-700">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === "user"}
                    onChange={(e) => setRole(e.target.value)}
                    className="accent-purple-600"
                    required
                  />
                  <span>User</span>
                </label>

                <label className="flex items-center space-x-2 text-gray-700">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={(e) => setRole(e.target.value)}
                    className="accent-purple-600"
                  />
                  <span>Admin</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm text-gray-800 mb-1">
                Password
              </label>
              <input
                className="h-12 px-4 rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                id="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

            <button
              className="w-full py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition duration-200"
              type="submit"
            >
              Register
            </button>

            <p className="text-sm text-center text-gray-600 mt-2">
              Already have an account?{" "}
              <a href="/login" className="text-purple-600 hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
