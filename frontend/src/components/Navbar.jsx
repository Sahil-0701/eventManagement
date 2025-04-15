import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { IoIosLink } from "react-icons/io";
import { SiEventstore } from "react-icons/si";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-[10vh] z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-full">
        <Link
          to="/"
          className="text-gray-800 text-3xl font-bold flex items-center"
        >
          <SiEventstore className="mr-2" />
          TrueEvent
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/events" className="text-gray-700 hover:text-blue-600">Events</Link>
          <Link to="/gallery" className="text-gray-700 hover:text-blue-600">Gallery</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/login" className="flex items-center text-gray-700 hover:text-blue-600">
            <IoIosLink size={20} className="mr-1" />
            Login
          </Link>
          <Link to="/register" className="text-gray-700 hover:text-blue-600">
            Register
          </Link>
        </div>

        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t mt-[10vh]">
          <div className="flex flex-col space-y-4 p-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link to="/events" className="text-gray-700 hover:text-blue-600">Events</Link>
            <Link to="/gallery" className="text-gray-700 hover:text-blue-600">Gallery</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
