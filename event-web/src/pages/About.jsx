import React, { useState, useEffect } from "react";
import brand from "../assets/model1.jpg";
import { Skeleton } from "@mui/material";

const About = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = brand;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, []);

  const qualities = [
    {
      heading: "Reliable Platform Performance",
      disc: "We provide a stable, scalable, and secure system built to handle events of all sizes — from small meetups to large-scale tournaments.",
    },
    {
      heading: "Seamless Registration & Management",
      disc: "Our intuitive interface makes it easy to create, manage, and monitor events, registrations, schedules, and participants — all in one place.",
    },
    {
      heading: "User-Focused Experience",
      disc: "With mobile-friendly access, streamlined workflows, and responsive support, we make event planning and participation effortless for both organizers and attendees.",
    },
  ];

  return (
    <div className="space-y-10 px-4">
      <div>
        <div className="py-8 text-center text-3xl">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500 text-5xl font-medium">
              ABOUT <span className="text-gray-700">US</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 overflow-hidden rounded-lg relative">
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
                  <div className="animate-pulse text-gray-400">Loading...</div>
                </div>
              </div>
            ) : imageError ? (
              <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Failed to load image</p>
              </div>
            ) : (
              <div className="relative group">
                <img
                  src={brand}
                  alt="about"
                  className="w-full h-[400px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
            <p className="text-gray-600 text-justify">
              True Events was born from a vision to redefine how events are
              planned, managed, and experienced in the digital age. Our journey
              began with a simple yet powerful idea: to build a platform that
              empowers organizers, attendees, and teams to connect through
              seamless, innovative event solutions — all in one place. From
              dynamic sports tournaments to interactive corporate meetups and
              community gatherings, True Events makes it effortless to create,
              discover, and manage events of any scale. We bring powerful tools
              to your fingertips — from registration and scheduling to
              ticketing, promotion, and real-time analytics — all designed to
              deliver smooth, impactful experiences for every stakeholder
              involved.
            </p>

            <h3 className="text-xl font-semibold text-gray-700 mt-4">
              OUR MISSION
            </h3>

            <p className="text-gray-600 text-justify">
              At True Events, our mission is to simplify and elevate event
              management through technology. We're dedicated to helping
              organizers save time, boost engagement, and deliver memorable
              experiences by providing a reliable, user-friendly platform that
              adapts to their needs — whether they're managing a local game or a
              national championship.
            </p>
          </div>
        </div>

        <div className="py-12">
          <div className="text-center mb-6">
            <p className="text-gray-500 text-3xl font-medium underline">
              WHY <span className="text-gray-700">CHOOSE US</span>
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {qualities.map((quality, index) => (
              <div
                key={index}
                className="bg-gray-50 py-10 px-5 shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <p className="text-gray-700 text-lg font-semibold mb-4">
                  {quality.heading}
                </p>
                <p className="text-gray-600">{quality.disc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
