import React, { useState } from "react";
import { Link } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill out both fields.");
      return;
    }

    console.log("Logged in with:", email, password);
    setError("");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-black/50"
      style={{ backgroundImage: "url('/galaxy.jpg')" }}
    >
      <div className="flex justify-center items-center py-20 px-4 h-[90vh]">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl p-10 shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Login
          </h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm text-gray-700 mb-1">
                Email address
              </label>
              <input
                className="h-12 px-4 rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                id="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm text-gray-700 mb-1">
                Password
              </label>
              <input
                className="h-12 px-4 rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                id="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              className="w-full py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition duration-200"
              type="submit"
            >
              Login
            </button>

            <p className="text-sm text-center text-gray-600 mt-2">
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
