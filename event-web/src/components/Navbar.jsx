import React, { useState, useEffect } from "react";
import { FaOpencart, FaTicketAlt } from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";
import { RiMenu3Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { MdConfirmationNumber } from "react-icons/md";
import { BsTicketPerforated } from "react-icons/bs";
import "../index.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  useEffect(() => {
    console.log("User updated in Navbar:", user);
  }, [user, logout]);

  const navigate = useNavigate();
  const { getTotalTickets } = useCart();

  const totalTickets = getTotalTickets();

  const toggleMenu = () => setIsOpen(!isOpen);

  const goToCart = () => navigate("/cart");
  const goToBookings = () => navigate("/bookings");

  const handleLinkClick = () => setIsOpen(false);

  const getUserInitial = (name) => {
    return name?.trim()?.[0]?.toUpperCase() || "";
  };

  return (
    <div className="text-gray-800 py-4 px-6 flex justify-between items-center relative shadow">
      <div className="text-2xl md:text-4xl poppins-head font-extrabold tracking-wide">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
        >
          True<span className="text-blue-600 ml-1">EVENTS</span>
        </Link>
      </div>

      {/* Main Nav Links */}
      <ul className="hidden sm:flex space-x-8 text-lg">
        <li>
          <Link to="/" className="text-gray-800 hover:text-blue-500">
            Home
          </Link>
        </li>
        <li>
          <Link to="/collection" className="text-gray-800 hover:text-blue-500">
            Events
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-gray-800 hover:text-blue-500">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-gray-800 hover:text-blue-500">
            Contact
          </Link>
        </li>
      </ul>

      {/* Right Side Icons */}
      <div className="hidden sm:flex space-x-6 text-2xl items-center">
        {user && (
          <div
            className="cursor-pointer text-gray-800 hover:text-blue-500"
            onClick={goToBookings}
          >
            <BsTicketPerforated className="text-2xl" />
          </div>
        )}

        {/* Cart */}
        <div
          className="relative cursor-pointer"
          onClick={goToCart}
          aria-label="Go to cart"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goToCart()}
        >
          <FaOpencart />
          {totalTickets > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalTickets}
            </span>
          )}
        </div>

        {/* User Avatar or Login Dropdown */}
        {user ? (
          <div
            className="relative group w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer select-none text-sm font-semibold"
            title={user.name}
          >
            {getUserInitial(user.name)}
            <div className="absolute right-0 top-full mt-1 w-40 bg-white shadow-lg rounded-md border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 ease-in-out z-50 text-base">
              <div className="block px-4 py-2 text-gray-700 cursor-default border-b border-gray-200">
                {user.name}
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
                type="button"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="relative group">
            <div className="cursor-pointer">
              <MdPersonOutline className="text-gray-800 hover:text-blue-500" />
            </div>
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 ease-in-out z-50 text-lg">
              <Link
                to="/signin"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                Signup
              </Link>
              <Link
                to="/join-us"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                Join Us
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden">
        <RiMenu3Line
          onClick={toggleMenu}
          className="text-2xl cursor-pointer text-gray-800"
        />
      </div>

      {isOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
          <ul className="text-center py-4 space-y-4 text-xl">
            <li>
              <Link
                to="/"
                onClick={handleLinkClick}
                className="text-gray-800 hover:text-blue-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/collection"
                onClick={handleLinkClick}
                className="text-gray-800 hover:text-blue-500"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={handleLinkClick}
                className="text-gray-800 hover:text-blue-500"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={handleLinkClick}
                className="text-gray-800 hover:text-blue-500"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
