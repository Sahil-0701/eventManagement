import React, { useEffect, useState } from "react";
import { modelImages as importedModelImages } from "../assets/modelImage";
import "../index.css";

const Hero = () => {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModelIndex(
        (prevIndex) => (prevIndex + 1) % importedModelImages.length
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {importedModelImages.map((img, index) => (
        <img
          key={index}
          src={img.model}
          alt={`Model ${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out z-0 ${
            index === currentModelIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />

      <div className="relative z-20 flex items-center h-full px-6 sm:px-12 lg:px-20">
        <div className="text-[#EFEFEF] max-w-2xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 md:w-12 h-[2px] bg-[#EFEFEF]" />
            <a
              href="#"
              className="font-semibold text-base md:text-lg tracking-wide hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              MOST POPULAR
            </a>
          </div>

          <h1 className="prata-regular text-4xl md:text-6xl lg:text-7xl leading-snug sm:py-2">
            Effortless Management
          </h1>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="#"
              className="font-semibold text-base md:text-lg tracking-wide hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              Book NOW
            </a>
            <span className="w-8 md:w-12 h-[2px] bg-[#EFEFEF]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
