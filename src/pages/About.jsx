import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-36 bg-cover bg-center bg-no-repeat text-white relative min-h-[60vh]">
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
        <div className="md:w-1/2 space-y-6 z-10">
          <h1 className="text-5xl font-bold text-purple-400">About Us</h1>
          <p className="text-lg leading-relaxed text-gray-100">
            TrueEvent is your trusted hub for organizing and discovering
            sporting events. We aim to make event planning seamless and
            participation thrilling. From local tournaments to national
            championships, we've got you covered.
          </p>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center z-10">
          <img
            src="/cricket.jpg"
            alt="About illustration"
            className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-between px-10 py-20 bg-white text-gray-800">
        <div className="md:w-1/2 space-y-6">
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
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Event discovery and easy registration</li>
            <li>Tools for event organizers to manage participants</li>
            <li>Real-time updates and schedules</li>
            <li>Photo galleries and past event highlights</li>
            <li>Community features to connect with others</li>
          </ul>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="/todo.png"
            alt="Mission illustration"
            className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
          />
        </div>
      </section>

      {/* Vision Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-black text-white">
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
          <img
            src="/vision.jpg"
            alt="Vision Illustration"
            className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default About;
