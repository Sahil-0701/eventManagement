import React from "react";
import EventCard from "../components/EventCard";
import { events } from "../data/eventData";

const Home = () => {
  return (
    <>
      <section className="bg-[url(/sport.jpg)] bg-center bg-cover min-h-[90vh] flex items-center justify-center text-center px-4">
        <div className="max-w-5xl">
          <h1 className="text-5xl font-bold text-white">
            Welcome to the True Event
          </h1>
          <p className="mt-4 text-white text-lg">
            Discover and join exciting sports events near you, whether local or
            national. Connect with fellow athletes, organize your own events,
            and be part of a thriving sports community.
          </p>

          <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Start Exploring
          </button>
        </div>
      </section>

      {/*About section */}
      <section className="min-h-[80vh] bg-gray-50 flex items-center justify-center p-2">
        <div className="w-full rounded-3xl bg-white p-5 sm:p-10 space-y-10 max-w-7xl">
          <div className="text-center">
            <h2 className="text-2xl text-purple-600 font-semibold uppercase tracking-widest">
              About Us
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="./team.jpg"
                alt="About TrueEvent"
                className="w-full h-[350px] sm:h-[450px] object-cover"
              />
            </div>

            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Creating Moments That Last a Lifetime
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                TrueEvent is your trusted partner in crafting exceptional
                experiences. From intimate gatherings to grand celebrations, we
                offer full-service event planning, coordination, and execution
                tailored to your needs. Our expert team handles every detail, so
                you can be present in every moment. Whether it's a corporate
                conference, wedding, or themed celebration, we bring creativity,
                precision, and passion to every event.
              </p>
              <p className="text-purple-700 text-md italic">
                “We don’t just plan events — we create lasting impressions.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Section*/}
      <section className="min-h-[80vh] bg-gray-50 flex items-center justify-center p-2">
        <div className="w-full rounded-3xl bg-white p-5 space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-2xl  text-purple-600 font-extrabold tracking-widest">
              Schedule Details
            </h1>
            <p className="text-gray-600 mt-3 text-lg">
              Discover the upcoming events and join us for insightful sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.map((eventData, index) => (
              <EventCard key={index} {...eventData} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
