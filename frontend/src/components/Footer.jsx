import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { SiEventstore } from "react-icons/si";
import { Link } from "react-router";


const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <h3 className="text-5xl ml-3 mb-3">
            {" "}
            <SiEventstore />
          </h3>
          <p className="text-gray-500 text-sm">
            &copy; 2025 True Events. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap justify-center space-x-8 mb-8 md:mb-0">
          <Link
            to={"/about"}
            className="text-gray-600 hover:text-purple-600 text-lg transition duration-300"
          >
            About
          </Link>
          <Link
            to={"/admin-dashbord"}
            className="text-gray-600 hover:text-purple-600 text-lg transition duration-300"
          >
            Services
          </Link>
          <Link
            to={"/contact"}
            className="text-gray-600 hover:text-purple-600 text-lg transition duration-300"
          >
            Contact
          </Link>
        </div>

        <div className="flex space-x-6 text-2xl mb-8 md:mb-0">
          <a
            href="https://facebook.com"
            className="text-gray-600 hover:text-purple-600 transform transition duration-300 hover:scale-110"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            className="text-gray-600 hover:text-purple-600 transform transition duration-300 hover:scale-110"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            className="text-gray-600 hover:text-purple-600 transform transition duration-300 hover:scale-110"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://instagram.com"
            className="text-gray-600 hover:text-purple-600 transform transition duration-300 hover:scale-110"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
