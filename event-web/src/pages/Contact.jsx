import React, { useState, useEffect } from "react";
import contactNow from "../assets/shopme.jpg";
import { Skeleton } from "@mui/material";

const Contact = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = contactNow;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, []);

  return (
    <div className="px-4 py-12 space-y-16 min-h-[80vh] max-w-7xl mx-auto">
    
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-700">
          CONTACT <span className="text-blue-600">US</span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Have questions or need assistance? We're here to help! Reach out to us
          for support, inquiries, or just to say hello — we'd love to hear from
          you.
        </p>
      </div>

   
      <div className="flex flex-col md:flex-row gap-12 items-start md:items-stretch">
     
        <div className="w-full md:w-1/2">
          {!imageLoaded && !imageError ? (
            <div className="relative">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={400}
                animation="wave"
                className="rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-400 animate-pulse">Loading...</p>
              </div>
            </div>
          ) : imageError ? (
            <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Failed to load image</p>
            </div>
          ) : (
            <div className="relative group">
              <img
                src={contactNow}
                alt="Contact Us"
                className="w-full h-[400px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" />
            </div>
          )}
        </div>

       
        <div className="w-full md:w-1/2 flex flex-col gap-8">
       
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              Our Store
            </h3>
            <div className="text-gray-600 space-y-2">
              <p className="flex items-center">
                <span className="mr-2">📍</span> 54709 Willms Station
              </p>
              <p className="flex items-center">
                <span className="mr-2">🏢</span> Suite 350, Sydney, Australia
              </p>
              <p className="flex items-center">
                <span className="mr-2">📞</span> Tel: (+61415) 555-012
              </p>
              <p className="flex items-center">
                <span className="mr-2">✉️</span> Email:
                <a
                  href="mailto:admin@trueEvents.com"
                  className="ml-1 text-blue-600 hover:underline"
                >
                  admin@trueEvents.com
                </a>
              </p>
            </div>
          </div>

         
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              Careers at True Events
            </h3>
            <p className="text-gray-600">
              Learn more about our teams and current job openings.
            </p>
            <a
              href="/"
              className="inline-flex items-center text-blue-600 hover:underline font-medium"
            >
              View Careers
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
