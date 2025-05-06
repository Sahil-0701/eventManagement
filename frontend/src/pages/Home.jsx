import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from "../components/EventCard";
import { events } from "../data/eventData";

const Home = () => {
    return (
        <div className="min-h-screen bg-[#EFEFEF] text-[#3F7D58]">
            {/* Hero Section */}
            <section className="relative bg-[url('/sport.jpg')] bg-center bg-cover min-h-[90vh] flex items-center justify-center text-center px-4">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40"></div>
                <div className="max-w-5xl backdrop-blur-sm bg-black/20 p-8 rounded-3xl relative z-10">
                    <h1 className="text-5xl font-bold text-white leading-tight">
                        Effortless Event Management
                    </h1>
                    <p className="mt-6 text-[#EFEFEF] text-lg max-w-2xl mx-auto">
                        Discover, organize, and manage events with ease. Whether you're hosting or attending, our platform makes it seamless.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                        <Link
                            to="/events"
                            className="bg-[#EF9651] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-[#EC5228] transition transform hover:-translate-y-1"
                        >
                            Browse Events
                        </Link>
                        <Link
                            to="/register"
                            className="border-2 border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-[#EF9651] transition transform hover:-translate-y-1"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-[#EFEFEF]">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-[#EF9651]">Powerful Features</h2>
                    <p className="mt-2 text-[#3F7D58]">Everything you need to run successful events</p>

                    <div className="mt-14 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                        {[
                            {
                                title: "Event Creation",
                                desc: "Easily set up and publish your events with intuitive tools.",
                                icon: "calendar"
                            },
                            {
                                title: "Real-Time Notifications",
                                desc: "Stay updated with live alerts and instant feedback.",
                                icon: "bell"
                            },
                            {
                                title: "Analytics & Insights",
                                desc: "Track performance with detailed dashboards and reports.",
                                icon: "bar-chart"
                            },
                        ].map((feature, index) => (
                            <div key={index} className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition transform hover:-translate-y-1">
                                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#EF9651]/20 text-[#EF9651] mx-auto mb-4">
                                    <i className={`lucide lucide-${feature.icon} text-2xl`} />
                                </div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="mt-2 text-[#3F7D58] text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-[#3F7D58]">Upcoming Events</h2>
                    <p className="mt-4 text-lg text-[#EF9651]">Mark your calendar for these exciting moments</p>

                    <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {events.slice(0, 3).map((event) => (
                            <EventCard
                                key={event.id}
                                image={event.image}
                                title={event.title}
                                date={event.date}
                                time="7:00 PM"
                                location={event.location}
                                description={event.description}
                            />
                        ))}
                    </div>

                    <div className="mt-10">
                        <Link
                            to="/events"
                            className="inline-block bg-[#EF9651] text-white px-6 py-3 rounded-lg text-lg font-medium shadow hover:bg-[#EC5228] transition"
                        >
                            View All Events
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3F7D58]/95 via-[#EF9651]/90 to-[#3F7D58]/95"></div>
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to make your event unforgettable?
                        </h2>
                        <p className="text-xl text-[#EFEFEF] mb-10">
                            Join us and experience a smarter way to host events. Create memories that last a lifetime.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/register"
                                className="bg-[#C9A66B] text-[#3F7D58] font-semibold px-8 py-4 rounded-xl hover:bg-[#e5c186] transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                            >
                                Get Started
                            </Link>
                            <Link
                                to="/contact"
                                className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-[#EF9651] transition-all transform hover:-translate-y-1"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
