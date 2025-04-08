import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-opacity-60 bg-blend-overlay">
      <Navbar />

      {/* About Section */}
      <section
        className="flex flex-col md:flex-row items-center justify-between px-10 py-20 h-[90vh] relative "
        style={{ backgroundImage: "url('/galaxy.jpg')" }}
      >
        <div className="md:w-1/2 text-gray-800 space-y-6 z-10">
          <h1 className="text-5xl text-purple-600 font-bold">About Us</h1>
          <p className="text-lg leading-relaxed">
            TrueEvent is your trusted hub for organizing and discovering
            sporting events. We aim to make event planning seamless and
            participation thrilling. From local tournaments to national
            championships, we've got you covered.
          </p>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative">
          <div className="relative w-[90%]">
            <img
              src="/cricket.jpg"
              alt="About illustration"
              className="rounded-2xl shadow-lg object-cover w-full h-full"
            />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-l from-transparent to-white rounded-l-2xl"></div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-between px-10 py-20 relative  rounded-b-2xl h-[90vh]">
        <div className="md:w-1/2 text-gray-800 space-y-6 z-10 py-10">
          <h2 className="text-4xl text-purple-600 font-semibold">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed">
            At TrueEvent, we believe sports have the power to unite people and
            build lasting communities. Our platform helps event organizers
            promote their events effectively while giving athletes and fans a
            smooth way to participate.
          </p>

          <h3 className="text-2xl font-semibold mt-6">What We Offer</h3>
          <ul className="list-disc text-gray-700 mt-4 space-y-2 px-6">
            <li>Event discovery and easy registration</li>
            <li>Tools for event organizers to manage participants</li>
            <li>Real-time updates and schedules</li>
            <li>Photo galleries and past event highlights</li>
            <li>Community features to connect with others</li>
          </ul>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative">
          <div className="relative w-[90%]">
            <img
              src="/todo.png"
              alt="Our mission illustration"
              className="rounded-2xl shadow-lg object-cover w-full h-full"
            />
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent to-white rounded-r-2xl"></div>
          </div>
        </div>
      </section>
      {/* Vision and Project Background Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 h-[90vh] bg-white text-gray-800">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl text-purple-600 font-semibold">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            Our vision is to empower communities by making sports events more
            accessible and efficient to organize. We envision a world where
            every individual can participate, connect, and grow through sports.
          </p>

          <h3 className="text-2xl font-semibold mt-6">Project Background</h3>
          <p className="text-lg leading-relaxed">
            The idea behind TrueEvent started with a simple need—bringing
            organizers and participants under one digital roof. After
            researching the challenges faced by sports communities, we created a
            centralized platform that simplifies event creation, registration,
            and engagement.
          </p>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="relative w-[90%]">
            <img
              src="/vision.jpg"
              alt="Vision Illustration"
              className="rounded-2xl shadow-lg object-cover w-full h-full"
            />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-l from-transparent to-white rounded-l-2xl"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
