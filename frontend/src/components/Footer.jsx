import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { SiEventstore } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#3F7D58] text-white">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-[#EC5228] p-2 rounded-lg shadow-lg">
                <SiEventstore className="text-4xl text-white" />
              </div>
              <Link to="/" className="text-2xl font-bold text-white">
                TrueEvents
              </Link>
            </div>
            <p className="text-[#EFEFEF] leading-relaxed">
              Making event management effortless and enjoyable for everyone.
              Join us in creating memorable experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="bg-white p-3 rounded-full shadow-md text-[#3F7D58] hover:text-[#EC5228] transform transition duration-300 hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="bg-white p-3 rounded-full shadow-md text-[#3F7D58] hover:text-[#EC5228] transform transition duration-300 hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="bg-white p-3 rounded-full shadow-md text-[#3F7D58] hover:text-[#EC5228] transform transition duration-300 hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="bg-white p-3 rounded-full shadow-md text-[#3F7D58] hover:text-[#EC5228] transform transition duration-300 hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[#EFEFEF]">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/about" className="text-[#EFEFEF] hover:text-[#EC5228] transition duration-300">
                About Us
              </Link>
              <Link to="/admin-dashboard" className="text-[#EFEFEF] hover:text-[#EC5228] transition duration-300">
                Services
              </Link>
              <Link to="/events" className="text-[#EFEFEF] hover:text-[#EC5228] transition duration-300">
                Events
              </Link>
              <Link to="/contact" className="text-[#EFEFEF] hover:text-[#EC5228] transition duration-300">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[#EFEFEF]">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <div className="w-2 h-2 bg-[#EC5228] rounded-full"></div>
                </div>
                <p className="text-[#EFEFEF]">123 Event Street, Event City, EC 12345</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <div className="w-2 h-2 bg-[#EC5228] rounded-full"></div>
                </div>
                <p className="text-[#EFEFEF]">Email: info@trueevents.com</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <div className="w-2 h-2 bg-[#EC5228] rounded-full"></div>
                </div>
                <p className="text-[#EFEFEF]">Phone: (123) 456-7890</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[#EFEFEF]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#EFEFEF]">&copy; {new Date().getFullYear()} TrueEvents. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-[#EFEFEF] hover:text-[#EC5228] transition duration-300">Privacy Policy</Link>
              <Link to="/terms" className="text-[#EFEFEF] hover:text-[#EC5228] transition duration-300">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
