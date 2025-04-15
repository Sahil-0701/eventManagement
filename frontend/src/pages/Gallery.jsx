import React from "react";


const images = [
  "/artEvent.jpg",
  "/foodFes.jpg",
  "/techTalk.jpg",
  "/concert.jpg",
  "/bookFair.jpg",
  "/charityGala.jpg",
  "/cricket.jpg",
  "/environment.jpg",
  "/fashionShow.jpg",
  "/event.jpg",
  "/filmFest.jpg",
  "/fitnessRun.jpg",
  "/gallery.jpg",
  "/gaming.jpg",
  "/heritageDay.jpg",
  "/musicJam.jpg",
  "/robotWars.jpg",
];

const Gallery = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-opacity-60 bg-blend-overlay"
      style={{ backgroundImage: "url('/galaxy.jpg')" }}
    >
      <section className="bg-cover bg-center bg-opacity-60 bg-blend-overlay py-16 px-4">
        <div className="flex">
          <div className="max-w-7xl mx-auto text-center mb-[5%] ">
            <h2 className="text-7xl font-bold text-purple-600 mb-2">Gallery</h2>
            <p className="text-gray-500 text-lg">
              Moments we’ve captured across events
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl shadow-md group hover:scale-105 transform transition duration-300"
            >
              <img
                src={src}
                alt={`Event ${idx + 1}`}
                className="w-full h-64 object-cover group-hover:brightness-75 transition duration-300"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
